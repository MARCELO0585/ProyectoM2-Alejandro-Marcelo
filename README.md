# API MiniBlog

API REST construida con Node.js, Express y PostgreSQL para gestionar autores y publicaciones del proyecto integrador del Módulo 2.

**URL en producción:**  
[https://proyectom2alejandropuentesmarcelo-production.up.railway.app]

**Swagger UI:**  
[https://proyectom2alejandropuentesmarcelo-production.up.railway.app/docs/]

---

## 🔗 Descripción del proyecto

MiniBlog es una API para administrar dos recursos relacionados entre sí:

* `authors`: autores del contenido.
* `posts`: publicaciones creadas por cada autor.

La relación es de uno a muchos: un autor puede tener varios posts.

El proyecto incluye:
* CRUD completo de autores.
* CRUD completo de publicaciones.
* Consulta de publicaciones por autor.
* Validaciones de entrada.
* Manejo centralizado de errores.
* Seed de datos para desarrollo local y despliegue.
* Documentación interactiva con OpenAPI + Swagger UI.

---

## 🔗 Stack técnico

* Node.js + Express
* PostgreSQL + `pg`
* dotenv
* Supertest
* OpenAPI 3.0.3 + Swagger UI
* Railway para deploy y base remota

---

## 🔗 Requisitos previos

* Node.js 18 o superior
* npm
* PostgreSQL local si querés correr el proyecto fuera de Railway

---

## 🔗 Instalación y ejecución local

### 1. Clonar el repositorio
```bash
git clone https://github.com/MARCELO0585/PROYECTOM2_ALEJANDROPUENTESMARCELO
cd PROYECTOM2_ALEJANDROPUENTESMARCELO
2. Instalar dependencias
npm install
3. Configurar variables de entorno
Copiá .env.example a .env y completá tus valores.
cp .env.example .env
4. Crear tablas y datos iniciales
Si la base está vacía, ejecutá los scripts SQL contra PostgreSQL local:
psql -U postgres -d miniblog -f setup.sql
psql -U postgres -d miniblog -f seed.sql
5. Levantar el servidor
npm start
La API queda disponible en http://localhost:3000.

🔗 Cómo probar la API
Swagger UI
Local: http://localhost:3000/docs/

Producción: https://proyectom2alejandropuentesmarcelo-production.up.railway.app/docs/

Endpoints principales:
GET /authors
GET /authors/:id
POST /authors
PUT /authors/:id
DELETE /authors/:id
GET /posts
GET /posts/:id
GET /posts/author/:authorId
POST /posts
PUT /posts/:id
DELETE /posts/:id

🔗 Estructura del proyecto
PROYECTOM2_ALEJANDROPUENTESMARCELO
├── index.js
├── openapi.yaml
├── package.json
├── README.md
├── setup.sql
├── seed.sql
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db_conect.js
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   └── posts.controller.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateInput.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   └── services/
│       ├── authors.service.js
│       └── posts.service.js
└── test/
    └── app.test.js

    🔗 Base de datos
Tablas
Autores
id

name

email

bio

created_at

Publicaciones
id

title

content

author_id

published

created_at

Relaciones
Un autor puede tener muchas publicaciones.

posts.author_id referencia authors.id.

🔗 Librerías instaladas
express: crea el servidor HTTP, define rutas y responde a las peticiones.

pg: conecta la aplicación con PostgreSQL y ejecuta consultas SQL.

dotenv: carga las variables de entorno desde el archivo .env.

swagger-ui-express: muestra la documentación OpenAPI en el navegador.

yaml: lee y convierte el archivo openapi.yaml a un formato que Swagger pueda usar.

supertest: permite probar los endpoints automáticamente sin abrir Postman.

🔗 Qué se ignora en .gitignore
El archivo .gitignore evita subir archivos generados, locales o sensibles al repositorio.

node_modules/: no se sube porque contiene dependencias instaladas por npm y puede regenerarse con npm install.

.env: no se sube porque puede contener credenciales y datos sensibles como DATABASE_URL o claves privadas.

coverage/: no se sube porque es un resultado generado por pruebas y puede volver a crearse cuando se ejecute la suite.

dist/ y build/: no se suben porque suelen ser carpetas de salida generadas por un proceso de compilación o despliegue.

.DS_Store: no se sube porque es un archivo oculto de macOS que no aporta valor al proyecto.

package-lock.json: en este proyecto quedó excluido por configuración actual; normalmente se usa para fijar versiones, pero si el repositorio ya está organizado así se respeta esa decisión.

La idea de mantener esos elementos fuera del repositorio es evitar ruido, reducir peso y no exponer información privada.

🔗 Variables de entorno
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/miniblog
PUBLIC_URL=[https://proyectom2alejandropuentesmarcelo-production.up.railway.app](https://proyectom2alejandropuentesmarcelo-production.up.railway.app)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_MAX_CONNECT=10
DB_IDLETIMEOUT=30000
DB_CONNECTIONTIMEOUT=2000

🔗 Entornos de uso
Local
API: http://localhost:3000
Swagger UI: http://localhost:3000/docs/
Producción en Railway
API: https://proyectom2alejandropuentesmarcelo-production.up.railway.app
Swagger UI: https://proyectom2alejandropuentesmarcelo-production.up.railway.app/docs/


🔗 Deployment en Railway
Railway usa DATABASE_URL para conectar la API con PostgreSQL y PUBLIC_URL para mostrar la URL correcta dentro de Swagger UI.
Si la base remota está vacía, la aplicación ejecuta automáticamente setup.sql y seed.sql al iniciar.

🔗 Registro de uso de IA
Esta sección resume de forma honesta cómo usé IA durante el desarrollo. La IA me ayudó a avanzar más rápido en estructura y documentación, pero cada cambio importante lo probé manualmente antes de dejarlo definitivo.
Qué tipo de ayuda me dio la IA_
Ordenar la arquitectura inicial (rutas, controladores, servicios, middlewares).
Proponer borradores para el schema SQL de authors y posts.
Sugerir estructura de validaciones y respuestas HTTP.
Apoyar en debugging cuando Railway devolvía errores 500.

Ejemplos reales de prompts que utilicé
1) Estructura del backend (chat)
Prompt que usé:
Estoy armando el PI de MiniBlog con Node.js y Express. Quiero una estructura simple y profesional. ¿Cómo me recomiendas organizar carpetas y archivos?
Qué tomé de esa respuesta: Definir claramente routes, controllers y services desde el inicio.

2) Base de datos y relación authors-posts (agent)
Prompt que usé:
Ayúdame a construir setup.sql para gestionar autores y publicaciones. Necesito email único en authors, FK en posts y cascada.

Qué tomé de esa respuesta: El esqueleto del schema y las constraints principales. Luego ajusté columnas y probé queries manuales.

3) Conexión local + Railway (agent)
Prompt que usé:
Mi app funciona local con DB_HOST y DB_USER pero en Railway tengo DATABASE_URL. Quiero que el pool use DATABASE_URL si existe, si no las variables locales.
Qué tomé de esa respuesta: La lógica dinámica en el cliente Pool de pg.

4) Validaciones de endpoints (chat)
Prompt que usé:
Quiero validar authors y posts sin librerías complejas. Para authors: name obligatorio y email válido. Para posts: title, content y author_id obligatorios. ¿Cuál sería una forma limpia de hacerlo?
Qué tomé de esa respuesta: El enfoque de middlewares separados para validaciones por recurso.

5) Swagger con server correcto según entorno (agent)
Prompt que usé:
En local quiero que Swagger muestre http://localhost:3000 y en Railway quiero que muestre mi URL de producción. ¿Cómo dejo esa configuración automática?
Qué tomé de esa respuesta: Configurar una URL base dinámica usando variables de entorno (PUBLIC_URL / PORT).

6) Debugging en producción (chat)
Prompt que usé:
En Railway me respondía 500 con 'relation "authors" does not exist'. ¿Qué revisar primero para saber si la base remota tiene las tablas?
Qué tomé de esa respuesta: Validar ordenadamente: conexión, existencia de tablas y carga de seed antes de seguir depurando.

Qué hice manualmente sí o sí
Probar endpoints uno por uno en local y en Railway.
Ajustar mensajes de error para que fueran claros.
Corregir detalles de rutas y status codes.
Verificar que los tests pasaran completos.
Revisar que README y OpenAPI coincidieran con el comportamiento real de la API.

Cierre
La IA en este proyecto fue una herramienta de apoyo, no un reemplazo del desarrollo. Me ayudó a acelerar partes repetitivas, pero la integración final, la validación funcional y el deploy se resolvieron con pruebas manuales y revisión directa del código.

Proyecto desarrollado con dedicación por Ana Maria Rodriguez Montoya.