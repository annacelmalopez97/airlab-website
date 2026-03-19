import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'initiative',
  title: 'Initiatives',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'shortDescription', type: 'text', title: 'Short Description (max 160 characters)', validation: (R) => R.required().max(160) }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['Active', 'Completed', 'Upcoming'] },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'partnerOrganizations', type: 'string', title: 'Partner Organizations', description: 'Comma-separated list of partner organization names.' }),
    defineField({
      name: 'publicationsAndLinks',
      type: 'array',
      title: 'Publications & Links',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order', description: 'Lower number = appears first', validation: (R) => R.required() }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'status', media: 'coverImage' } },
})
