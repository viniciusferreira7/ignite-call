import { prisma } from '@/lib/prisma'
import { type NextRequest } from 'next/server'

interface Params {
  params: { username: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  console.log({ params })

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

  return new Response(JSON.stringify({ blockedWeekdays }), {
    status: 200,
  })
}
