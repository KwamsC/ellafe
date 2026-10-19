import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-14 w-full rounded-lg border border-field-border bg-field px-4 text-base leading-6 text-field-foreground ring-offset-0 placeholder:text-field-hint focus-visible:border-2 focus-visible:border-bronze focus-visible:outline-none disabled:cursor-not-allowed disabled:border-field-border disabled:bg-mist disabled:text-disabled aria-invalid:border-error aria-invalid:focus-visible:border-error',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
