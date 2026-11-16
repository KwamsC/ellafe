import type { Block } from 'payload'

export const BenefitsStrip: Block = {
  slug: 'benefitsStrip',
  interfaceName: 'BenefitsStripBlock',
  labels: {
    plural: 'Benefits Strips',
    singular: 'Benefits Strip',
  },
  fields: [
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      labels: {
        plural: 'Benefits',
        singular: 'Benefit',
      },
      minRows: 1,
      maxRows: 4,
      required: true,
      admin: {
        description: 'Up to four benefits. Choose an icon, then edit the heading and description.',
        initCollapsed: false,
      },
      defaultValue: [
        {
          icon: 'shield',
          heading: 'Keeps your bag clean',
          description: 'Keep your bag off the floor\nand close to you.',
        },
        {
          icon: 'handbag',
          heading: 'Always within reach',
          description: 'A discreet place for your bag,\nright where you need it.',
        },
        {
          icon: 'diamond',
          heading: 'Function meets elegance',
          description: 'Premium zinc alloy with\na timeless, refined finish.',
        },
        {
          icon: 'gift',
          heading: 'A considered detail',
          description: 'Thoughtful design for you\nand everything you carry.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'shield',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Handbag', value: 'handbag' },
            { label: 'Diamond', value: 'diamond' },
            { label: 'Gift', value: 'gift' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
}
