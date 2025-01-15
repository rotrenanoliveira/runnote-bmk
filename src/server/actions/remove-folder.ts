'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { removeFolder } from '../data/remove-folder'

export async function actionRemoveFolder(folderId: string) {
  const [_, queryError] = await removeFolder(folderId)

  if (queryError) {
    return { success: false, message: queryError.message }
  }

  revalidatePath('/', 'layout')
  revalidateTag('bookmarks')
  revalidateTag(`bookmarks-${folderId}`)

  return { success: true, message: 'Folder removed successfully.' }
}
