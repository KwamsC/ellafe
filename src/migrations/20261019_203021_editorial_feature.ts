import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_editorial_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`media_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_editorial_feature_order_idx\` ON \`pages_blocks_editorial_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_editorial_feature_parent_id_idx\` ON \`pages_blocks_editorial_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_editorial_feature_path_idx\` ON \`pages_blocks_editorial_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_editorial_feature_media_idx\` ON \`pages_blocks_editorial_feature\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_editorial_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`media_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_editorial_feature_order_idx\` ON \`_pages_v_blocks_editorial_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_editorial_feature_parent_id_idx\` ON \`_pages_v_blocks_editorial_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_editorial_feature_path_idx\` ON \`_pages_v_blocks_editorial_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_editorial_feature_media_idx\` ON \`_pages_v_blocks_editorial_feature\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_editorial_feature\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_editorial_feature\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`reset_password_requested_at\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
}
