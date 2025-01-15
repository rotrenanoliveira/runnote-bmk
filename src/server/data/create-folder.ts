import { generateNanoId } from '@/lib/nanoid'
import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { Folder, FolderCreateInput, ResponseError } from '@/utils/types'

/** save folder to database */
export async function createFolder(data: FolderCreateInput): Promise<[Folder, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.folder.create({
      data: {
        folderId: generateNanoId(),
        userId: data.userId,
        name: data.name,
      },
    }),
  )

  return result
}
