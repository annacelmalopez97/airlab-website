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
      name: 'tier',
      type: 'string',
      title: 'Partner Tier',
      description: 'Institutional = government/regulatory/industry orgs. Startup = tech companies and startups.',
      options: { list: ['institutional', 'startup'] },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'Used on startup partner cards. 1–2 sentences about the collaboration.',
      rows: 3,
    }),
    defineField({
      name: 'categoryTag',
      type: 'string',
      title: 'Category Tag',
      description: 'Startup tier only. E.g. ATM TECH, AI/DATA, SIMULATION, DRONE/UAM',
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order', description: 'Lower number = appears first', validation: (R) => R.required() }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } },
})
