import { type FormEvent, type RefObject, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  opts?: {
    /** Callback when the form has an error. */
    onError?: (message: string) => void
    /** Callback when the form has a success. */
    onSuccess?: (message?: string) => Promise<void> | void
    /** Optimistic function to use with the use form state. */
    optimisticFn?: (formData: FormData) => void
    /** Initial data for the form. */
    initialData?: FormState
    /** This will reset the form state when the action is successful. */
    reset?: boolean
    /** This is needed to access the form element. */
    formRef?: RefObject<HTMLFormElement | null>
  },
) {
  const initialData = opts?.initialData

  const [isTransitioning, startTransition] = useTransition()

  const [result, setResult] = useState(initialData ?? { success: false, message: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      if (opts?.optimisticFn) {
        opts.optimisticFn(data)
      }

      const result = await action(data)

      if (result.success === false && opts?.onError) {
        return opts.onError(result.message)
      }

      if (result.success === true && opts?.onSuccess) {
        if (opts?.reset && opts.formRef) {
          form.reset()
        }

        return await opts.onSuccess(result.message)
      }

      setResult(result)
    })
  }

  const isPending = isTransitioning

  return [result, handleSubmit, isPending] as const
}
