import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="ghost"
      size="clear"
      aria-label={quantity ? `Cart, ${quantity} items` : 'Cart'}
      className="relative h-11 items-center px-0 text-current hover:bg-transparent"
      {...rest}
    >
      <ShoppingCart aria-hidden className="size-5" strokeWidth={1.5} />
      {quantity ? (
        <span className="absolute -top-1 -right-2 min-w-4 text-center font-sans text-[10px] leading-none">
          {quantity}
        </span>
      ) : null}
    </Button>
  )
}
