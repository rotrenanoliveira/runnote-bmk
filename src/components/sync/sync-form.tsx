'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'
import { actionSyncUser } from '@/server/actions/sync-user'

interface SyncFormProps {
  closeDialog: () => void
}

export function SyncForm({ closeDialog }: SyncFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [formState, handleSubmit, isPending] = useFormState(actionSyncUser, {
    onSuccess,
  })

  function onSuccess() {
    closeDialog()
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        {formState.success === false && <p className="text-red-500">{formState.message}</p>}
        <div className="flex flex-col gap-2">
          <Input type="text" name="code" placeholder="Enter code" />
          <Button type="submit" disabled={isPending}>
            Sync
          </Button>
        </div>
      </form>
    </div>
  )
}
