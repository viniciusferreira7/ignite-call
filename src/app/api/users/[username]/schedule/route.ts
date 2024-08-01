import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextRequest } from 'next/server'
import { z } from 'zod'

interface Params {
  params: { username: string }
}

const scheduleSchemaParams = z.object({
  username: z.string(),
})

const scheduleSchemaBody = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().optional(),
  date: z.string().datetime(),
})

export async function POST(request: NextRequest, { params }: Params) {
  const schemaParam = scheduleSchemaParams.safeParse(params)

  if (!schemaParam.success) {
    return new Response(
      JSON.stringify({ message: schemaParam.error.format() }),
      {
        status: 400,
      },
    )
  }

  const { username } = schemaParam.data

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

  const data = await request.json()

  const schemaBody = scheduleSchemaBody.safeParse(data)

  if (!schemaBody.success) {
    return new Response(
      JSON.stringify({ message: schemaBody.error.format() }),
      {
        status: 400,
      },
    )
  }

  const { name, email, observations, date } = schemaBody.data

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore()) {
    return new Response(JSON.stringify({ message: 'Date is in the past.' }), {
      status: 400,
    })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return new Response(
      JSON.stringify({
        message: 'There is another scheduling at the same time.',
      }),
      {
        status: 400,
      },
    )
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  const calendar = await google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [
        {
          email,
          displayName: name,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return new Response(null, {
    status: 201,
  })
}
