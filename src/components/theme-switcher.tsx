'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <div className="flex items-center justify-center">
      <button type="button" className="dark:hidden" onClick={() => setTheme('dark')}>
        <MoonIcon className="size-6" strokeWidth={1.25} />
      </button>

      <button type="button" className="hidden dark:block w-fit" onClick={() => setTheme('light')}>
        <Sun className="size-6" strokeWidth={1.25} />
      </button>
    </div>
  )
}
