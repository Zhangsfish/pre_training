import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: '../publication/projects' }),
  schema: z.object({
    id: z.enum(['kin', 'spps', 'qq-lingxi', 'pet', 'teaching', 'natural-product']),
    title: z.string(), status_label: z.string(), period: z.string().nullable(),
    publication: z.enum(['draft', 'approved', 'excluded']),
    summary: z.string(), ownership: z.string(), result: z.string(), boundary: z.string(),
    claim_ids: z.array(z.string()).min(1), link_ids: z.array(z.string()), media_ids: z.array(z.string()),
  }),
});
export const collections = { projects };
