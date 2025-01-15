import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { Bookmark, BookmarkUpdateInput, ResponseError } from '@/utils/types'

export async function updateBookmark(data: BookmarkUpdateInput): Promise<[Bookmark, null] | [null, ResponseError]> {
  return await handle(
    prisma.bookmark.update({
      where: { id: data.bookmarkId },
      data: { folderId: data.folderId },
    }),
  )
}
