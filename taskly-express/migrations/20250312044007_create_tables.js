/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('office', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
      })
      .then(() => {
        return knex.schema.createTable('user', function(table) {
          table.increments('id').primary();
          table.string('email').notNullable().unique();
          table.string('password').notNullable();
          table.string('rol').notNullable();
          table.integer('office_id').notNullable()
            .references('id').inTable('office')
            .onDelete('CASCADE') // Si se borra una oficina, se eliminan los usuarios asociados
            .onUpdate('CASCADE'); // Si cambia el ID, se actualiza en usuarios
        });
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('user')
      .then(() => knex.schema.dropTableIfExists('office'));
  };
  