# API REST - Gestión de Usuarios

API REST para gestión de usuarios con autenticación JWT, más un frontend React para consumirla. Construido con **Clean Architecture** en el backend y **Screaming Architecture** en el frontend.

### Funcionalidades

- Registro de usuarios con password hasheado (bcrypt)
- Autenticación mediante JWT
- Perfil de usuario (ver y editar)
- Panel de administración (listar usuarios)
- Validaciones con Zod
- Manejo de errores con códigos HTTP apropiados
- Documentación Swagger interactiva

---

## 🛠 Stack Tecnológico

| Capa              | Tecnología                            |
| ----------------- | ------------------------------------- |
| **Backend**       | Node.js, Express.js, TypeScript       |
| **Frontend**      | React 19, TypeScript, TanStack Router |
| **Base de Datos** | PostgreSQL, Prisma ORM                |
| **Autenticación** | JWT, bcryptjs                         |
| **Validación**    | Zod                                   |
| **Estilos**       | Tailwind CSS 4                        |
| **Runtime**       | NodeJS                                |

---

## 🚀 Instalación Rápida

### Prerrequisitos

- **Node.js** >= 16.x (`https://nodejs.org/en/download/`)
- **PostgreSQL** >= 14 (local o Docker)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd api-rest-examen

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env.local
# Editar backend/.env.local con tus datos de PostgreSQL

# 3. Instalar dependencias
npm install

# 4. Crear la base de datos (ver documentación detallada en docs/setup.md)
# Opción rápida con Docker:
docker run -d --name postgres-examen -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=api_rest_examen -p 5432:5432 postgres:16-alpine

# 5. Configurar DATABASE_URL en backend/.env.local
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_rest_examen"

# 6. Inicializar base de datos con Prisma
npm run db:generate
npm run db:push
npm run db:seed

# 7. Ejecutar
npm run dev
```

El backend se ejecutará en `http://localhost:3000` y el frontend en `http://localhost:5173`.

---

## 📡 Endpoints de la API

| Método | Ruta                 | Auth | Admin | Descripción       |
| ------ | -------------------- | ---- | ----- | ----------------- |
| POST   | `/api/auth/register` | ❌   | ❌    | Registrar usuario |
| POST   | `/api/auth/login`    | ❌   | ❌    | Iniciar sesión    |
| GET    | `/api/users/me`      | ✅   | ❌    | Obtener perfil    |
| PUT    | `/api/users/me`      | ✅   | ❌    | Actualizar perfil |
| GET    | `/api/users`         | ✅   | ✅    | Listar usuarios   |
| GET    | `/health`            | ❌   | ❌    | Health check      |
| GET    | `/api-docs`          | ❌   | ❌    | Swagger UI        |

### Ejemplos Rápidos

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","password":"12345678"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123456"}'

# Obtener perfil (reemplazar <token>)
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <token>"
```

---

## 🧪 Tests

```bash
# Ejecutar todos los tests
npm test

# Tests del backend
npm -w backend test

# Tests del frontend
npm -w frontend test
```

---

## 🏗 Arquitectura

### Backend: Clean Architecture

Separación en capas con dependencias hacia adentro:

- `domain/` — Reglas de negocio (sin dependencias externas)
- `application/` — Casos de uso y puertos
- `infrastructure/` — Adaptadores (Express, Prisma, JWT)

### Frontend: Screaming Architecture

Organización por funcionalidades (features):

- `features/auth/` — Todo sobre autenticación
- `features/users/` — Todo sobre usuarios
- `features/admin/` — Panel de administración
