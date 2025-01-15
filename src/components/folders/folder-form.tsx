'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'
import { actionCreateFolder } from '@/server/actions/create-folder'

interface FolderFormProps {
  closeDialog: () => void
}

export function FolderForm({ closeDialog }: FolderFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [formState, handleSubmit, isPending] = useFormState(actionCreateFolder, {
    onSuccess,
    onError,
  })

  function onError(message: string) {
    toast.error(message)
  }

  function onSuccess() {
    closeDialog()
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        {formState.success === false && <p className="text-red-500">{formState.message}</p>}
        <div className="flex flex-col gap-2">
          <Input type="text" name="folder" placeholder="enter folder name" />
          <Button type="submit" disabled={isPending}>
            Add Folder
          </Button>
        </div>
      </form>
    </div>
  )
}
