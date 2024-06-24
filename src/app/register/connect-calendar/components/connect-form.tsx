'use client'

import { Button } from '@/components/ui/button'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ConnectForm() {
  const searchParams = useSearchParams()
  const session = useSession()

  const isAuthenticated = session.status === 'authenticated'

  const hasAuthError = searchParams.get('error') === 'permissions'

  return (
    <form className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6">
      <div className="flex flex-col items-center justify-between gap-y-2 rounded-md border border-gray-600 px-5 py-[1.375rem] md:flex-row">
        <p className="text-base font-medium text-gray-100">Google Calendar</p>
        {isAuthenticated ? (
          <Button
            variant="outline"
            type="button"
            disabled={true}
            className="bg-green-600 text-white"
            onClick={() =>
              signIn('google', { callbackUrl: '/register/connect-calendar' })
            }
          >
            Conectado <IconCheck stroke={1.5} className="size-5" />
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn('google', { callbackUrl: '/register/connect-calendar' })
            }
          >
            Conectar <IconArrowRight className="size-5" />
          </Button>
        )}
      </div>
      {hasAuthError && (
        <p className="text-xs font-medium text-red-500">
          Falha ao se conectar ao Google, verifique se você habilitou as
          permissões de acesso ao Google Calendar.
        </p>
      )}
      <Button
        variant="secondary"
        size="h-auto"
        type="button"
        className="flex w-full items-center py-3"
        disabled={!isAuthenticated}
        asChild
      >
        <Link href="/register/time-intervals">
          Próximo passo <IconArrowRight size={16} />
        </Link>
      </Button>
    </form>
  )
}
