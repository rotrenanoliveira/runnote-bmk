'use client'

import { useTransition } from 'react'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import { actionRemoveFolder } from '@/server/actions/remove-folder'

interface FolderDeleteButtonProps {
  folderId: string
}

export function FolderDeleteButton({ folderId }: FolderDeleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleRemoveFolder() {
    const result = await actionRemoveFolder(folderId)

    if (result.success === false) {
      toast.error(result.message)
      return
    }

    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="flex items-center justify-center shadow-none bg-transparent rounded-lg size-10 hover:bg-destructive/25 dark:hover:bg-destructive/50"
      onClick={() => startTransition(handleRemoveFolder)}
      disabled={isPending}
    >
      <TrashIcon className="size-5 text-destructive dark:text-white" strokeWidth={1.25} />
    </Button>
  )
}
