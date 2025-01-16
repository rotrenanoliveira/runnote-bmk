import { getBookmark } from '@/server/data/get-bookmark'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const bookmarkId = (await params).id

  const [bookmark, queryError] = await getBookmark(bookmarkId)

  if (queryError) {
    return new Response(JSON.stringify(queryError), { status: 400 })
  }

  return Response.json({ bookmark })
}
