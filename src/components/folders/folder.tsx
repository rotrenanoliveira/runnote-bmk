import { unstable_cache } from 'next/cache'

import { getBookmarks } from '@/server/data/get-bookmarks'
import { CollapsibleFolder } from './collapsible-folder'
import type { Folder as FolderType } from '@/utils/types'

interface FolderProps {
  folder: FolderType
}

/** Get all bookmarks for a user and cache them */
const getBookmarksByFolder = (folder: string) =>
  unstable_cache(
    async (userId: string, folderId: string) => {
      return await getBookmarks(userId, folderId)
    },
    [`bookmarks-${folder}`],
    { revalidate: 3600, tags: [`bookmarks-${folder}`] },
  )

export async function Folder({ folder }: FolderProps) {
  const getBookmarks = getBookmarksByFolder(folder.folderId)
  const bookmarks = await getBookmarks(folder.userId, folder.folderId)

  return <CollapsibleFolder bookmarks={bookmarks} folder={folder} />
}
