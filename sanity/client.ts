import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'h91neguo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
