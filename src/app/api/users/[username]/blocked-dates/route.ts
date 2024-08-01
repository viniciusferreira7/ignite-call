import { prisma } from '@/lib/prisma'
import { type NextRequest } from 'next/server'

interface Params {
  params: { username: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  })

  if (!user) {
    return new Response(JSON.stringify({ message: 'User does not exist.' }), {
      status: 404,
    })
  }

  const year = request.nextUrl.searchParams.get('year')
  const month = request.nextUrl.searchParams.get('month')

  if (!year || !month) {
    return new Response(
      JSON.stringify({ message: 'Year or month not specified.' }),
      {
        status: 400,
      },
    )
  }

  const availableWeekdays = await prisma.userTimeIntervals.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekdays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekdays.some(
      (availableWeekday) => availableWeekday.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
  SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
  FROM schedulings S 

  LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = EXTRACT(ISODOW FROM S.date) 
      
  WHERE S.user_id = ${user.id}
      AND TO_CHAR(S.date, 'YYYY-MM') = ${`${year}-${month}`}

  GROUP BY EXTRACT(DAY FROM S.date), UTI.time_end_in_minutes, UTI.time_start_in_minutes

  HAVING COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
`

  const blockedDates = blockedDatesRaw.map((item) => Number(item.date))

  return new Response(JSON.stringify({ blockedWeekdays, blockedDates }), {
    status: 200,
  })
}
