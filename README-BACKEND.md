# Cursos Virtual - Backend Setup

Este proyecto ahora incluye un backend para sincronización de datos entre dispositivos.

## Instalación y Configuración

### 1. Instalar MongoDB

- Descarga e instala MongoDB desde https://www.mongodb.com/
- O usa MongoDB Atlas (cloud) y actualiza la conexión en `backend/server.js`

### 2. Configurar el Backend

```bash
cd backend
npm install
npm start
```

El servidor correrá en http://localhost:3000

### 3. Configurar el Frontend

- Asegúrate de que `api.js` apunte al servidor correcto (por defecto localhost:3000)
- Para producción, cambia `API_BASE` en `api.js` a tu URL del servidor

### 4. Crear Profesores

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

### 5. Funcionamiento

- Los datos se sincronizan automáticamente con el servidor
- Si no hay conexión, usa localStorage como fallback
- Los profesores pueden gestionar cursos desde cualquier dispositivo conectado

### 6. Despliegue

- Despliega el backend en un servicio como Heroku, Railway o Vercel
- Actualiza `API_BASE` en `api.js`
- Para la app móvil, el APK seguirá funcionando con el servidor remoto
