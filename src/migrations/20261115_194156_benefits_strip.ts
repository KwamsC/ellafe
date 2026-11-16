import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_strip_order_idx\` ON \`pages_blocks_benefits_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_strip_parent_id_idx\` ON \`pages_blocks_benefits_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_strip_path_idx\` ON \`pages_blocks_benefits_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_strip_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'shield',
  	\`heading\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_benefits_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_strip_benefits_order_idx\` ON \`pages_blocks_benefits_strip_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_strip_benefits_parent_id_idx\` ON \`pages_blocks_benefits_strip_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_benefits_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_benefits_strip_order_idx\` ON \`_pages_v_blocks_benefits_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_benefits_strip_parent_id_idx\` ON \`_pages_v_blocks_benefits_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_benefits_strip_path_idx\` ON \`_pages_v_blocks_benefits_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_benefits_strip_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'shield',
  	\`heading\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_benefits_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_benefits_strip_benefits_order_idx\` ON \`_pages_v_blocks_benefits_strip_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_benefits_strip_benefits_parent_id_idx\` ON \`_pages_v_blocks_benefits_strip_benefits\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_strip_benefits\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_strip\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_benefits_strip_benefits\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_benefits_strip\`;`)
}
