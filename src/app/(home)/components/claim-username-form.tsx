'use client'

import { Button } from '@/components/ui/button'
import { Control, InputRoot } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleClaimUsername)}
      className="flex flex-wrap justify-center gap-1 gap-y-2 rounded bg-gray-800 p-4"
    >
      <InputRoot prefix="ignite.com/" className="w-full rounded-lg lg:max-w-72">
        <Control
          placeholder="seu-usuario"
          className="placeholder:text-gray-500"
          {...register('username')}
        />
      </InputRoot>
      <Button
        variant="secondary"
        size="heightAuto"
        type="submit"
        className="w-full rounded-lg p-2 lg:w-auto"
      >
        Reserva usuário <IconArrowRight size={18} stroke={2} />
      </Button>
    </form>
  )
}
