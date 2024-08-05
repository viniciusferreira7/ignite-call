import { getServerSession } from 'next-auth'
import { MultiStep } from '../components'
import { UpdateProfileForm } from './components/update-profile-form'
import { Metadata } from 'next'
import { authOptions } from '@/lib/auth-options'

export const metadata: Metadata = {
  title: 'Atualize seu perfil',
  robots: 'noindex, nofollow',
}

export default async function UpdateProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <main className="mx-auto mb-4 mt-4 w-full max-w-xl px-4 md:mt-20">
      <div className="px-6">
        <strong className="text-2xl text-white">Quase lá</strong>
        <p className="mb-6 text-base text-gray-300">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStep size={4} current={4} />
      </div>
      <UpdateProfileForm session={session} />
    </main>
  )
}
