# Backend - Cursos Virtual

Backend API para la plataforma de cursos virtuales, construido con Node.js, Express y MongoDB.

## 🚀 Despliegue en cualquier servidor

Este backend está diseñado para funcionar en cualquier servidor que soporte Node.js (Heroku, Railway, Render, Vercel, AWS, DigitalOcean, etc.).

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

- Copia `.env.example` a `.env`
- Configura tus valores:
  - `MONGODB_URI`: URL de MongoDB (usa MongoDB Atlas para producción)
  - `JWT_SECRET`: Secreto seguro para tokens JWT
  - `PORT`: Puerto (opcional, default 3000)

### 3. Ejecutar

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

## 🌐 Despliegue en plataformas específicas

### Heroku

1. Crea app en Heroku
2. Conecta tu repo Git
3. Configura variables de entorno en Settings > Config Vars
4. Despliega

### Railway

1. Conecta tu repo
2. Variables de entorno se configuran automáticamente desde .env
3. Despliega

### Render

1. Conecta repo
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Variables de entorno en Environment

### Vercel

1. Conecta repo
2. Build Command: vacío
3. Output Directory: vacío
4. Variables de entorno en Project Settings

## 📊 Base de datos

- Usa MongoDB Atlas para producción (gratuito hasta cierto límite)
- Para desarrollo local: instala MongoDB Community Server

## 🔐 Seguridad

- Cambia `JWT_SECRET` por un valor único y seguro
- No commits el archivo `.env` al repositorio
- Usa HTTPS en producción

## 📡 API Endpoints

- `POST /api/register` - Registro de usuarios
- `POST /api/login` - Login
- `GET /api/courses` - Lista cursos
- `POST /api/courses` - Crear curso
- Y más... (ver server.js para detalles)
