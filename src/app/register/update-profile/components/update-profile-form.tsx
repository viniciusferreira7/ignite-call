'use client'

import { Button } from '@/components/ui/button'
import { HelpText } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProfileFormSchema = z.object({
  bio: z.string().optional(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

interface UpdateProfileFormProps {
  session: {
    user: {
      name: string
      email: string
      avatar_url: string
      id: string
      emailVerified: Date | null
      username: string
      image?: string | null | undefined
    }
    expires: string
  } | null
}

export function UpdateProfileForm({ session }: UpdateProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/update-profile', { bio: data.bio })

    router.push(`/schedule/${session?.user.username}`)
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6 "
    >
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none text-gray-300">
          Foto de perfil
        </p>
        <Image
          src={session?.user.avatar_url ?? '/'}
          alt={session?.user.name ?? ''}
          width={64}
          height={64}
          priority={true}
          className="size-16 rounded-full"
        />
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
