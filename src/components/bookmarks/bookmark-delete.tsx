import { toast } from 'sonner'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useBookmarks } from '@/components/bookmarks/bookmarks-context'
import { actionRemoveBookmark } from '@/server/actions/remove-bookmark'

interface RemoveBookmarkProps {
  bookmarkId: string
}

export function BookmarkDeleteButton({ bookmarkId }: RemoveBookmarkProps) {
  const [isPending, startTransition] = useTransition()
  const { remove } = useBookmarks()

  async function handleRemoveBookmark() {
    const result = await actionRemoveBookmark(bookmarkId)
    remove(bookmarkId)

    if (result.success === false) {
      toast.error(result.message)
      return
    }

    // TODO: verify if this is needed
    // router.refresh()
  }

  return (
    <DropdownMenuItem>
      <Button
        variant="ghost"
        className="w-full h-fit m-0 p-0 justify-start border-none hover:bg-none font-medium text-destructive hover:text-destructive"
        onClick={() => startTransition(handleRemoveBookmark)}
        disabled={isPending}
      >
        Remove
      </Button>
    </DropdownMenuItem>
  )
}
