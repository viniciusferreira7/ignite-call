import { Metadata } from 'next'
import { MultiStep } from '../components'
import { TimeIntervalsForm } from './components/time-intervals-form'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade',
  robots: 'noindex, nofollow',
}

export default function TimeIntervalsPage() {
  return (
    <main className="mx-auto mb-4 mt-4 w-full max-w-xl px-4 md:mt-20">
      <div className="px-6">
        <strong className="text-2xl text-white">Quase lá</strong>
        <p className="mb-6 text-base text-gray-300">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStep size={4} current={3} />
      </div>
      <TimeIntervalsForm />
    </main>
  )
}
