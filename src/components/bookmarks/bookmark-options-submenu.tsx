import { useQuery } from '@tanstack/react-query'

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { getFolders } from '@/server/data/get-folders'
import { BookmarkMove } from './bookmark-move'

interface MoveBookmarkProps {
  userId: string
  bookmarkId: string
}

export function BookmarkOptionSubMenu({ userId, bookmarkId }: MoveBookmarkProps) {
  const { data } = useQuery({
    queryKey: ['folders'],
    queryFn: () => getFolders(userId),
  })

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {data?.folders.length === 0 && (
            <DropdownMenuItem className="text-muted-foreground/50 hover:bg-inherit">
              No folders registered.
            </DropdownMenuItem>
          )}

          {data?.folders.map((folder) => (
            <BookmarkMove
              key={folder.folderId}
              bookmarkId={bookmarkId}
              folderId={folder.folderId}
              folderName={folder.name}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
