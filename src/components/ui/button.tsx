import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent font-control text-base font-medium leading-6 transition-colors focus-visible:outline-[3px] focus-visible:outline-bronze focus-visible:outline-offset-0 disabled:pointer-events-none disabled:border-transparent disabled:bg-mist disabled:text-disabled',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: 'h-auto min-w-0 rounded-none px-0',
        default: 'h-14 min-w-28 px-8',
        icon: 'size-11 min-w-11 px-0',
        lg: 'h-14 min-w-28 px-8',
        sm: 'h-11 min-w-28 px-6',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed',
        destructive: 'bg-error text-white hover:bg-error/90',
        ghost:
          'bg-transparent text-tertiary-foreground hover:bg-tertiary-hover active:bg-tertiary-hover',
        link: 'h-auto min-w-0 rounded-none bg-transparent px-0 text-link underline-offset-4 hover:underline focus-visible:outline-offset-4',
        outline:
          'border-secondary-border bg-transparent text-secondary-foreground hover:border-secondary-border hover:bg-secondary-hover active:bg-secondary-hover disabled:border-subtle',
        secondary:
          'border-secondary-border bg-transparent text-secondary-foreground hover:border-secondary-border hover:bg-secondary-hover active:bg-secondary-hover disabled:border-subtle',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
