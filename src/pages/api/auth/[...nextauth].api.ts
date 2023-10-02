import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { z } from 'zod'

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
})

const _env = envSchema.parse(process.env)

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: _env.GOOGLE_CLIENT_ID,
      clientSecret: _env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      const accountNotIncludeCalendarScope = !account?.scope?.includes(
        'https://www.googleapis.com/auth/calendar',
      )

      if (accountNotIncludeCalendarScope) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
  },
} satisfies NextAuthOptions

export default NextAuth(authOptions)
