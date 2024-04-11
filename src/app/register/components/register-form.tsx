'use client'

import { Button } from '@/components/ui/button'
import { Control, HelpText, InputRoot } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import { AxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisar dever pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisar dever pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const searchParams = useSearchParams()
  const username = searchParams.get('username') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username,
    },
  })

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', { name: data.name, username: data.username })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setError('username', { message: err?.response?.data?.message })
        return
      }
      console.error(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6 "
    >
      <div className="space-y-2">
        <Label htmlFor="username">Nome do usuário</Label>
        <InputRoot prefix="ignite.com/">
          <Control
            id="username"
            placeholder="seu-usuario"
            {...register('username')}
          />
        </InputRoot>
        {!!errors.username && (
          <HelpText error={!!errors.username}>
            {errors.username.message}
          </HelpText>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <InputRoot>
          <Control id="name" placeholder="Seu nome" {...register('name')} />
        </InputRoot>
        {!!errors.name && (
          <HelpText error={!!errors.name}>{errors.name.message}</HelpText>
        )}
      </div>
      <Button
        variant="secondary"
        size="h-auto"
        className="flex w-full items-center py-3"
        disabled={isSubmitting}
      >
        Próximo passo <IconArrowRight size={16} />
      </Button>
    </form>
  )
}
