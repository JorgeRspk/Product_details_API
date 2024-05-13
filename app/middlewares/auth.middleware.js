const Usuario = require('../models/usuario.model');

async function authenticate(req, res, next) {
  try {
    // Obtener las credenciales de la solicitud
    const { correo, clave } = req.body;

    // Buscar el usuario en la base de datos por correo electrónico
    const usuario = await Usuario.findOne({ where: { correo } });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!usuario || usuario.clave !== clave) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    // Si la autenticación es exitosa, agregar el usuario a la solicitud para su uso posterior
    req.usuario = usuario;

    // Llamar a next() para continuar con el siguiente middleware o controlador de ruta
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  authenticate
};