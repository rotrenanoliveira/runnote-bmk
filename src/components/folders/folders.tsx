import React from 'react'

import { getUserFolders } from '@/server/data/get-folders'
import { getUserId } from '@/server/data/get-user-id'
import { Folder } from './folder'

export async function Folders() {
  const userId = await getUserId()
  const { folders } = await getUserFolders(userId)

  return (
    <div className="space-y-2">
      {/* registered folders */}
      {folders.map((folder) => (
        <React.Suspense key={folder.folderId}>
          <Folder folder={folder} />
        </React.Suspense>
      ))}
    </div>
  )
}
