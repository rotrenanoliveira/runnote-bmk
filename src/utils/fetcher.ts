import { HTTPError } from 'ky'

import type { ResponseError } from './types'

/** Fetcher Response */
type FetcherResponse<T> = [T, null] | [null, ResponseError]
/** Fetcher Options */
type FetcherOptions = { throw: boolean }

/** Handles errors from fetcher function, returns a tuple of [data, error] */
export function fetcher<T>(args: Promise<T>, options: { throw: false }): Promise<FetcherResponse<T>>
/** Handles errors from fetcher function, throws an error if options.throw is true */
export function fetcher<T>(args: Promise<T>, options: { throw: true }): Promise<T>
/** Handles errors from fetcher function, returns a tuple of [data, error] */
export function fetcher<T>(args: Promise<T>, options?: FetcherOptions): Promise<FetcherResponse<T>>

export async function fetcher<T>(args: Promise<T>, options: FetcherOptions = { throw: false }) {
  try {
    const data = await args

    if (options.throw === true) return data as T

    return [data, null]
  } catch (error) {
    // TODO: remove this
    console.error(error)

    // TODO: handle errors from different sources
    if (error instanceof HTTPError) {
      const apiError = await error.response.json<{ message: string; errors?: string }>()

      if (options.throw) throw new Error(apiError.message)

      return [null, { success: false, message: apiError.errors ?? apiError.message }]
    }

    if (error instanceof Error) {
      if (options.throw) throw new Error(error.message)

      return [null, { success: false, message: error.message }]
    }

    if (options.throw) throw new Error('Unexpected error, try again in a few minutes.')

    return [null, { success: false, message: 'Unexpected error, try again in a few minutes.' }]
  }
}
