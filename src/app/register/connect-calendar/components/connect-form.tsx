'use client'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { signIn, useSession } from 'next-auth/react'

export function ConnectForm() {
  const session = useSession()

  const isAuthenticated = session.status === 'authenticated'

  console.log(session)

  return (
    <form className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6 ">
      <div className="flex flex-col items-center justify-between gap-y-2 rounded-md border border-gray-600 px-5 py-[1.375rem] md:flex-row">
        <p className="text-base font-medium text-gray-100">Google Calendar</p>
        <Button
          variant="outline"
          type="button"
          disabled={isAuthenticated}
          onClick={() =>
            signIn('google', { callbackUrl: '/register/connect-calendar' })
          }
        >
          {isAuthenticated ? (
            'Conectado'
          ) : (
            <>
              Conectar <IconArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
      <Button
        variant="secondary"
        size="h-auto"
        className="flex w-full items-center py-3"
      >
        Próximo passo <IconArrowRight size={16} />
      </Button>
    </form>
  )
}
