import { CopyIcon } from 'lucide-react'

import { DropdownMenuItem } from '../ui/dropdown-menu'

interface BookmarkCopyProps {
  bookmarkUrl: string
}

export function BookmarkCopy({ bookmarkUrl }: BookmarkCopyProps) {
  function handleCopyBookmark() {
    navigator.clipboard.writeText(bookmarkUrl)
  }

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleCopyBookmark}>
      <CopyIcon strokeWidth={1.25} className="size-4" />
      Copy URL
      {/* <DropdownMenuShortcut>⌘+⇧+C</DropdownMenuShortcut> */}
    </DropdownMenuItem>
  )
}
