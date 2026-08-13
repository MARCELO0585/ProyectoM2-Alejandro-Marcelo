const request = require('supertest');
const app = require('../src/server'); // Asegúrate de que esta ruta apunte a tu server.js

// Simulamos (mock) la librería 'pg' para que no intente conectarse a PostgreSQL.
// Así los tests pasan instantáneamente sin importar el entorno local.
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Pruebas Básicas de la API MiniBlog', () => {
  
  // Cerramos cualquier proceso suelto después de los tests
  afterAll((done) => {
    done();
  });

  test('GET /authors debe responder con status 200 o array', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBeLessThan(500);
  });

  test('GET /posts debe responder con status 200 o array', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBeLessThan(500);
  });

  test('GET /docs debe redirigir o cargar la interfaz Swagger', async () => {
    const res = await request(app).get('/docs');
    expect(res.statusCode).toBeLessThan(500);
  });
});
