import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260413_000109 from './20260413_000109';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260413_000109.up,
    down: migration_20260413_000109.down,
    name: '20260413_000109'
  },
];
