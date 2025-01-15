'use client'

import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FolderForm } from './folder-form'

export function FolderDialog() {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-[family-name:var(--font-geist-mono)]">
          folder
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-72 font-[family-name:var(--font-geist-sans)]">
        {/* dialog header */}
        <DialogHeader>
          <DialogTitle className="text-center">new folder</DialogTitle>
        </DialogHeader>
        {/* new folder form */}
        <FolderForm closeDialog={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
