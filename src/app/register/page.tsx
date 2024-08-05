import { Metadata } from 'next'
import { MultiStep, RegisterForm } from './components'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Crie uma conta',
}

export default function RegisterPage() {
  return (
    <main className="mx-auto mb-4 mt-4 w-full max-w-xl px-4 md:mt-20">
      <div className="px-6">
        <strong className="text-2xl text-white">
          Bem-vindo ao Ignite Call
        </strong>
        <p className="mb-6 text-base text-gray-300">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
        <MultiStep size={4} current={1} />
      </div>
      <Suspense fallback="Carregando...">
        <RegisterForm />
      </Suspense>
    </main>
  )
}
