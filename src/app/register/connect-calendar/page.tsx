import { MultiStep } from '../components'
import { ConnectForm } from './components'

export default function ConnectCalendarPage() {
  return (
    <main className="mx-auto mb-4 mt-4 w-full max-w-xl px-4 md:mt-20">
      <div className="px-6">
        <strong className="text-2xl text-white">Conecte sua agenda!</strong>
        <p className="mb-6 text-base text-gray-300">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStep size={4} current={2} />
      </div>
      <ConnectForm />
    </main>
  )
}
