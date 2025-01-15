'use server'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError } from '@/utils/types'

export async function removeFolder(folderId: string): Promise<[null, null] | [null, ResponseError]> {
  const [_, queryError] = await handle(prisma.folder.delete({ where: { folderId } }))

  if (queryError) {
    return [null, queryError]
  }

  return [null, null]
}
