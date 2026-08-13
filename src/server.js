const express = require('express');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Redirigir la raíz a la documentación Swagger
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Configuración de Swagger UI
const file = fs.readFileSync(path.join(__dirname, '../openapi.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

if (process.env.PUBLIC_URL) {
  swaggerDocument.servers = [
    { url: process.env.PUBLIC_URL, description: 'Servidor de Producción' },
    { url: `http://localhost:${process.env.PORT || 3000}`, description: 'Servidor Local' }
  ];
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;
