import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { ScheduleForm, User } from './components'

interface SchedulePageProps {
  params: {
    username: string
  }
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  return {
    name: user?.name,
    bio: user?.bio,
    avatarUrl: user?.avatar_url,
  }
}

export async function generateMetadata({
  params,
}: SchedulePageProps): Promise<Metadata> {
  const user = await getUser(params.username)

  return {
    title: `Agendar com ${user.name}`,
  }
}

export default async function SchedulePage({ params }: SchedulePageProps) {
  const user = await getUser(params.username)

  return (
    <div className="mx-auto mb-4 mt-20 max-w-[852px] px-4">
      {!!user && <User {...user} />}
      <ScheduleForm />
    </div>
  )
}
