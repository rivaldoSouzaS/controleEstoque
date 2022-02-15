/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('itens', table =>{
        table.increments('id').primary()
        table.string('desc').notNull()
        table.string('uni').notNull()
        table.integer('quant').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('itens')
};
