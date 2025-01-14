'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { BookmarkProvider } from '@/components/bookmarks/bookmarks-context'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/react-query'
import type { Bookmark } from '@/utils/types'

export function Providers({
  children,
  bookmarksPromise,
}: { children: ReactNode; bookmarksPromise: Promise<Bookmark[]> }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <BookmarkProvider bookmarksPromise={bookmarksPromise}>{children}</BookmarkProvider>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
