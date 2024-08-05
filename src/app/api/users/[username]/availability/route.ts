import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface Params {
  params: { username: string }
}

const availabilitySchemaParams = z.object({
  username: z.string(),
})

export async function GET(request: NextRequest, { params }: Params) {
  const schema = availabilitySchemaParams.safeParse(params)

  if (!schema.success) {
    return new Response(JSON.stringify({ message: schema.error.format() }), {
      status: 400,
    })
  }

  const { username } = schema.data

  const searchParams = request.nextUrl.searchParams

  const date = searchParams.get('date')
  const timezoneOffset = searchParams.get('timezoneOffset')

  if (!date || !timezoneOffset) {
    return new Response(
      JSON.stringify({ message: 'Date or timezoneOffset is not provided.' }),
      {
        status: 400,
      },
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return new Response(JSON.stringify({ message: 'User does not exist.' }), {
      status: 404,
    })
  }

  const referenceDate = dayjs(date)
  const isPastDate = referenceDate.endOf('day').isBefore()

  const timezoneOffsetInHours = Number(timezoneOffset) / 60

  const referenceDateTimeZoneOffsetInHours =
    referenceDate.toDate().getTimezoneOffset() / 60

  if (isPastDate) {
    return new Response(
      JSON.stringify({ possibleTimes: [], availabilityTimes: [] }),
      { status: 200 },
    )
  }

  const userAvailability = await prisma.userTimeIntervals.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return new Response(
      JSON.stringify({ possibleTimes: [], availabilityTimes: [] }),
      { status: 200 },
    )
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set('hour', startHour)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
        lte: referenceDate
          .set('hour', endHour)
          .add(timezoneOffsetInHours, 'hours')
          .toDate(),
      },
    },
  })

  const availabilityTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) =>
        blockedTime.date.getUTCHours() - timezoneOffsetInHours === time,
    )

    const isTimeInPast = referenceDate
      .set('hour', time)
      .subtract(referenceDateTimeZoneOffsetInHours, 'hours')
      .isBefore(dayjs().utc().subtract(timezoneOffsetInHours, 'hours'))

    return !isTimeBlocked && !isTimeInPast
  })

  return new Response(JSON.stringify({ possibleTimes, availabilityTimes }), {
    status: 200,
  })
}
