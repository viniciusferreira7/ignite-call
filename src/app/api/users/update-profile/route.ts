import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth]/route'

const updateProfileBodySchema = z.object({
  bio: z.string().optional(),
})

export async function PUT(request: Request) {
  const body = await request.json()

  const schema = updateProfileBodySchema.safeParse(body)

  if (!schema.success) {
    return new Response(JSON.stringify({ message: schema.error.format }), {
      status: 400,
    })
  }

  const { data } = schema

  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(null, { status: 401 })
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio: data.bio,
    },
  })

  return new Response(null, { status: 204 })
}
