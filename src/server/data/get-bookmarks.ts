'use server'

import { unstable_cache } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { Bookmark } from '@/utils/types'

/** Query Parameters */
type BookmarkQuery = { userId: string; folderId?: null | string }
/** Get all bookmarks for a user */
export async function getBookmarks(userId: string | undefined): Promise<Bookmark[]>
/** Get all unfolded bookmarks for a user */
export async function getBookmarks(userId: string | undefined, folderId: null): Promise<Bookmark[]>
/** Get all bookmarks for a user in a folder */
export async function getBookmarks(userId: string | undefined, folderId: string): Promise<Bookmark[]>

export async function getBookmarks(userId: string | undefined, folderId?: string | null) {
  if (userId === undefined) {
    return []
  }

  const query: BookmarkQuery = { userId }

  if (folderId) {
    query.folderId = folderId
  }

  if (folderId === null) {
    query.folderId = null
  }

  const [bookmarks, queryError] = await handle(
    prisma.bookmark.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    }),
  )

  if (queryError) {
    throw queryError.message
  }

  return bookmarks
}

/** Get all bookmarks for a user and cache them */
export const getUserBookmarks = unstable_cache(
  async (userId) => {
    return await getBookmarks(userId, null)
  },
  ['bookmarks'],
  { revalidate: 3600, tags: ['bookmarks', 'folders'] },
)
