import type { Media, Product, ThreeItemGridBlock as ThreeItemGridBlockProps } from '@/payload-types'

import { GridTileImage } from '@/components/Grid/tile'
import { RichText } from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload, type DefaultDocumentIDType } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React from 'react'

type Layout = 'equal' | 'featuredLeft' | 'featuredRight'

type ItemProps = {
  index?: number
  item: Product
  layout: Layout
  role: 'featured' | 'supporting'
}

const productImage = (product: Product): Media | undefined => {
  const galleryImage = product.gallery?.find((entry) => typeof entry.image === 'object')?.image
  if (galleryImage && typeof galleryImage === 'object') return galleryImage

  const metaImage = product.meta?.image
  if (metaImage && typeof metaImage === 'object') return metaImage

  return undefined
}

const hasImage = (product: number | Product): product is Product => {
  return typeof product === 'object' && Boolean(productImage(product))
}

const resolveProducts = async (
  products: ThreeItemGridBlockProps['products'],
): Promise<Product[]> => {
  const entries = (products ?? []).slice(0, 3)
  if (entries.length < 3) return []

  if (entries.every(hasImage)) return entries

  const ids = entries.map((product) => (typeof product === 'object' ? product.id : product))
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    draft,
    limit: 3,
    overrideAccess: draft,
    pagination: false,
    where: {
      id: {
        in: ids,
      },
    },
  })

  return ids.flatMap((id) => {
    const product = result.docs.find((doc) => doc.id === id)
    return product ? [product] : []
  })
}

const itemClassName = (layout: Layout, role: 'featured' | 'supporting', index: number) => {
  if (layout === 'equal') return 'md:col-span-1'

  if (layout === 'featuredRight') {
    if (role === 'featured') return 'md:col-span-4 md:col-start-3 md:row-span-2 md:row-start-1'
    return index === 1
      ? 'md:col-span-2 md:col-start-1 md:row-start-1'
      : 'md:col-span-2 md:col-start-1 md:row-start-2'
  }

  return role === 'featured' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2'
}

export const ThreeItemGridItem: React.FC<ItemProps> = ({ item, layout, role, index = 0 }) => {
  let price = item.priceInEUR

  if (item.enableVariants && item.variants?.docs?.length) {
    const variant = item.variants.docs[0]

    if (variant && typeof variant === 'object' && variant.priceInEUR) {
      price = variant.priceInEUR
    }
  }

  return (
    <div className={itemClassName(layout, role, index)}>
      <Link className="relative block aspect-square h-full w-full" href={`/products/${item.slug}`}>
        <GridTileImage
          label={{
            amount: price!,
            position: role === 'featured' && layout !== 'equal' ? 'center' : 'bottom',
            title: item.title,
          }}
          media={productImage(item)}
        />
      </Link>
    </div>
  )
}

export const ThreeItemGridBlock: React.FC<
  ThreeItemGridBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = async ({ layout, products, text }) => {
  const resolved = await resolveProducts(products)

  if (resolved.length < 3) return null

  const selectedLayout: Layout = layout || 'featuredLeft'
  const [firstProduct, secondProduct, thirdProduct] = resolved

  return (
    <section className="container flex flex-col gap-8">
      {text ? (
        <RichText
          className="w-full text-ink [&_h1]:mb-3 [&_h1]:font-display [&_h1]:text-[40px] [&_h1]:leading-[1.15] lg:[&_h1]:text-[56px] lg:[&_h1]:leading-[1.1] [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-[32px] [&_h2]:leading-10 lg:[&_h2]:text-[48px] lg:[&_h2]:leading-14 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-2xl lg:[&_h3]:text-[32px] [&_h4]:mb-2 [&_h4]:font-display [&_h4]:text-xl [&_p]:font-sans [&_p]:text-base [&_p]:leading-7 [&_p]:text-muted-foreground"
          data={text}
          enableGutter={false}
          enableProse={false}
        />
      ) : null}
      <div
        className={
          selectedLayout === 'equal'
            ? 'grid gap-4 md:grid-cols-3'
            : 'grid gap-4 md:grid-cols-6 md:grid-rows-2'
        }
      >
        <ThreeItemGridItem
          index={0}
          item={firstProduct}
          layout={selectedLayout}
          role={selectedLayout === 'equal' ? 'supporting' : 'featured'}
        />
        <ThreeItemGridItem index={1} item={secondProduct} layout={selectedLayout} role="supporting" />
        <ThreeItemGridItem index={2} item={thirdProduct} layout={selectedLayout} role="supporting" />
      </div>
    </section>
  )
}
