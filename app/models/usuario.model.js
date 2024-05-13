const knex = require('../config/database');

const Usuario = () => {
  return knex.schema.createTable('usuario', function (table) {
    table.string('id_usuario').primary();
    table.string('correo').notNullable();
    table.string('clave').notNullable();
    table.string('direccion');
    table.string('nombre').notNullable();
    table.string('apellido').notNullable();
    table.date('fecha_nacimiento').notNullable();
  });
};

module.exports = Usuario;