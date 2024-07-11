import { z } from 'zod'
import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

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

  if (!date) {
    return new Response(JSON.stringify({ message: 'Date is not provided.' }), {
      status: 400,
    })
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

  if (isPastDate) {
    return new Response(JSON.stringify({ availability: [] }), { status: 200 })
  }

  const userAvailability = await prisma.userTimeIntervals.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return new Response(JSON.stringify({ availability: [] }), { status: 200 })
  }

  const { time_start_time_in_minutes, time_end_time_in_minutes } =
    userAvailability

  const startHours = time_start_time_in_minutes / 60
  const endHours = time_end_time_in_minutes / 60

  const possibleTimes = Array.from({ length: endHours - startHours }).map(
    (_, index) => {
      return startHours + index
    },
  )

  return new Response(JSON.stringify({ possibleTimes }), { status: 200 })
}
