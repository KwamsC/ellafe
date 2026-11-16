import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInEUR, title } = product

  let price = priceInEUR

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      typeof variant.priceInEUR === 'number'
    ) {
      price = variant.priceInEUR
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0].image !== 'string' ? gallery[0].image : undefined

  return (
    <Link
      className="flex h-full w-full flex-col bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
      data-theme="light"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {image ? (
          <Media
            fill
            htmlElement={null}
            imgClassName="object-cover"
            resource={image}
            size="(max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-3 p-4 lg:p-5">
        <p className="font-sans text-xs font-medium tracking-[1.2px] text-muted-foreground">
          ELLA’FÉ COLLECTION
        </p>
        <h2 className="font-display text-2xl leading-8 text-ink lg:text-[28px] lg:leading-9">{title}</h2>
        {typeof price === 'number' ? (
          <Price
            amount={price}
            as="p"
            className="font-sans text-base font-normal leading-[26px] text-ink"
          />
        ) : (
          <p className="font-sans text-base font-normal leading-[26px] text-ink">
            Price to be confirmed
          </p>
        )}
        <span className={cn(buttonVariants({ size: 'sm' }), 'w-full')}>View product</span>
      </div>
    </Link>
  )
}
