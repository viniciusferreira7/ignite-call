import { Adapter, AdapterAccount } from 'next-auth/adapters'
import { prisma } from '../prisma'

export default function PrismaAdapter(): Adapter {
  return {
    async createUser(user) { },

    async getUser(id) {
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

    async getUserByEmail(email) {
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

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      return {
        id: account?.user?.id ?? '',
        name: account?.user?.name ?? '',
        username: account?.user?.username ?? '',
        avatar_url: account?.user?.avatar_url ?? '',
        email: account?.user?.email ?? '',
        emailVerified: null,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          username: user.name,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser?.id ?? '',
        name: prismaUser?.name ?? '',
        username: prismaUser?.username ?? '',
        avatar_url: prismaUser?.avatar_url ?? '',
        email: prismaUser?.email ?? '',
        emailVerified: null,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, expires, userId }) {
      const session = await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        userId: session.user_id,
        expires: session.expires,
        sessionToken: session.session_token,
      }
    },

    async getSessionAndUser(sessionToken) {
      const { user, ...session } = await prisma.session.findFirstOrThrow({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user?.id ?? '',
          name: user?.name ?? '',
          username: user?.username ?? '',
          avatar_url: user?.avatar_url ?? '',
          email: user?.email ?? '',
          emailVerified: null,
        },
      }
    },

    async updateSession({ userId, expires, sessionToken }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: prismaSession.session_token,
        expires: prismaSession.expires,
        userId: prismaSession.id,
      }
    },
  }
}
