import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Organization Name', validation: (R) => R.required() }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', validation: (R) => R.required() }),
    defineField({ name: 'websiteUrl', type: 'url', title: 'Website URL' }),
    defineField({
      name: 'showOn',
      type: 'string',
      title: 'Show On',
      options: { list: ['Home', 'About', 'Both'] },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order', description: 'Lower number = appears first', validation: (R) => R.required() }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'logo' } },
})
