import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' && doc.slug) {
      const path = `/products/${doc.slug}`

      payload.logger.info(`Revalidating product at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/shop')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published' && previousDoc.slug) {
      const oldPath = `/products/${previousDoc.slug}`

      payload.logger.info(`Revalidating old product at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/shop')
    }
  }

  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(`/products/${doc.slug}`)
    revalidatePath('/shop')
  }

  return doc
}
