import type { ZodError } from 'zod'
import type { ResponseError } from './types'

/** waits for a given amount of time */
export async function wait(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Handles errors from callback function
 *
 * @example
 * ```typescript
 * const result = await handle(prisma.user.findMany())
 * ```
 */
export async function handle<T>(query: Promise<T>): Promise<[T, null] | [null, ResponseError]> {
  try {
    const result = await query

    return [result, null]
  } catch (error) {
    // TODO: remove this
    console.error(error)

    if (error instanceof Error) return [null, { success: false, message: error.message }]

    return [null, { success: false, message: 'Unexpected error, try again in a few minutes.' }]
  }
}

/** formats ZodError to an array of objects */
export const formatZodError = (error: ZodError) => {
  const errors = Object.entries(error.flatten().fieldErrors as Record<string, string[]>)
    .map(([key, value]) => ({ field: key, message: value[0] }))
    .filter(({ message }) => message)

  return errors
}
