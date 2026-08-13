require('dotenv').config();
const app = require('./src/server');

const PORT = process.env.PORT || 3000;

// Agregamos '0.0.0.0' para que Railway pueda conectarse al servidor sin problemas
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Swagger UI disponible en tu URL publica o en http://localhost:${PORT}/docs`);
});
