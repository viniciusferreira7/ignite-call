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
    EXTRACT(DAY FROM S.DATE) AS date,
    COUNT(S.date),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  FROM schedulings S

  LEFT JOIN user_time_intervals UTI
    ON UTI.week_day = EXTRACT(DOW FROM S.date + INTERVAL '1 day')

  WHERE S.user_id = ${user.id}
    AND EXTRACT(YEAR FROM S.date) = ${year}::int
    AND EXTRACT(MONTH FROM S.date) = ${month}::int

  GROUP BY EXTRACT(DAY FROM S.DATE),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  HAVING
    COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60);
`

  const blockedDates = blockedDatesRaw.map((item) => Number(item.date))

  return new Response(JSON.stringify({ blockedWeekdays, blockedDates }), {
    status: 200,
  })
}
