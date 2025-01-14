'use client'

import { generateNanoId } from '@/lib/nanoid'
import type { Bookmark } from '@/utils/types'
import { createContext, use, useContext, useMemo, useOptimistic } from 'react'

type BookmarkAction =
  | { type: 'ADD'; payload: { title: string; bookmarkUrl: string } }
  | { type: 'REMOVE'; payload: { id: string } }

type BookmarkContextType = {
  bookmarks: Bookmark[]
  create: ({ title, bookmarkUrl }: { title: string; bookmarkUrl: string }) => void
  remove: (id: string) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

function bookmarkReducer(state: Bookmark[], action: BookmarkAction): Bookmark[] {
  switch (action.type) {
    case 'ADD':
      return [
        {
          id: generateNanoId(),
          userId: generateNanoId(),
          title: action.payload.title,
          bookmarkUrl: action.payload.bookmarkUrl,
          createdAt: new Date(),
        },
        ...state,
      ]
    case 'REMOVE':
      return state.filter((bookmark) => bookmark.id !== action.payload.id)
    default:
      return state
  }
}

export function BookmarkProvider({
  children,
  bookmarksPromise,
}: { children: React.ReactNode; bookmarksPromise: Promise<Bookmark[]> }) {
  const initialBookmarks = use(bookmarksPromise)
  const [optimisticBookmarks, setOptimisticBookmarks] = useOptimistic(initialBookmarks, bookmarkReducer)

  const create = ({ title, bookmarkUrl }: { title: string; bookmarkUrl: string }) => {
    setOptimisticBookmarks({ type: 'ADD', payload: { title, bookmarkUrl } })
  }

  const remove = (id: string) => {
    setOptimisticBookmarks({ type: 'REMOVE', payload: { id } })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const value = useMemo(() => ({ bookmarks: optimisticBookmarks, create, remove }), [optimisticBookmarks])

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)

  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }

  return context
}
