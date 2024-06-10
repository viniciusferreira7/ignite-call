import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number(),
        startTimeInMinutes: z.number(),
        endTimeInMinutes: z.number(),
      }),
    )
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1 hora distante do início.',
      },
    ),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(null, { status: 401 })
  }

  const body = await request.json()

  const schema = timeIntervalsBodySchema.safeParse(body)

  if (!schema.success) {
    return new Response(JSON.stringify({ message: schema.error.format() }), {
      status: 400,
    })
  }

  const { intervals } = schema.data

  await prisma.userTimeIntervals.createMany({
    data: intervals.map((interval) => {
      return {
        user_id: session.user.id,
        week_day: interval.weekDay,
        time_start_time_in_minutes: interval.startTimeInMinutes,
        time_end_time_in_minutes: interval.endTimeInMinutes,
      }
    }),
  })

  return new Response(null, { status: 201 })
}
