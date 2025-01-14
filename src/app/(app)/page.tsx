import { redirect } from 'next/navigation'

import { getUserId } from '@/server/data/get-user-id'
import { BookmarkForm } from '@/components/bookmarks/bookmark-form'
import { UnfoldedBookmarks } from './_components/unfolded-bookmarks'

export default async function HomePage() {
  const userId = await getUserId()

  if (!userId) {
    redirect('/api/sync/generate')
  }

  return (
    <div className="flex flex-col min-h-screen w-screen p-6">
      {/* <Header /> */}
      <main className="w-full flex flex-col items-center py-6 space-y-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-2">
          <BookmarkForm />
        </div>

        <section className="w-full max-w-4xl grid grid-cols-1 gap-4">
          <UnfoldedBookmarks />
        </section>
      </main>
    </div>
  )
}
