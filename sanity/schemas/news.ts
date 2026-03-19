import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsPost',
  title: 'News Posts',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Publication Date', validation: (R) => R.required() }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: { list: ['News', 'Insight', 'Event'] },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'mainImage', type: 'image', title: 'Featured Image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt (max 160 characters)', validation: (R) => R.required().max(160) }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'author', type: 'string', title: 'Author' }),
    defineField({
      name: 'externalLink',
      type: 'url',
      title: 'External Link (optional)',
      description: 'If set, the post card will link here instead of the internal article page.',
    }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
})
