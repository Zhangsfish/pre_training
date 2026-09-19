import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { assertValid } from './content.mjs';
const mode = process.argv[2];
if (!['production', 'review'].includes(mode)) throw new Error('Explicit production or review mode required');
assertValid(mode);
const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url)), 'build'], {
  stdio: 'inherit', env: { ...process.env, PRETRAINING_REVIEW: mode === 'review' ? '1' : '0', ASTRO_TELEMETRY_DISABLED: '1' },
});
process.exit(result.status ?? 1);
