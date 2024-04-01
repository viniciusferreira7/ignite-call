'use client'

import { Button } from '@/components/ui/button'
import { Control, HelpText, InputRoot } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisar dever pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className="flex flex-wrap items-start justify-center gap-1 gap-y-2 rounded bg-gray-800 p-4"
      >
        <InputRoot
          prefix="ignite.com/"
          className="w-full rounded-lg lg:max-w-72"
        >
          <Control
            placeholder="seu-usuario"
            className="placeholder:text-gray-500"
            {...register('username')}
          />
        </InputRoot>

        <Button
          variant="secondary"
          size="h-auto"
          type="submit"
          className="w-full rounded-lg px-2 py-3 lg:w-auto"
        >
          Reserva usuário <IconArrowRight size={18} stroke={2} />
        </Button>
      </form>
      <HelpText error={!!errors.username?.message}>
        {errors.username ? errors.username.message : 'Digite o nome do usuário'}
      </HelpText>
    </>
  )
}
