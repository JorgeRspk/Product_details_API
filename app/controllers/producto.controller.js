const knex = require('../config/database');

class ProductoController {
  static async getAllProductos(req, res) {
    try {
      const productos = await knex('producto').select('*');
      res.json({ productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createProducto(req, res) {
    try {
      const { cod_producto, nombre_producto, precio_actual, descripcion_producto, id_categoria, marca } = req.body;

      const nuevoProducto = { cod_producto, nombre_producto, precio_actual, descripcion_producto, id_categoria, marca };

      await knex('producto').insert(nuevoProducto);

      const productoCreado = await knex('producto').where({ cod_producto }).first();

      res.status(201).json({ producto: productoCreado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateProducto(req, res) {
    try {
      const { cod_producto } = req.params;
      const { nombre_producto, precio_actual, descripcion_producto, id_categoria, marca } = req.body;

      const productoActualizado = {};
      if (nombre_producto) productoActualizado.nombre_producto = nombre_producto;
      if (precio_actual) productoActualizado.precio_actual = precio_actual;
      if (descripcion_producto) productoActualizado.descripcion_producto = descripcion_producto;
      if (id_categoria) productoActualizado.id_categoria = id_categoria;
      if (marca) productoActualizado.marca = marca;

      await knex('producto').where({ cod_producto }).update(productoActualizado);

      const productoActualizadoDB = await knex('producto').where({ cod_producto }).first();

      res.json({ producto: productoActualizadoDB });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}



module.exports = ProductoController;