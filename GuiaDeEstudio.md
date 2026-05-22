# Guía de Estudio y Desarrollo: Introducción a Node.js

Bienvenido al plan de desarrollo guiado. Esta guía no te va a regalar código. Te va a dar las pautas, los conceptos clave y las consignas de investigación que tenés que resolver por tu cuenta en Google, MDN o la documentación oficial de Node.js antes de escribir una sola línea de código. 

El objetivo es que **vos** construyas la aplicación entendiendo cada decisión de diseño y cada flujo de datos.

---

## Filosofía de Trabajo
1. **CONCEPTOS > CÓDIGO**: Si no podés explicar qué hace una línea de código, no la escribas.
2. **LA IA ES UN COPILOTO**: Yo te guío con las preguntas y el diseño, vos buscás las respuestas y programás.
3. **SIN ATAJOS**: La inmediatez es enemiga del aprendizaje real.

---

## Fase 0: Inicialización del Proyecto y Conceptos Básicos (pnpm)

Antes de programar, tenemos que preparar el entorno. Vamos a usar **pnpm** (Performant npm), un gestor de paquetes moderno y eficiente.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Qué es un gestor de paquetes y por qué existe `pnpm` como alternativa a `npm` o `yarn`? (Buscá: *"diferencias entre npm, yarn y pnpm"*).
* ¿Qué es el almacenamiento direccionable por contenido (Content-addressable store) de pnpm y cómo ahorra espacio en disco?
* ¿Qué es el archivo `package.json` y qué rol cumple en un proyecto de Node.js?

### 🛠️ Pauta de Trabajo:
1. Abrí la terminal en la raíz del proyecto.
2. Inicializá el proyecto usando `pnpm`. (Buscá la documentación de `pnpm init`).
3. Inspeccioná el archivo `package.json` generado.

---

## Fase 1: Creación del Servidor HTTP Básico

El objetivo es levantar un servidor en el puerto 3000 usando el módulo nativo `http`.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Cómo funciona el módulo nativo `http` de Node.js? (Buscá: *"Node.js http.createServer"*).
* ¿Qué son los parámetros `req` (IncomingMessage) y `res` (ServerResponse)?
* ¿Qué es un puerto de red y por qué el puerto 3000 es de uso común en desarrollo?
* ¿Cómo se envían headers HTTP en una respuesta nativa de Node.js?

### 🛠️ Pauta de Trabajo:
1. Creá el archivo `server.js`.
2. Importá el módulo nativo `http`.
3. Creá el servidor de manera que, si la ruta (`req.url`) es `/health`, responda con un JSON: `{"status": "ok"}` y el código de estado HTTP correcto.
4. Si la ruta es `/api/characters` y el método es `GET`, respondé con un arreglo en memoria vacío en formato JSON.
5. Levantá el servidor para que escuche en el puerto 3000.

### ❓ Preguntas de Autoevaluación:
* ¿Qué pasa si intentás levantar el servidor en un puerto que ya está siendo usado por otra aplicación?
* ¿Por qué es necesario llamar a `res.end()` al finalizar una respuesta?

---

## Fase 2: Servir Archivos Estáticos (La carpeta `public`)

Acá vas a simular lo que hace Express con su middleware estático, pero a mano.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Cómo lee archivos Node.js de forma asincrónica usando el módulo `fs/promises` o `fs`? (Buscá: *"fs.readFile nodejs"*).
* ¿Por qué no debemos usar métodos sincrónicos como `fs.readFileSync` en un servidor de producción? (Investigá sobre el *Event Loop de Node.js y el bloqueo de I/O*).
* ¿Qué es un MIME Type (Content-Type) y por qué el navegador lo necesita?
* ¿Cómo se usan los módulos nativos `path` y `url` para resolver rutas de archivos de forma segura e independiente del sistema operativo?

### 🛠️ Pauta de Trabajo:
1. Creá la carpeta `public` con `index.html`, `styles.css` y `app.js`.
2. En `server.js`, cuando la petición no sea de la API (por ejemplo, `/`, `/styles.css`, `/app.js`), determiná la ruta física del archivo dentro de `public`.
3. Leé el archivo usando `fs` y envialo en la respuesta con su `Content-Type` correspondiente.
4. Manejá el error: si el archivo no existe, respondé con un código 404 y un mensaje claro.

### ❓ Preguntas de Autoevaluación:
* ¿Qué pasa si un usuario malicioso intenta acceder a un archivo fuera de la carpeta `public` usando rutas relativas como `GET /../server.js`? ¿Cómo evitarías esto?

---

## Fase 3: Operaciones CRUD en Memoria (GET por ID, POST, PUT)

Vas a implementar las rutas para interactuar con la entidad **Character** en memoria.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Cómo se extrae el ID de una ruta dinámica (ej. `/api/characters/1`) sin usar Express? (Buscá: *"routing simple sin express nodejs"* o *"parsear url en nodejs"*).
* ¿Cómo se reciben y agrupan los pedazos de datos (chunks) de una petición `POST` o `PUT` usando streams? (Buscá: *"read post body nodejs http server"*).
* ¿Por qué el cuerpo de la request viene como un Stream y no como una variable directa?
* ¿Qué diferencia hay entre los códigos de estado HTTP 200, 201, 400 y 404?

### 🛠️ Pauta de Trabajo:
1. Creá un array en memoria con personajes iniciales.
2. Implementá el `GET /api/characters/:id`. Tenés que procesar `req.url` para extraer el ID.
3. Implementá el `POST /api/characters`. Tenés que escuchar los eventos `'data'` y `'end'` del objeto `req` para armar el body, parsearlo como JSON, asignarle un ID incremental o un UUID, y guardarlo.
4. Implementá el `PUT /api/characters/:id`. Modificá el elemento correspondiente en el array.

### ❓ Preguntas de Autoevaluación:
* Si el cliente envía un JSON gigante o malformado en el `POST`, ¿qué le pasa a tu servidor? ¿Cómo lo protegerías?

---

## Fase 4: Validaciones y Conexión Frontend

Es hora de blindar el backend y conectar tu página web.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Cómo validar tipos de datos en JavaScript (ej. que `level` sea un número)?
* ¿Cómo funciona `fetch` en el navegador para hacer peticiones asincrónicas a una API? (Buscá: *"fetch post json javascript"*).
* ¿Qué es la manipulación del DOM y cómo renderizar elementos dinámicamente en HTML a partir de un array de objetos obtenido por `fetch`?

### 🛠️ Pauta de Trabajo:
1. En el handler del `POST`, validá que estén todos los campos obligatorios y que `level` sea de tipo numérico. Si falla, devolvé status 400.
2. En `public/app.js`, realizá un `fetch` a `/api/characters` cuando cargue la página y pintá los personajes en el HTML.

---

## Fase 5: Copia de Archivos con Streams

Para entender realmente cómo maneja Node.js grandes volúmenes de datos sin reventar la memoria RAM.

### 📚 Conceptos a investigar en Google / Docs:
* ¿Qué es un Stream en Node.js y en qué se diferencia de leer un archivo completo en memoria con `fs.readFile`?
* ¿Qué es la contrapresión (backpressure) en streams?
* ¿Cómo funciona `stream.pipeline` o el método `.pipe()`?
* ¿Cómo se leen los argumentos de la línea de comandos en Node.js usando `process.argv`?
* ¿Cómo usar `perf_hooks` o `console.time()` para medir el tiempo exacto de ejecución?

### 🛠️ Pauta de Trabajo:
1. Creá el script en `scripts/copy-file.js`.
2. Obtené los argumentos de origen y destino desde `process.argv`.
3. Usá `fs.createReadStream` y `fs.createWriteStream` para copiar el archivo de forma eficiente.
4. Agregá control de errores (ej. si el archivo origen no existe) y medí el tiempo que tarda la copia.

---

## Paso Inmediato para Vos (El Estudiante):
1. **Investigá la Fase 0**. Buscá las respuestas a las preguntas de esa sección en internet.
2. Cuando estés listo, ejecutá `pnpm init` en tu terminal para crear el proyecto.
3. Respondeme explicando con tus palabras las respuestas de la Fase 0 y confirmame que ya tenés el `package.json` creado. ¡Ahí te daré las pautas para avanzar a la Fase 1!
