const knex = require("knex");

const db = knex(dbConfig);

async function testDatabaseConnection() {
  try {
    // Ejecutar una consulta simple para verificar la conexión
    const result = await db.raw("SELECT 1");

    // Imprimir el resultado
    console.log("Result:", result);

    // Si recibes un resultado, la conexión está funcionando correctamente
    console.log("Database connection is working fine.");
  } catch (error) {
    // Si ocurre algún error, mostrar un mensaje de error
    console.error("Error connecting to the database:", error);
  } finally {
    // Cerrar la conexión
    await db.destroy();
  }
}

// Exportar la función para que pueda ser importada desde otros archivos
module.exports = testDatabaseConnection;
