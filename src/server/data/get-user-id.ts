'use server'

import { cookies } from 'next/headers'

export async function getUserId() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('runnote:userId')

  if (!userId) {
    return null
  }

  return userId?.value
}
