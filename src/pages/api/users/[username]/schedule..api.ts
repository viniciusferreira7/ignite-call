import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import dayjs from 'dayjs'
import { z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'User does not exist.',
    })
  }

  const createSchedulingBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.coerce.date(),
  })

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    req.body,
  )

  const schedulingDate = dayjs(date).startOf('hour')

  const isPast = schedulingDate.isBefore(new Date())

  if (isPast) {
    return res.status(400).json({ message: 'Date is in the past.' })
  }

  const conflictScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictScheduling) {
    return res.status(400).json({
      message: 'There is another scheduling on the same time.',
    })
  }

  await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
    },
  })

  return res.status(201).end()
}
