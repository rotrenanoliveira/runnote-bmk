'use server'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { unstable_cache } from 'next/cache'

export async function getFolders(userId: string) {
  const [folders, queryError] = await handle(
    prisma.folder.findMany({
      where: { userId },
    }),
  )

  if (queryError) {
    return { folders: [] }
  }

  return { folders }
}

/** Get all folders for a user and cache them at nextjs level */
export const getUserFolders = unstable_cache(
  async (userId) => {
    return await getFolders(userId)
  },
  ['folders'],
  { revalidate: 3600, tags: ['folders'] },
)
