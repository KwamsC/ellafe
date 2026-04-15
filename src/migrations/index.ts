import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260413_000109 from './20260413_000109';
import * as migration_20260415_122816 from './20260415_122816';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260413_000109.up,
    down: migration_20260413_000109.down,
    name: '20260413_000109',
  },
  {
    up: migration_20260415_122816.up,
    down: migration_20260415_122816.down,
    name: '20260415_122816'
  },
];
