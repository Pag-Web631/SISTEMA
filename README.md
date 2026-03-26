# 📱 Cursos Virtual - Aplicación Moderna 2.0

## ✨ Características Nuevas

- ✅ **Diseño Moderno**: Interfaz limpia y profesional con gradientes modernos
- ✅ **Totalmente Responsive**: Optimizado para móviles, tablets y desktop
- ✅ **Animaciones Suaves**: Transiciones elegantes y fluidas
- ✅ **Colores Vibrantes**: Paleta de colores moderna (Púrpura y Azul)
- ✅ **Componentes Mejorados**: Tarjetas, botones y formularios modernos
- ✅ **Tipografía Premium**: Fuente Inter de Google Fonts
- ✅ **Sistema de Autenticación**: Login y registro funcionales
- ✅ **Gestión de Usuarios**: Panel para estudiantes y profesores
- ✅ **Persistencia de Datos**: LocalStorage para guardar información

---

## 📁 Estructura del Proyecto

```
CursosVirtual/
├── login-nuevo.html          ← Página de login moderna
├── estudiante-nuevo.html     ← Panel del estudiante
├── profesor-nuevo.html       ← Panel del profesor
├── login.css                 ← Estilos del login (actualizado)
├── index.css                 ← Estilos del dashboard (actualizado)
├── profesor.css              ← Estilos del profesor (actualizado)
├── login.js                  ← Lógica del login
├── estudiante.js             ← Lógica del estudiante
└── profesor.js               ← Lógica del profesor
```

---

## 🚀 Cómo Empezar

### 1. **En el Navegador (Local)**

Simplemente abre `login-nuevo.html` en tu navegador:

```bash
# Windows
start login-nuevo.html

# Mac
open login-nuevo.html

# Linux
xdg-open login-nuevo.html
```

### 2. **Credenciales de Prueba**

**Estudiante:**

- Email: `estudiante@correo.com`
- Contraseña: `123456`
- Rol: Estudiante

**Profesor:**

- Email: `profesor@correo.com`
- Contraseña: `123456`
- Rol: Profesor

---

## 📦 Convertir a APK (Android)

### **Opción 1: Usar Apache Cordova (Recomendado)**

#### Requisitos:

- Node.js instalado
- Android Studio / SDK instalado
- Java JDK instalado

#### Pasos:

```bash
# 1. Instalar Cordova globalmente
npm install -g cordova

# 2. Crear un proyecto Cordova
cordova create CursosVirtualAPK com.cursosvirtual.app "Cursos Virtual"

# 3. Entrar al directorio
cd CursosVirtualAPK

# 4. Agregar plataforma Android
cordova platform add android

# 5. Copiar archivos HTML, CSS, JS a www/
# (Reemplaza los archivos en la carpeta www/)

# 6. Compilar APK en modo debug
cordova build android

# APK generado en:
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### **Opción 2: Usar PhoneGap Build (Online)**

1. Crear un cuenta en [PhoneGap Build](https://build.phonegap.com/)
2. Subir los archivos del proyecto
3. Compilar directamente a APK

### **Opción 3: Usar Capacitor (Moderno)**

```bash
# Instalar Capacitor
npm install -g @capacitor/cli

# Dentro del proyecto
npm install @capacitor/core @capacitor/cli
npx cap init

# Agregar Android
npx cap add android

# Compilar y emular
npx cap build android
```

---

## 🎨 Personalización

### **Cambiar Colores**

Edita `login.css` y busca:

```css
/* Cambiar gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Reemplazar con tus colores */
background: linear-gradient(135deg, #tu_color_1 0%, #tu_color_2 100%);
```

### **Agregar Fuentes Personalizadas**

En el `<head>` de los HTML:

```html
<link
  href="https://fonts.googleapis.com/css2?family=TuFuente:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

### **Cambiar Logo**

Busca las líneas con:

```html
<img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Logo" />
```

Reemplaza con tu URL de logo.

---

## 📱 Optimizaciones para Móvil

✅ Meta viewport configurado
✅ Font sizes responsive
✅ Touch-friendly buttons
✅ Optimizado para pantallas pequeñas
✅ Animations GPU aceleradas
✅ Formularios optimizados para móvil

---

## 🔐 Seguridad

⚠️ **Advertencia**: Este es un sistema de demostración.

Para producción, necesitas:

1. **Backend auténtico** (Node.js, Python, PHP)
2. **Base de datos segura** (MySQL, MongoDB)
3. **Autenticación JWT** o sesiones seguras
4. **HTTPS/SSL** en el servidor
5. **Hashing de contraseñas** (bcrypt)

---

## 🛠️ Herramientas Útiles

| Herramienta        | Propósito                   |
| ------------------ | --------------------------- |
| **Android Studio** | Compilar y emular APK       |
| **Capacitor**      | Framework moderno para apps |
| **Cordova**        | Convertir web a nativa      |
| **PhoneGap**       | Compilación en la nube      |
| **VS Code**        | Editor recomendado          |

---

## 📊 Archivos CSS Actualizados

- ✅ `login.css` - Estilos modernos del login
- ✅ `index.css` - Dashboard responsivo
- ✅ `profesor.css` - Panel del profesor

## 📝 Archivos HTML Modernos

- ✅ `login-nuevo.html` - Login optimizado
- ✅ `estudiante-nuevo.html` - Panel estudiante mejorado
- ✅ `profesor-nuevo.html` - Panel profesor mejorado

---

## 🎯 Próximos Pasos

1. **Personaliza los colores** según tu marca
2. **Cambia el logo** por el tuyo
3. **Prueba en dispositivos reales**
4. **Agrega un backend** para datos persistentes
5. **Implementa autenticación real**
6. **Publica en Google Play Store**

---

## 📚 Recursos Útiles

- [Documentación Cordova](https://cordova.apache.org/docs/en/latest/)
- [Documentación Capacitor](https://capacitorjs.com/)
- [Android Studio Setup](https://developer.android.com/studio)
- [Material Design](https://material.io/design)

---

## 📞 Soporte

Desarrollador: **José Augusto**
Email: `contacto@cursosvirtual.com`
Ubicación: Colombia / República Dominicana

---

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de modificarlo y distribuirlo.

---

## 🎉 ¡Gracias por usar Cursos Virtual!

Esperamos que disfrutes de la plataforma modernizada.
¡Adelante con la programación! 🚀

---

### Versión: 2.0.0

### Última actualización: Marzo 2026
#