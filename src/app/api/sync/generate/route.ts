import { env } from 'node:process'
import { generateNanoId } from '@/lib/nanoid'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const userId = generateNanoId()

  const cookieStore = await cookies()
  cookieStore.set('runnote:userId', userId)

  redirect(new URL(env.APP_URL ?? '/').toString())
}
