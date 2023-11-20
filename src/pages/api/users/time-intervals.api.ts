import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeAndMinutes: z.number(),
      endTimeAndMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => {
      return {
        user_id: session.user.id,
        week_day: interval.weekDay,
        time_start_in_minutes: interval.startTimeAndMinutes,
        time_end_in_minutes: interval.endTimeAndMinutes,
      }
    }),
  })

  return res.status(201).end()
}
