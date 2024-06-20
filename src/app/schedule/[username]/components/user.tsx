import Image from 'next/image'

interface UserProps {
  name: string
  bio: string | null
  avatarUrl: string | null
}

export function User(user: Partial<UserProps>) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={user?.avatarUrl ?? '/'}
        alt={user?.name ?? ''}
        width={64}
        height={64}
        priority={true}
        className="size-16 rounded-full"
      />
      <h1 className="mt-2 text-lg font-bold">{user?.name}</h1>
      <h2 className="font-light text-gray-200">{user?.bio}</h2>
    </div>
  )
}
