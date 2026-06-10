import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cart_items', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('superheroe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('catsuperheroe')
      .onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable().defaultTo(1);
    table.primary(['user_id', 'superheroe_id']);
  });

  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .enu('status', ['en_camino', 'entregado'])
      .notNullable()
      .defaultTo('en_camino');
    table.decimal('total', 10, 2).notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table
      .integer('order_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .integer('superheroe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('catsuperheroe')
      .onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable();
    table.decimal('precio', 10, 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('cart_items');
}
