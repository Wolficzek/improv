import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Your authentication logic
        console.log('SERVER TEST')
        console.log('SERV: ', credentials)
        if (
          credentials?.username === 'admin@admin.com' &&
          credentials?.password === 'password'
        ) {
          return { id: '1', name: 'Admin User' }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  secret: process.env.NEXT_AUTH_SECRET,
})

export { handler as GET, handler as POST }
