import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export default function PrismaAdapter(): Adapter {
  return {
    async createUser(user) { },

    async getUser(id: string) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      })

      return {
        id: user?.id ?? '',
        name: user?.name ?? '',
        username: user?.username ?? '',
        avatar_url: user?.avatar_url ?? '',
        email: user?.email ?? '',
        emailVerified: null,
      }
    },

    async getUserByEmail(email: string) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      })

      return {
        id: user?.id ?? '',
        name: user?.name ?? '',
        username: user?.username ?? '',
        avatar_url: user?.avatar_url ?? '',
        email: user?.email ?? '',
        emailVerified: null,
      }
    },
  }
}
