# Servidores - Node.js (Notas de Clase)

Esta es una guía teórica estructurada a partir del material introductorio sobre el desarrollo de servidores con Node.js y el diseño de APIs RESTful.

---

## 1. Introducción a Node.js

Node.js es un entorno de ejecución de JavaScript del lado del servidor.

* **Creación:** Creado en 2009 por Ryan Dahl.
* **Motor V8:** Utiliza el motor JavaScript V8 (el mismo que Google Chrome) para compilar y ejecutar código JS a alta velocidad.
* **Proceso Único (Single Process):** Se ejecuta en un único proceso del sistema operativo.
* **Hilo Único (Single Thread):** Utiliza un único hilo de ejecución para procesar el código JavaScript, pero es capaz de manejar múltiples peticiones concurrentes gracias a su modelo de I/O no bloqueante.
* **Paradigma No Bloqueante (Non-Blocking I/O):** Las operaciones de entrada/salida (lectura de archivos, base de datos, peticiones de red) se delegan al sistema operativo o a hilos secundarios de fondo, liberando el hilo principal para seguir procesando peticiones.
* **Ecosistema:** Cuenta con una gran comunidad y una inmensa variedad de librerías y frameworks (generalmente distribuidos vía npm/pnpm).

---

## 2. Diferencias clave: Node.js vs. Navegador (Browser)

| Característica | Navegador (Browser) | Node.js |
| :--- | :--- | :--- |
| **Objetos Globales** | Tiene acceso a `window`, `document`, DOM, etc. | No existen `window` ni `document`. Tiene globales como `global` y `process`. |
| **Entorno de Ejecución** | Desconocido (depende del navegador del usuario). | Totalmente controlado (sabés exactamente la versión de Node.js donde corre). |
| **Acceso al Sistema** | Muy limitado por razones de seguridad (sandbox). | Acceso total al sistema de archivos (`fs`), red, procesos, etc. |
| **Módulos** | Tradicionalmente scripts simples o ES Modules. | Soporta nativamente CommonJS (`require`) y ES Modules (`import`). |

---

## 3. Arquitectura de un Servidor en Node.js

### El Primer Servidor (Concepto)
En Node.js nativo, levantás un servidor HTTP asociando una función callback o **listener**. Esta función listener se va a ejecutar **por cada petición (request)** que llegue al servidor.

### Flujo de Request-Response con Múltiples Clientes
Dado que Node.js tiene un solo hilo para procesar el código de nuestra app, maneja el flujo de la siguiente manera:
1. **Cliente 1** envía `HTTP Request 1` ➔ El servidor recibe la petición y dispara el listener.
2. Si la petición requiere leer un archivo o consultar una base de datos (I/O), Node **delega** la tarea y queda libre para recibir la petición del **Cliente 2** (`HTTP Request 2`).
3. Cuando la tarea delegada finaliza, el callback correspondiente se encola en el **Event Loop**, se procesa y se envía la respuesta correspondiente (`HTTP Response 1`).

---

## 4. Anatomía de una Request en Node.js

Cuando se crea un servidor HTTP nativo con `http.createServer((req, res) => { ... })`, los parámetros representan:

* **`req` (`IncomingMessage`):** Es un stream legible que contiene toda la información de la petición entrante (método HTTP, headers, URL, y el cuerpo de la request en forma de stream de datos).
* **`res` (`ServerResponse`):** Es un stream escribible que permite configurar los headers, el código de estado HTTP y escribir el cuerpo de la respuesta que se enviará de vuelta al cliente.

---

## 5. Node.js Streams
Los streams son colecciones de datos (como arrays o buffers), con la diferencia de que no están disponibles todos juntos en memoria, sino que se procesan **pedazo a pedazo (chunk por chunk)**.

* **Eficiencia en memoria:** No necesitás cargar un archivo gigante de 2GB en la memoria RAM para enviarlo; podés leerlo en pequeños pedazos y transmitirlos inmediatamente al cliente.
* **Tipos de Streams:**
  * **Readable:** Streams desde los cuales se pueden leer datos (ej. `fs.createReadStream`, `req`).
  * **Writable:** Streams en los cuales se pueden escribir datos (ej. `fs.createWriteStream`, `res`).
  * **Duplex / Transform:** Streams que pueden leer y escribir, o modificar los datos a medida que pasan.

---

## 6. RESTful APIs

REST (Representational State Transfer) es un estilo arquitectónico para el diseño de servicios web basados en recursos.

### Principios Fundamentales:
* **Stateless (Sin estado):** Cada petición del cliente al servidor debe contener toda la información necesaria para comprenderla y procesarla. El servidor no almacena contexto de la sesión del cliente.
* **Formato de datos:** La información se intercambia en formatos estándar. **JSON** es el formato más utilizado actualmente.
* **Operaciones estándar sobre recursos (Métodos HTTP):**
  * `POST` ➔ Crear un nuevo recurso.
  * `GET` ➔ Leer/Obtener uno o varios recursos.
  * `PUT` ➔ Actualizar o reemplazar un recurso existente.
  * `DELETE` ➔ Eliminar un recurso.

### Ejemplos de endpoints REST:
* `GET /api/usuarios` ➔ Retorna la lista de todos los usuarios.
* `POST /api/usuarios` ➔ Crea un nuevo usuario.
* `GET /api/usuarios/1234` ➔ Retorna los detalles del usuario con ID `1234`.
* `PUT /api/usuarios/1234` ➔ Actualiza por completo al usuario con ID `1234`.
* `DELETE /api/usuarios/1234` ➔ Elimina al usuario con ID `1234`.

### Buenas Prácticas en REST:
1. **Usar sustantivos, no verbos:** Preferir `GET /api/usuarios` en lugar de `GET /api/obtenerUsuarios`.
2. **Anidar recursos dependientes:** Para obtener los comentarios de un artículo específico, usar `GET /api/articulos/1234/comentarios`.
3. **Retornar códigos de estado HTTP estandarizados:**
   * `200 OK` ➔ Petición exitosa.
   * `201 Created` ➔ Recurso creado con éxito (típico de POST).
   * `400 Bad Request` ➔ Petición inválida o faltan datos obligatorios.
   * `401 Unauthorized` ➔ Falta autenticación.
   * `403 Forbidden` ➔ Autenticado pero sin permisos para acceder al recurso.
   * `404 Not Found` ➔ El recurso solicitado no existe.
   * `500 Internal Server Error` ➔ Error inesperado en el servidor.
4. **Soportar filtros, ordenamiento y paginación por Query Params:**
   * Ejemplo: `GET /api/usuarios?edad=20&sort=nombre`

---

## Fuentes de Referencia
* [Documentación oficial de Node.js - Introducción](https://nodejs.org/learn/getting-started/introduction-to-nodejs)
* [Documentación oficial de Node.js - Streams API](https://nodejs.org/api/stream.html)
* [Guía de Streams en Node.js](https://nodejs.org/learn/modules/how-to-use-streams)
* [FreeCodeCamp - Todo sobre Streams](https://www.freecodecamp.org/espanol/news/node-js-streams-todo-lo-que-necesitas-saber/)
* [MDN / W3Schools - IncomingMessage](https://www.w3schools.com/nodejs/obj_http_incomingmessage.asp)
