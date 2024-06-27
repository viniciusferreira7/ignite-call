'use client'

import { Button } from '@/components/ui/button'
import { Control, InputRoot } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IconCalendarMonth, IconClock } from '@tabler/icons-react'

export function ConfirmStep() {
  function handleConfirmScheduling() { }

  return (
    <form
      className="mx-auto mt-6 max-w-[540px] space-y-4 rounded-md bg-gray-800 p-4 md:p-6"
      onSubmit={handleConfirmScheduling}
    >
      <div className="mb-2 flex items-center gap-4 border-b border-gray-600 pb-6">
        <h1 className="mt-2 flex items-center gap-2 text-lg font-medium">
          <IconCalendarMonth /> Quinta-feira{' '}
          <span className="text-gray-400">27 de junho</span>
        </h1>
        <p className="mt-2 flex items-center gap-2 text-lg font-medium">
          <IconClock />
          12:00
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <InputRoot className="w-full rounded-lg">
          <Control
            id="name"
            className="placeholder:text-gray-500"
          // {...register('username')}
          />
        </InputRoot>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Endereço de email</Label>
        <InputRoot className="w-full rounded-lg">
          <Control
            id="email"
            type="email"
            className="placeholder:text-gray-500"
          // {...register('username')}
          />
        </InputRoot>
      </div>
      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
        // {...register('bio')}
        />
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost">
          Cancelar
        </Button>
        <Button type="submit" variant="secondary">
          Confirma
        </Button>
      </div>
    </form>
  )
}
