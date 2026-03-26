# Cursos Virtual - Backend Setup

Este proyecto ahora incluye un backend para sincronización de datos entre dispositivos.

## Requisitos Previos

### Instalar Node.js

1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo las instrucciones
4. Verifica con `node -v` y `npm -v` en la terminal

### Instalar MongoDB

1. Ve a https://www.mongodb.com/
2. Descarga MongoDB Community Server
3. Instala y configura
4. O usa MongoDB Atlas (cloud) gratis

## Instalación y Configuración

### 1. Configurar el Backend

```bash
cd backend
npm install
npm start
```

El servidor correrá en http://localhost:3000

### 2. Configurar el Frontend

- Asegúrate de que `api.js` apunte al servidor correcto (por defecto localhost:3000)
- Para producción, cambia `API_BASE` en `api.js` a tu URL del servidor

### 3. Crear Profesores

Los profesores deben ser creados manualmente en la base de datos o vía API directa.

Ejemplo para crear un profesor:

```javascript
// En la consola del navegador o Postman
fetch("http://localhost:3000/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: "Profesor Ejemplo",
    email: "profesor@example.com",
    password: "password123",
    role: "profesor",
  }),
});
```

### 4. Funcionamiento

- Los datos se sincronizan automáticamente con el servidor
- Si no hay conexión, usa localStorage como fallback
- Los profesores pueden gestionar cursos desde cualquier dispositivo conectado

### 5. Despliegue

- Despliega el backend en un servicio como Heroku, Railway o Vercel
- Actualiza `API_BASE` en `api.js`
- Para la app móvil, el APK seguirá funcionando con el servidor remoto
