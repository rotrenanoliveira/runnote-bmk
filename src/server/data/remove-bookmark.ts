'use server'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError } from '@/utils/types'

export async function removeBookmark(bookmarkId: string): Promise<[null, null] | [null, ResponseError]> {
  const [_, queryError] = await handle(prisma.bookmark.delete({ where: { id: bookmarkId } }))

  if (queryError) {
    return [null, queryError]
  }

  return [null, null]
}
