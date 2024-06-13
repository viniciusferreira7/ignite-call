'use client'

import { Button } from '@/components/ui/button'
import { HelpText } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

interface UpdateProfileFormProps {
  session: Session | null
}

export function UpdateProfileForm({ session }: UpdateProfileFormProps) {
  // const session = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    console.log(data)
  }

  console.log({ session })

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6 "
    >
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none text-gray-300">
          Foto de perfil
        </p>
        {/* <Image src={/> */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Sobre você</Label>
        <Textarea id="bio" {...register('bio')} />
        <HelpText>
          Fale um pouco sobre você. Isto será exibido em sua página pessoal.
        </HelpText>
      </div>
      <Button
        variant="secondary"
        size="h-auto"
        className="flex w-full items-center py-3"
        disabled={isSubmitting}
      >
        Finalizar <IconArrowRight size={16} />
      </Button>
    </form>
  )
}
