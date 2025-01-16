import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { actionAddBookmarkToFolder } from '@/server/actions/add-bookmark-to-folder'

interface BookmarkMoveProps {
  bookmarkId: string
  folderId: string
  folderName: string
}

export function BookmarkMove({ bookmarkId, folderId, folderName }: BookmarkMoveProps) {
  const router = useRouter()

  async function handleUpdateBookmark(folderId: string) {
    const result = await actionAddBookmarkToFolder({
      bookmarkId,
      folderId,
    })

    if (result.success === false) {
      toast.error(result.message)
      return
    }

    router.refresh()
  }

  return (
    <DropdownMenuItem key={folderId}>
      <Button
        variant="ghost"
        className="w-full h-fit m-0 p-0 justify-start border-none capitalize"
        onClick={() => handleUpdateBookmark(folderId)}
      >
        {folderName}
      </Button>
    </DropdownMenuItem>
  )
}
