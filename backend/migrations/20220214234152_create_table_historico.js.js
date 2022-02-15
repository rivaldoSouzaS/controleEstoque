/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('historico', table =>{
        table.increments('id').primary()
        table.string('nomeFunc').notNull()
        table.string('descItem', 1000).notNull()
        table.string('operacao', 1000)
        table.integer('quantItens').notNull()
        table.timestamp('dataOperacao')
        table.integer('itemId').references('id')
          .inTable('itens').notNull()
        table.integer('funcId').references('id')
          .inTable('funcionarios').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('historico')
};
