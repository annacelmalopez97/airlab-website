import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (R) => R.required() }),
    defineField({ name: 'role', type: 'string', title: 'Title / Role', validation: (R) => R.required() }),
    defineField({ name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'bio', type: 'text', title: 'Bio' }),
    defineField({ name: 'linkedIn', type: 'url', title: 'LinkedIn URL' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order', description: 'Lower number = appears first', validation: (R) => R.required() }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
