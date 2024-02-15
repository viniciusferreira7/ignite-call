import { Button } from '@/components/ui/button'
import { Input, InputRoot } from '@/components/ui/input'
import { IconArrowRight } from '@tabler/icons-react'

export function ClaimUsernameForm() {
  return (
    <form className="flex flex-wrap justify-center gap-1 gap-y-2 rounded bg-gray-800 p-4">
      <InputRoot prefix="ignite.com/" className="w-full rounded-lg lg:max-w-72">
        <Input
          placeholder="seu-usuario"
          className="placeholder:text-gray-500"
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
