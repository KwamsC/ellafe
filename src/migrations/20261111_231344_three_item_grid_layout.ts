import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_three_item_grid\` ADD \`text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_three_item_grid\` ADD \`layout\` text DEFAULT 'featuredLeft';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_three_item_grid\` ADD \`text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_three_item_grid\` ADD \`layout\` text DEFAULT 'featuredLeft';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_three_item_grid\` DROP COLUMN \`text\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_three_item_grid\` DROP COLUMN \`layout\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_three_item_grid\` DROP COLUMN \`text\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_three_item_grid\` DROP COLUMN \`layout\`;`)
}
