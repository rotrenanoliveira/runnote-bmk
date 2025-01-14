'use client'

import { useRef } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useBookmarks } from '@/components/bookmarks/bookmarks-context'
import { useFormState } from '@/hooks/use-form-state'
import { actionAddBookmark } from '@/server/actions/add-bookmark'

export function BookmarkForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const { create } = useBookmarks()

  function optimisticFn(formData: FormData) {
    const url = formData.get('url')?.toString()

    if (!url) {
      toast.error('Invalid URL!')
      return
    }

    const match = url.match(/^(?:https?:\/\/)?([^?#]+).*$/)
    const title = match ? match[1] : url

    create({ title, bookmarkUrl: url })
  }

  const [formState, handleSubmit, isPending] = useFormState(actionAddBookmark, {
    onSuccess,
    onError,
    optimisticFn,
    formRef,
    reset: true,
  })

  function onError(message: string) {
    toast.error(message)
  }

  function onSuccess() {
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-2">
        {formState.success === false && <p className="text-red-500">{formState.message}</p>}
        <div className="flex gap-2">
          <Input type="text" name="url" placeholder="Enter URL" />
          <Button type="submit" disabled={isPending}>
            <Plus strokeWidth={1.25} className="size-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
