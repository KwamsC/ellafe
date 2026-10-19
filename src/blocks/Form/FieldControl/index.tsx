import { cn } from '@/utilities/ui'
import React from 'react'

type FieldControlProps = {
  invalid?: boolean
  align?: 'center' | 'start'
  children: React.ReactNode
  className?: string
}

export const FieldControl: React.FC<FieldControlProps> = ({
  invalid = false,
  align = 'center',
  children,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {invalid ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-4 font-sans text-lg leading-none text-error',
            align === 'center' ? 'top-1/2 -translate-y-1/2' : 'top-4',
          )}
        >
          !
        </span>
      ) : null}
    </div>
  )
}
