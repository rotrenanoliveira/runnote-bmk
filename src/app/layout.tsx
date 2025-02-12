import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import type { Metadata, Viewport } from 'next'

import { getUserBookmarks } from '@/server/data/get-bookmarks'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'readmarks:bmk',
  description: 'A new way to manage bookmarks and saved links.',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0F' },
  ],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const userId = (await cookies()).get('runnote:userId')?.value
  const bookmarks = getUserBookmarks(userId)

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers bookmarksPromise={bookmarks}>{children}</Providers>
      </body>
    </html>
  )
}
