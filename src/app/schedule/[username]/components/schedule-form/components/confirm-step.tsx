'use client'

import { Button } from '@/components/ui/button'
import { Control, HelpText, InputRoot } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCalendarMonth, IconClock } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome precisa ter no mínimo pelo menos 3 caracteres',
  }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormSchema = z.input<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormSchema) {
    console.log(data)
  }

  const weekDay = dayjs(schedulingDate).format('dddd')
  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ] YYYY')
  const hour = dayjs(schedulingDate).format('HH:[00h]')

  return (
    <form
      className="mx-auto mt-6 max-w-[540px] space-y-4 rounded-md bg-gray-800 p-4 md:p-6"
      onSubmit={handleSubmit(handleConfirmScheduling)}
    >
      <div className="mb-2 flex items-center gap-4 border-b border-gray-600 pb-6">
        <h1 className="mt-2 flex items-center gap-2 text-lg font-medium">
          <IconCalendarMonth /> {weekDay}
          <span className="text-gray-400">{describedDate}</span>
        </h1>
        <p className="mt-2 flex items-center gap-2 text-lg font-medium">
          <IconClock />
          {hour}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <InputRoot className="w-full rounded-lg">
          <Control
            id="name"
            className="placeholder:text-gray-500"
            {...register('name')}
          />
        </InputRoot>
        {!!errors.name && (
          <HelpText error={!!errors.name}>{errors.name.message}</HelpText>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Endereço de email</Label>
        <InputRoot className="w-full rounded-lg">
          <Control
            id="email"
            type="email"
            className="placeholder:text-gray-500"
            {...register('email')}
          />
        </InputRoot>
        {!!errors.email && (
          <HelpText error={!!errors.email}>{errors.email.message}</HelpText>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea id="observations" {...register('observations')} />
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          Confirma
        </Button>
      </div>
    </form>
  )
}
