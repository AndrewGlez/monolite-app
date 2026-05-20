# Decisiones Técnicas

## ¿Por qué esas librerías?

**Prisma** sobre SQL directo: tipos generados, migraciones automáticas, 0 riesgo de SQL injection.

**Zod** sobre express-validator: `z.infer` evita duplicar tipos. Coerción de query params (`z.coerce`) sin lógica extra.

**TanStack Router** sobre React Router: rutas type-safe. Si una ruta no existe, TypeScript te frena.

**Clean Architecture**: Express no toca la lógica de negocio. Cambiar DB no rompe nada.

## ¿Qué desafíos hubo?

**Express 5 no deja setear `req.query`**: guardo datos validados en `req.validated`.

**Devtools en producción**: Vite `define({ __DEV__ })` + lazy import, elimina el código en prod.

**Seed sin adapter de Prisma**: el seed usaba `new PrismaClient()` sin nada. Le pasé el adapter `PrismaPg`.

**Paginación**: DTO `FindAllOptions` de entrada, `PaginatedResult<T>` de salida.

## ¿Qué falta?

Tests de integración con supertest. Rate limiting en login. Refresh tokens.

## ¿Cómo escalar?

Backend stateless con JWT → se replica horizontal sin sticky sessions. Frontend como estáticos en CDN. Read replicas para DB. Redis para caché.
