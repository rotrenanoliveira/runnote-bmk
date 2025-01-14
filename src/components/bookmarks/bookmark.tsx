'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { BookmarkOptions } from './bookmark-options'
import type { Bookmark as BookmarkType } from '@/utils/types'

interface BookmarkProps {
  bookmark: BookmarkType
}

export function Bookmark({ bookmark }: BookmarkProps) {
  const bookmarkTitle = bookmark.title.length > 30 ? bookmark.title.substring(0, 30).concat('...') : bookmark.title

  const bookmarkUrl =
    bookmark.bookmarkUrl.length > 30 ? bookmark.bookmarkUrl.substring(0, 30).concat('...') : bookmark.bookmarkUrl

  const bookmarkCreatedAt = new Date(bookmark.createdAt)

  return (
    <div className="flex items-center justify-between gap-1 font-[family-name:var(--font-geist-sans)]">
      <Button
        type="button"
        variant="ghost"
        className="w-full h-12 flex items-center justify-between rounded-xl p-1 m-0 group hover:bg-foreground/5 hover:border-foreground/15"
        asChild
      >
        <div className="w-full">
          <Link href={bookmark.bookmarkUrl} target="_blank" className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-2 ml-1">
              {bookmark.favicon ? (
                <Image src={bookmark.favicon} alt={bookmark.title} width={24} height={24} />
              ) : (
                <Star className="size-6 text-muted-foreground" />
              )}
              <p className="font-semibold truncate">{bookmarkTitle}</p>
              <span className="hidden md:inline font-light text-muted-foreground/75">{bookmarkUrl}</span>
            </div>

            <span className="hidden md:inline text-sm font-light">
              {Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(bookmarkCreatedAt)}
            </span>
          </Link>

          <BookmarkOptions bookmark={bookmark} />
        </div>
      </Button>
    </div>
  )
}
