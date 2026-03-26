# Sistema de Persistencia de Datos - Cursos Virtual

## 🎯 Objetivo

Todos los datos (cursos, tareas, cuestionarios, respuestas) se guardan permanentemente en cada dispositivo/navegador, sin importar cuál sea el servidor. Solo se eliminan cuando el profesor o admin los borra explícitamente.

## 📊 Cómo Funciona

### Con Backend (Servidor)

- Los datos se guardan en la **Base de Datos MongoDB**
- Se sincronizan automáticamente entre dispositivos
- Mayor escalabilidad y seguridad
- Acceso desde cualquier lugar con internet

### Sin Backend (Offline Fallback)

- Los datos se guardan permanentemente en **localStorage**
- Persisten aunque cierres el navegador o apagues el dispositivo
- Funciona 100% sin conexión a internet
- Cada dispositivo/navegador tiene su copia local

## 📁 Estructura de Almacenamiento Local

Los datos se almacenan en localStorage con el prefijo `cursosvirtual_`:

```
cursosvirtual_courses          → Lista de cursos
cursosvirtual_tasks            → Lista de tareas
cursosvirtual_questionnaires   → Lista de cuestionarios
cursosvirtual_responses        → Respuestas de estudiantes
cursosvirtual_enrollments      → Inscripciones de estudiantes
```

## 🔄 Flujo de Sincronización

1. **Profesor crea un curso**
   - Se guarda inmediatamente en localStorage (persistencia local)
   - Si hay backend, también se envía a MongoDB
2. **Profesor se desconecta**
   - El curso sigue visible en localStorage
   - Los cambios se sincronizan cuando vuelva la conexión

3. **Estudiante accede desde otro dispositivo**
   - Con backend: ve todos los cursos del servidor
   - Sin backend: solo ve los cursos que existan en ese dispositivo

## 🗑️ Eliminación de Datos

**Solo se eliminan cuando:**

- El profesor hace clic en "Eliminar" en un curso/tarea/cuestionario
- Se ejecuta explícitamente un comando de administrador
- El usuario borra el localStorage manualmente (Ctrl+Shift+Del)

**No se eliminan cuando:**

- Cierras el navegador
- Apaga el dispositivo
- Cambia de servidor/conexión
- Pasa el tiempo (sin límite de expiración)

## 📱 Para App Móvil (APK)

El sistema funciona igual:

- Los datos se guardan en el almacenamiento interno del dispositivo
- Persisten entre sesiones
- Se sincronizan con el backend si está disponible

## ⚙️ Configurar el Backend

Si quieres usar MongoDB:

1. Instala MongoDB: https://www.mongodb.com/
2. Ejecuta: `cd backend && npm install && npm start`
3. El servidor corre en `http://localhost:3000`
4. Los datos se guardarán en la base de datos

## 🔧 Para Cambiar la URL del Servidor

Edita `api.js` línea 2:

```javascript
const API_BASE = "http://tu-servidor.com/api"; // Cambia esto
```

## ✅ Ventajas del Sistema

- ✨ **Persistencia total**: Los datos nunca se pierden (hasta que se borren)
- 🔄 **Sincronización**: Con backend, acceso multi-dispositivo
- 📡 **Offline first**: Funciona sin internet
- 🚀 **Rápido**: localStorage es instantáneo
- 💾 **Escalable**: Soporta backend para grandes volúmenes

## 📊 Límites de Almacenamiento

- localStorage: ~5-10 MB por navegador/dispositivo
- MongoDB: Ilimitado (con backend)
- Para información grande (archivos): se recomienda usar backend
