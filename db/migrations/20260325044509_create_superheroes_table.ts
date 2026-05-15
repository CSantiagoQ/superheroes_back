import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("superheroes", (table) => {
    table.increments("id").primary();
    table.string("nombre");
    table.string("poder");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("superheroes");
}