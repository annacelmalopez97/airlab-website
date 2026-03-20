import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'rcp',
  title: 'RCP Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroVideoUrl', type: 'url', title: 'Hero Background Video URL' }),
    defineField({ name: 'explainerVideoUrl', type: 'url', title: 'Explainer Video URL (YouTube/Vimeo embed)' }),
    defineField({
      name: 'timelineItems',
      type: 'array',
      title: 'Timeline Items',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'phase', type: 'string', title: 'Phase Label', description: 'E.g. "2019–2023" or "2025"', validation: (R) => R.required() }),
          defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
          defineField({ name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] }),
          defineField({ name: 'isCurrent', type: 'boolean', title: 'Is Current Phase', initialValue: false }),
        ],
        preview: { select: { title: 'title', subtitle: 'phase' } },
      }],
    }),
    defineField({
      name: 'useCaseImages',
      type: 'array',
      title: 'FF-ICE Use Case Images',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true }, validation: (R) => R.required() }),
          defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          defineField({ name: 'altText', type: 'string', title: 'Alt Text', validation: (R) => R.required() }),
          defineField({ name: 'order', type: 'number', title: 'Display Order', validation: (R) => R.required() }),
        ],
        preview: { select: { title: 'caption', media: 'image' } },
      }],
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Resources (Documents & Links)',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label', validation: (R) => R.required() }),
          defineField({ name: 'url', type: 'url', title: 'URL', validation: (R) => R.required() }),
          defineField({
            name: 'type',
            type: 'string',
            title: 'Type',
            options: { list: ['pdf', 'link'] },
            validation: (R) => R.required(),
          }),
        ],
        preview: { select: { title: 'label', subtitle: 'type' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'RCP Page Content' }) },
})
