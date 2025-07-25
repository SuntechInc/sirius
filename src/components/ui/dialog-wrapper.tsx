'use client'

import type { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DialogWrapperProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: ReactNode
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DialogWrapper({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
}: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
