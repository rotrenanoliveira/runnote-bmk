'use client'

import React from 'react'

import { Bookmark } from '@/components/bookmarks/bookmark'
import { useBookmarks } from '@/components/bookmarks/bookmarks-context'

export function UnfoldedBookmarks() {
  const { bookmarks } = useBookmarks()

  return (
    <div className="space-y-2">
      {bookmarks.map((bookmark) => (
        <React.Suspense key={bookmark.id}>
          <Bookmark bookmark={bookmark} />
        </React.Suspense>
      ))}
    </div>
  )
}
