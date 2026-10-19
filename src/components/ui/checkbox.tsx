'use client'

import { cn } from '@/utilities/ui'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

const Checkbox: React.FC<
  {
    ref?: React.Ref<HTMLButtonElement>
  } & React.ComponentProps<typeof CheckboxPrimitive.Root>
> = ({ className, ref, ...props }) => (
  <CheckboxPrimitive.Root
    className={cn(
      'peer size-5 shrink-0 rounded border border-field-border bg-field text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze disabled:cursor-not-allowed disabled:border-field-border disabled:bg-mist disabled:text-disabled data-[state=checked]:border-espresso data-[state=checked]:bg-espresso data-[state=checked]:text-white',
      className,
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export { Checkbox }
