import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: () => true, // Public read access
    create: () => true, // Allow anyone to create pages
    update: () => true, // Allow anyone to update pages
    delete: () => true, // Allow anyone to delete pages
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
