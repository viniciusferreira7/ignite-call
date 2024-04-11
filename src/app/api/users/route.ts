import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const data = await request.json()

  const { name, username } = data

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return new Response(JSON.stringify(user), { status: 201 })
}
