import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  console.log(session)

  return new Response(JSON.stringify({ session }), { status: 201 })
}
