'use client'

import type { Media as MediaType, Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DefaultDocumentIDType } from 'payload'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  useEffect(() => {
    const values = Array.from(searchParams.values())

    if (values && api) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) return false

        let variantID: DefaultDocumentIDType

        if (typeof item.variantOption === 'object') {
          variantID = item.variantOption.id
        } else variantID = item.variantOption

        return Boolean(values.find((value) => value === String(variantID)))
      })
      if (index !== -1) {
        setCurrent(index)
        api.scrollTo(index, true)
      }
    }
  }, [searchParams, api, gallery])

  return (
    <div>
      <div className="relative mb-8 aspect-square w-full overflow-hidden bg-white">
        <Media
          fill
          htmlElement={null}
          imgClassName="object-cover"
          resource={gallery[current].image}
        />
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent>
          {gallery.map((item, i) => {
            if (typeof item.image !== 'object') return null

            return (
              <CarouselItem className="basis-1/4 sm:basis-1/5" key={`${item.image.id}-${i}`}>
                <button
                  aria-current={i === current ? 'true' : undefined}
                  aria-label={`Show image ${i + 1}`}
                  className={cn(
                    'relative block aspect-square w-full cursor-pointer overflow-hidden border bg-white',
                    i === current ? 'border-espresso' : 'border-subtle',
                  )}
                  onClick={() => setCurrent(i)}
                  type="button"
                >
                  <Media
                    fill
                    htmlElement={null}
                    imgClassName="object-cover"
                    resource={item.image}
                  />
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
