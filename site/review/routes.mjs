import { fileURLToPath } from 'node:url';
export const directions = ['a', 'b', 'c'];
export function reviewRoutes(enabled) {
  return enabled ? directions.map(id => ({
    pattern: `/review/${id}/`,
    entrypoint: fileURLToPath(new URL(`./${id}.astro`, import.meta.url)),
    prerender: true,
  })) : [];
}
export function visualReview(enabled) {
  return { name: 'r02-visual-review', hooks: {
    'astro:config:setup': ({ injectRoute }) => { reviewRoutes(enabled).forEach(injectRoute); },
  } };
}
