import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// export async function authOption() {
//   return (
//     await req,
//     res,
//     {
//       providers: [
//         GoogleProvider({
//           clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//         }),
//       ],
//     }
//   )
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)

  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      }),
    ],
  })
}

export { handler as GET, handler as POST }
