exports.up = function (knex) {
  return knex.schema.createTable('register', function (table) {
    table.increments();

    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('tel').notNullable();
    table.string('cel').notNullable();
    table.string('birth_date').notNullable();
    table.string('cep').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('cpf', 11).unique().notNullable();
    table.decimal('value').notNullable();
    table.string('about').notNullable();
    table.string('reason').notNullable();

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('register');
};
