import { z } from 'zod'

/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** standard response error */
export const responseError = z.object({
  success: z.literal(false),
  message: z.string(),
})

/** standard response error */
export type ResponseError = z.infer<typeof responseError>
