'use client'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/app/theme-provider'
import { MainLayout } from '@/app/main-layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <main>
          <SessionProvider
            session={undefined}
            refetchInterval={0}
            refetchOnWindowFocus={false}
          >
            <ThemeProvider>
              <QueryClientProvider client={queryClient}>
                <MainLayout>{children}</MainLayout>
              </QueryClientProvider>
            </ThemeProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  )
}
