const knex = require('../config/database');

const Producto = () => {
  return knex.schema.createTable('producto', function (table) {
    table.increments('id_usuario').primary();
    table.string('correo').notNullable();
    table.string('clave').notNullable();
    table.string('direccion');
    table.string('nombre').notNullable();
    table.string('apellido').notNullable();
    table.date('fecha_nacimiento').notNullable();
  });
};

module.exports = Usuario;