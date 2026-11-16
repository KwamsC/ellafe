import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

const tables = ['pages_blocks_three_item_grid', '_pages_v_blocks_three_item_grid'] as const

function plainTextToLexical(value: string): string {
  const lines = value.split(/\r?\n/)
  const paragraphs = lines.some((line) => line.trim().length > 0)
    ? lines.filter((line) => line.trim().length > 0)
    : ['']

  return JSON.stringify({
    root: {
      type: 'root',
      children: paragraphs.map((line) => ({
        type: 'paragraph',
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: line,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  })
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of tables) {
    const rows = await db.all<{ id: string; text: string }>(
      sql.raw(
        `SELECT \`id\`, \`text\` FROM \`${table}\` WHERE \`text\` IS NOT NULL AND json_valid(\`text\`) = 0`,
      ),
    )

    for (const row of rows) {
      const id = String(row.id)
      const text = typeof row.text === 'string' ? row.text : String(row.text ?? '')
      const lexical = plainTextToLexical(text)

      if (table === 'pages_blocks_three_item_grid') {
        await db.run(
          sql`UPDATE \`pages_blocks_three_item_grid\` SET \`text\` = ${lexical} WHERE \`id\` = ${id}`,
        )
      } else {
        await db.run(
          sql`UPDATE \`_pages_v_blocks_three_item_grid\` SET \`text\` = ${lexical} WHERE \`id\` = ${id}`,
        )
      }
    }
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // The original plain text is now rich text. Leaving that JSON in place is safe.
}
