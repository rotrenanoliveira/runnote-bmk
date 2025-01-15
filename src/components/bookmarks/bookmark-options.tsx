import { Ellipsis } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BookmarkDeleteButton } from './bookmark-delete'
import { BookmarkOptionSubMenu } from './bookmark-options-submenu'
import type { Bookmark } from '@/utils/types'

interface BookmarkOptionsProps {
  bookmark: Bookmark
}

export function BookmarkOptions({ bookmark }: BookmarkOptionsProps) {
  function handleCopyBookmark() {
    navigator.clipboard.writeText(bookmark.bookmarkUrl)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="flex items-center justify-center shadow-none bg-transparent rounded-lg size-10 hover:bg-foreground/5"
        >
          <Ellipsis className="size-5 text-foreground/50 group-hover:text-foreground/75" strokeWidth={1.25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Copy Bookmark */}
          <DropdownMenuItem>
            <Button
              variant="ghost"
              className="w-full h-fit m-0 p-0 justify-start border-none hover:bg-none font-medium"
              onClick={handleCopyBookmark}
            >
              Copy URL
              <DropdownMenuShortcut>⌘+⇧+C</DropdownMenuShortcut>
            </Button>
          </DropdownMenuItem>
          {/* new folder */}
          <DropdownMenuItem disabled>
            New Folder
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            {/* <FolderDialog /> */}
          </DropdownMenuItem>
          {/* move bookmark */}
          <BookmarkOptionSubMenu userId={bookmark.userId} bookmarkId={bookmark.id} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Remove Bookmark */}
        <BookmarkDeleteButton bookmarkId={bookmark.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
