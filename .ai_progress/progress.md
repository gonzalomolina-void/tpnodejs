# Progreso del Experimento de Aprendizaje: Node.js

## Estado Actual
- **Fase Activa**: Fase 3: Operaciones CRUD en Memoria (GET por ID, POST, PUT)
- **Última Actualización**: 2026-05-26T13:35:00-03:00

## Conceptos Validados y Entendidos
- [x] **Fase 0: Inicialización y pnpm**: Entendido el rol de un gestor de paquetes, cómo `pnpm` optimiza espacio usando almacenamiento direccionable por contenido y enlaces duros (hard links), su seguridad contra scripts post-instalación, y el propósito de `package.json` y la directiva `"type": "module"`.
- [x] **Fase 1: HTTP nativo**: Entendido el rol de `req` y `res`, la cabecera `Content-Type` (especialmente `application/json`), el uso de `res.end()` para finalizar la comunicación y la excepción `EADDRINUSE` cuando el puerto está ocupado.
- [x] **Fase 2: Servir Archivos Estáticos**: fs/promises, Event Loop, MIME types, path y url. (Conceptos validados y respuestas a preguntas de control correctas)
- [ ] **Fase 3: Operaciones CRUD en Memoria**: Routing manual, streams y chunks (body parsing), códigos de estado.
- [ ] **Fase 4: Validaciones y Conexión Frontend**: Validaciones y Fetch API en el DOM.
- [ ] **Fase 5: Copia de Archivos con Streams**: Node Streams (pipeline y contrapresión), process.argv y performance.

## Tareas Completadas
- [x] Inicialización del proyecto con `pnpm init` y `"type": "module"`.
- [x] Corrección de la versión de `pnpm` en `package.json` de rango a versión fija (`11.2.2`).
- [x] Implementación del servidor básico ([server.js](file:///C:/Work/Uncoma/PWA/tpnodejs/server.js)) con soporte para `/`, `/health` y `/api/characters`.
- [x] Configuración de la estructura de gitignore y reglas del agente de IA ([.cursorrules](file:///C:/Work/Uncoma/PWA/tpnodejs/.cursorrules) y `.ai_progress`).
- [x] Creación de la carpeta `public/` con `index.html`, `styles.css` y `app.js` y corrección de la ruta del stylesheet.
- [x] Refactorización de la lectura de archivos estáticos en [static.js](file:///C:/Work/Uncoma/PWA/tpnodejs/static.js) de forma no bloqueante usando streams (`stream.pipe(res)`).
- [x] Manejo de errores de streams en archivos estáticos controlando headers ya enviados (`res.headersSent`) para evitar caídas y devolver un `404` real.
- [x] Configuración correcta de tipos MIME en [mime-types.js](file:///C:/Work/Uncoma/PWA/tpnodejs/mime-types.js) (incluyendo `text/javascript` para `.js`) y agregado de `charset=utf-8` para tipos de texto.

## Próximos Pasos / Consigna Activa
1. Investigar cómo extraer el ID en una ruta dinámica sin usar librerías externas (ej: `GET /api/characters/:id`).
2. Investigar cómo recibir el body en peticiones `POST` o `PUT` usando streams (escuchando eventos `'data'` y `'end'` del objeto `req`).
3. Implementar las rutas `GET /api/characters/:id`, `POST /api/characters` y `PUT /api/characters/:id`.

## Ideas Futuras (Post-TP)
- [ ] **Crear un micro-framework estilo Express propio**: Una vez completado el práctico, refactorizar la lógica del servidor nativo para construir un framework personalizado desde cero (con ruteo dinámico, soporte para middlewares, y decoradores de `req` y `res`). ¡Con juegos de azar y mujerzuelas! (Referencia a Futurama).
