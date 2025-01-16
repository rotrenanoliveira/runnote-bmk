import { generateNanoId } from '@/lib/nanoid'
import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { Bookmark, BookmarkCreateInput, ResponseError } from '@/utils/types'

/** save bookmark to database */
export async function createBookmark(data: BookmarkCreateInput): Promise<[Bookmark, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.bookmark.create({
      data: {
        id: generateNanoId(),
        userId: data.userId,
        bookmarkUrl: data.bookmarkUrl,
        title: data.title,
        favicon: data.favicon,
        description: data.description,
        ogImage: data.ogImage,
      },
    }),
  )

  return result
}
