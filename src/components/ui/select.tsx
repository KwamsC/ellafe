'use client'

import { cn } from '@/utilities/ui'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger: React.FC<
  { ref?: React.Ref<HTMLButtonElement> } & React.ComponentProps<typeof SelectPrimitive.Trigger>
> = ({ children, className, ref, ...props }) => (
  <SelectPrimitive.Trigger
    className={cn(
      'flex h-14 w-full items-center justify-between rounded-lg border border-field-border bg-field px-4 text-base leading-6 text-field-foreground placeholder:text-field-hint focus-visible:border-2 focus-visible:border-bronze focus-visible:outline-none disabled:cursor-not-allowed disabled:border-field-border disabled:bg-mist disabled:text-disabled aria-invalid:border-error [&>span]:line-clamp-1',
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

const SelectScrollUpButton: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
)

const SelectScrollDownButton: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<
    typeof SelectPrimitive.ScrollDownButton
  >
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
)

const SelectContent: React.FC<
  {
    ref?: React.Ref<HTMLDivElement>
  } & React.ComponentProps<typeof SelectPrimitive.Content>
> = ({ children, className, position = 'popper', ref, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-subtle bg-field text-field-foreground shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectLabel: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.Label>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Label
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    ref={ref}
    {...props}
  />
)

const SelectItem: React.FC<
  { ref?: React.Ref<HTMLDivElement>; value: string } & React.ComponentProps<
    typeof SelectPrimitive.Item
  >
> = ({ children, className, ref, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-8 pr-2 font-sans text-base leading-6 outline-none focus:bg-linen focus:text-ink data-[disabled]:pointer-events-none data-[disabled]:text-disabled',
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectSeparator: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    ref={ref}
    {...props}
  />
)

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
