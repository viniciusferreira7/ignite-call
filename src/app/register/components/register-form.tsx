'use client'

import { Button } from '@/components/ui/button'
import { InputRoot, Control } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconArrowRight } from '@tabler/icons-react'

export function RegisterForm() {
  return (
    <form className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6 ">
      <div className="space-y-2">
        <Label htmlFor="username">Nome do usuário</Label>
        <InputRoot prefix="ignite.com/">
          <Control id="username" />
        </InputRoot>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <InputRoot>
          <Control id="name" />
        </InputRoot>
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
