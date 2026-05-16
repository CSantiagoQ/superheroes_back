# 🦸 Backend Superheroes API

Backend REST API desarrollada con Node.js, Express y TypeScript para la gestión de un catálogo de superhéroes y sistema de favoritos autenticado mediante JWT.

El proyecto implementa:
- autenticación de usuarios,
- protección de rutas,
- CRUD de superhéroes,
- gestión de favoritos,
- integración con PostgreSQL,
- arquitectura modular y tipada.

---

# 🚀 Tecnologías utilizadas

## Backend
- Node.js
- Express.js
- TypeScript

## Base de datos
- PostgreSQL
- Knex.js
- Objection.js

## Seguridad
- JWT (JSON Web Token)
- bcrypt

## Herramientas de desarrollo
- ESLint
- Prettier
- pnpm
- tsx

---

# 📁 Arquitectura del proyecto

```txt
db/
  migrations/
  seeds/
  database.ts

src/
  Controllers/
  Middleware/
  Models/
  routes/
  index.ts
```

---

# 🔐 Funcionalidades implementadas

## Autenticación JWT
- login seguro
- generación de tokens
- middleware de protección

## CRUD de superhéroes
- crear héroes
- actualizar héroes
- eliminar héroes
- listar catálogo

## Favoritos
- agregar favoritos
- eliminar favoritos
- listar favoritos del usuario autenticado

## Base de datos
- migraciones
- seeds
- tipado seguro con ORM

---

# ⚙️ Scripts disponibles

## Desarrollo
```bash
pnpm run dev
```

## Producción/local
```bash
pnpm start
```

## Ejecutar seeds
```bash
pnpm run seed
```

---

# 🛠️ Instalación

## 1. Clonar repositorio

```bash
git clone <repo-url>
```

---

## 2. Entrar al proyecto

```bash
cd backend_superheroes
```

---

## 3. Instalar dependencias

```bash
pnpm install
```

---

## 4. Configurar variables de entorno

Crear archivo `.env`

Ejemplo:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=my_secret
```

---

## 5. Ejecutar migraciones

```bash
pnpm knex migrate:latest
```

---

## 6. Ejecutar seeds

```bash
pnpm run seed
```

---

## 7. Iniciar servidor

Modo desarrollo:

```bash
pnpm run dev
```

Modo normal:

```bash
pnpm start
```

---

# 🧠 Características técnicas

- Arquitectura modular
- TypeScript estricto
- Middleware tipado
- ESLint configurado
- Prettier integrado
- Seguridad JWT
- ORM con Objection.js
- Query Builder con Knex

---

# 📌 Estado del proyecto

## Implementado
- autenticación
- CRUD backend
- favoritos
- PostgreSQL
- migraciones
- seeds
- linting/formato
- tipado estricto

## Pendiente
- frontend
- testing

---

# 👨‍💻 Proyecto académico

Proyecto desarrollado para la materia:

**Producción Digital 2D**

Enfoque del proyecto:
- buenas prácticas backend,
- arquitectura limpia,
- seguridad,
- tipado estricto,
- escalabilidad.
