import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-32 w-full rounded-lg border border-field-border bg-field px-4 py-4 text-base leading-6 text-field-foreground placeholder:text-field-hint focus-visible:border-2 focus-visible:border-bronze focus-visible:outline-none disabled:cursor-not-allowed disabled:border-field-border disabled:bg-mist disabled:text-disabled aria-invalid:border-error aria-invalid:focus-visible:border-error',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
