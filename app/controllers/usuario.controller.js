const knex = require('../config/database');
const bcrypt = require('bcrypt');

class UsuarioController {
  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await knex('usuario').select('*');
      res.json({ usuarios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createUsuario(req, res) {
    try {
      const { id, nombre, correo, clave, direccion, apellido, fecha_nacimiento } = req.body;

      // Encriptar la contraseña antes de almacenarla en la base de datos
      const hashedClave = await bcrypt.hash(clave, 10); // El segundo argumento es el número de rondas de hashing

      const nuevoUsuario = { id, nombre, correo, clave: hashedClave, direccion, apellido, fecha_nacimiento };

      // Insertar el nuevo usuario con el id proporcionado
      await knex('usuario').insert(nuevoUsuario);

      // Recuperar el usuario recién insertado
      const usuarioCreado = await knex('usuario').where({ id }).first();

      res.status(201).json({ usuario: usuarioCreado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nombre, correo, direccion, apellido, fecha_nacimiento } = req.body;

      // Construir el objeto con los campos a actualizar
      const usuarioActualizado = {};
      if (nombre) usuarioActualizado.nombre = nombre;
      if (correo) usuarioActualizado.correo = correo;
      if (direccion) usuarioActualizado.direccion = direccion;
      if (apellido) usuarioActualizado.apellido = apellido;
      if (fecha_nacimiento) usuarioActualizado.fecha_nacimiento = fecha_nacimiento;

      // Actualizar el usuario en la base de datos
      await knex('usuario').where({ id }).update(usuarioActualizado);

      // Recuperar el usuario actualizado
      const usuarioActualizadoDB = await knex('usuario').where({ id }).first();

      res.json({ usuario: usuarioActualizadoDB });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateClaveUsuario(req, res) {
    try {
      const { id } = req.params;
      const { clave } = req.body;

      // Encriptar la nueva contraseña
      const hashedClave = await bcrypt.hash(clave, 10);

      // Actualizar la contraseña del usuario en la base de datos
      await knex('usuario').where({ id }).update({ clave: hashedClave });

      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UsuarioController;