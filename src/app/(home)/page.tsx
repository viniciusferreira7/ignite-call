import { Metadata } from 'next'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/claim-username-form'

export const metadata: Metadata = {
  title: 'Descomplique sua agenda',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

export default function Home() {
  return (
    <div className="ml-auto flex h-screen max-w-home flex-col items-center justify-center gap-10 px-4 md:flex-row md:gap-20 lg:px-4">
      <div className="max-w-[30rem] space-y-2 py-10">
        <h2 className="text-3xl font-extrabold md:text-6xl">
          Agendamento descomplicado
        </h2>
        <p className="text-lg text-gray-400 md:text-base">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </div>
      <div>
        <Image
          src="/assets/calendar-hero.png"
          alt="Calendário simbolizando aplicação em funcionamento"
          width={700}
          height={400}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
