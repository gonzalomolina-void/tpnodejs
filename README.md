# TP: Introducción a Node.js — Aprendizaje Activo con IA

Este repositorio contiene la resolución del Trabajo Práctico de **Programación Web Avanzada (Facultad de Informática - UNCo)**. El objetivo principal es construir una API REST y un servidor de archivos estáticos utilizando únicamente los módulos nativos de **Node.js** (sin Express ni librerías de terceros).

---

## 🧠 Filosofía del Proyecto: Aprendizaje Activo Guiado por IA

A diferencia del desarrollo tradicional donde se suele utilizar la Inteligencia Artificial como un simple generador de código automático (copiar y pegar), este proyecto se construyó bajo la premisa de **CONCEPTOS > CÓDIGO**. 

La IA actúa como un **mentor/tutor técnico** que:
1. Define el mapa de ruta y las fases de desarrollo.
2. Plantea temas de investigación teórica (MDN, Node docs, Google).
3. Exige una validación conceptual previa antes de escribir código.
4. Revisa las implementaciones del estudiante y propone mejoras de diseño y arquitectura.

El estudiante es quien realiza la investigación, toma las decisiones de diseño y escribe el código.

---

## 🛠️ Tecnologías y Herramientas

- **Entorno**: [Node.js](https://nodejs.org/) (módulos nativos como `http`, `fs/promises`, `path`, `url`, `stream`, etc.).
- **Módulos**: **ESM (ECMAScript Modules)** configurado mediante `"type": "module"` en el `package.json`.
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/) (instalación eficiente mediante *Content-addressable store* y *hard links*).

---

## 🤖 Integración Multi-Agente y Control de Progreso

Para que cualquier estudiante pueda clonar este repositorio y continuar el aprendizaje guiado por la IA de su preferencia (Cursor, Claude Code, GitHub Copilot, Aider, OpenCode, Gemini, etc.) sin perder el contexto de su avance, se configuró un sistema de persistencia agnóstico:

- **[AI.md](AI.md)**: Fuente canónica de instrucciones, comportamiento y rol del mentor para todas las IAs.
- **Punteros de IA**: Archivos como `AGENTS.md`, `.cursorrules`, `.claudeprompt`, `.aider.instructions.md` y `.github/copilot-instructions.md` redirigen a los agentes a leer el archivo de reglas central.
- **Carpeta `.ai_progress/`**: Contiene el archivo local `progress.md` que la IA lee al iniciar la sesión para recuperar el estado y actualiza al finalizar. Esta carpeta está en el `.gitignore` (excepto por el archivo `.gitkeep`), lo que permite que cada estudiante mantenga su progreso en su máquina local sin subirlo al repositorio compartido.

---

## 🧭 Protocolo de Arranque para cualquier IA

Si abrís este proyecto con Codex CLI, Cursor, Claude, Aider, GitHub Copilot u otra herramienta, el asistente debe arrancar leyendo estos archivos en orden:

1. `AI.md` — contrato pedagógico y reglas canónicas.
2. `.ai_progress/progress.md` — fase actual, conceptos validados y próximos pasos.
3. `docs/GuiaDeEstudio.md` — guía por fases para enseñar sin regalar la solución.
4. `docs/TPIntroduccionNodeJS2026.md` — consigna formal del trabajo práctico.
5. Código actual relevante, por ejemplo `server.js`.

Regla central: la IA actúa como mentor. Debe explicar, preguntar, orientar y revisar; no resolver el TP completo con código listo para copiar y pegar.

---

## 🌿 Estrategia de Ramas (Git Branching)

Este repositorio se utiliza únicamente con fines de aprendizaje y seguimiento formativo. Por lo tanto, se ha establecido la siguiente política para el trabajo con Git:

1. **Nomenclatura de Ramas**: Al crear una rama para trabajar en alguna de las fases, se debe utilizar estrictamente el siguiente formato:
   ```bash
   feature/NombreDePersona/LoQueQuieresConstruir
   ```
   *Ejemplo*: `feature/Gonzalo/servidor-http-basico` o `feature/Juan/servir-archivos-estaticos`.

2. **Sin Integraciones (No Merges)**: Dado que el objetivo del proyecto es puramente pedagógico, **no se realizarán fusiones (merges) a la rama principal (`main`)**. Cada rama quedará como un registro histórico del hito o fase de desarrollo alcanzada de manera individual.

---

## 📂 Estructura del Proyecto

```text
tpnodejs/
 ├── .ai_progress/       # Progreso del estudiante (ignorado por Git, local)
 ├── .github/            # Configuraciones para GitHub Copilot
 ├── docs/               # Enunciados, guías de estudio y material teórico
 ├── public/             # Archivos estáticos (HTML, CSS, JS del Frontend) [Fase 2]
 ├── scripts/            # Scripts auxiliares (copia con Streams) [Fase 5]
 ├── AI.md               # Instrucciones globales para los asistentes de IA
 ├── server.js           # Código del servidor HTTP nativo [A ser creado en Fase 1]
 ├── package.json        # Configuración del proyecto y dependencias de desarrollo
 └── README.md           # Este archivo
```

---

## 🚀 Cómo correr el proyecto

1. Clonar el repositorio.
2. Asegurarse de tener instalado `pnpm`.
3. Crear e implementar el archivo `server.js` (siguiendo las consignas de la **Fase 1**).
4. Ejecutar el servidor:
   ```bash
   node server.js
   ```
5. Abrir en el navegador:
   - `http://localhost:3000/health` (Para verificar el estado)
   - `http://localhost:3000/api/characters` (Para interactuar con la API)
