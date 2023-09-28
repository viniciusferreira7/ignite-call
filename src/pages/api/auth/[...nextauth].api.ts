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
    }),
  ],
} satisfies NextAuthOptions

export default NextAuth(authOptions)
