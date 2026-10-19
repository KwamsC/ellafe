import type { Block } from 'payload'

import { link } from '@/fields/link'

export const EditorialFeature: Block = {
  slug: 'editorialFeature',
  interfaceName: 'EditorialFeatureBlock',
  labels: {
    plural: 'Editorial Features',
    singular: 'Editorial Feature',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: 'Short label above the heading. Shown in small capitals.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Show button',
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image position',
      defaultValue: 'right',
      options: [
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Left',
          value: 'left',
        },
      ],
    },
  ],
}
