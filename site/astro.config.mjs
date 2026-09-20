import { defineConfig } from 'astro/config';
import { assertValid } from './scripts/content.mjs';
const review = process.env.PRETRAINING_REVIEW === '1';
export default defineConfig({
  site: 'https://zhang-shuo-portfolio.vercel.app',
  output: 'static',
  vite: {build: {assetsInlineLimit: 0}},
  outDir: review ? './.review-dist' : './dist',
  integrations: [{ name: 'publication-gate', hooks: {
    'astro:build:start': () => { assertValid(review ? 'review' : 'production'); },
  } }],
});
