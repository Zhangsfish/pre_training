import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url)), 'preview', '--host', '127.0.0.1', ...process.argv.slice(2)], {
  stdio: 'inherit', env: { ...process.env, PRETRAINING_REVIEW: '1', ASTRO_TELEMETRY_DISABLED: '1' },
});
process.exit(result.status ?? 1);
