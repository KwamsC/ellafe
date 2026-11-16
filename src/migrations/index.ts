import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260413_000109 from './20260413_000109';
import * as migration_20260415_122816 from './20260415_122816';
import * as migration_20261019_203021_editorial_feature from './20261019_203021_editorial_feature';
import * as migration_20261111_172417_ecommerce from './20261111_172417_ecommerce';
import * as migration_20261111_220317_eur from './20261111_220317_eur';
import * as migration_20261111_231344_three_item_grid_layout from './20261111_231344_three_item_grid_layout';
import * as migration_20261112_004200_three_item_grid_text from './20261112_004200_three_item_grid_text';
import * as migration_20261115_194156_benefits_strip from './20261115_194156_benefits_strip';

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
    name: '20260415_122816',
  },
  {
    up: migration_20261019_203021_editorial_feature.up,
    down: migration_20261019_203021_editorial_feature.down,
    name: '20261019_203021_editorial_feature',
  },
  {
    up: migration_20261111_172417_ecommerce.up,
    down: migration_20261111_172417_ecommerce.down,
    name: '20261111_172417_ecommerce',
  },
  {
    up: migration_20261111_220317_eur.up,
    down: migration_20261111_220317_eur.down,
    name: '20261111_220317_eur',
  },
  {
    up: migration_20261111_231344_three_item_grid_layout.up,
    down: migration_20261111_231344_three_item_grid_layout.down,
    name: '20261111_231344_three_item_grid_layout',
  },
  {
    up: migration_20261112_004200_three_item_grid_text.up,
    down: migration_20261112_004200_three_item_grid_text.down,
    name: '20261112_004200_three_item_grid_text',
  },
  {
    up: migration_20261115_194156_benefits_strip.up,
    down: migration_20261115_194156_benefits_strip.down,
    name: '20261115_194156_benefits_strip'
  },
];
