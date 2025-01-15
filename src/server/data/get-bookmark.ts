import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { Bookmark, ResponseError } from '@/utils/types'

export async function getBookmark(bookmarkId: string): Promise<[Bookmark, null] | [null, ResponseError]> {
  const [bookmark, queryError] = await handle(
    prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    }),
  )

  if (queryError) {
    return [null, queryError]
  }

  if (!bookmark) {
    return [null, { success: false, message: 'Bookmark not found' }]
  }

  return [bookmark, null]
}
