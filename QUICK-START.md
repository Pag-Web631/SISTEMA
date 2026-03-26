# 🚀 GUÍA RÁPIDA: Compilar APK en 5 Minutos

## ⚡ Requisitos Previos

Asegúrate de tener instalado:

- ✅ **Node.js** (v14 o superior) → [Descargar](https://nodejs.org/)
- ✅ **Java JDK** (v8 o superior) → [Descargar](https://www.oracle.com/java/technologies/downloads/)
- ✅ **Android SDK** (a través de Android Studio) → [Descargar](https://developer.android.com/studio)
- ✅ **Git** (opcional) → [Descargar](https://git-scm.com/)

---

## 📋 Verificar Instalaciones

Abre una terminal y ejecuta:

```bash
# Verificar Node.js
node --version
npm --version

# Verificar Java
java -version

# Verificar Android SDK
echo %ANDROID_HOME%  (Windows)
echo $ANDROID_HOME   (Mac/Linux)
```

---

## 🎯 MÉTODO 1: Usando NPM (Recomendado)

### Paso 1: Navegar a la Carpeta del Proyecto

```bash
cd C:\Users\JOSE\ AUGUSTO\Desktop\CursosVirtual
```

### Paso 2: Instalar Dependencias

```bash
# Instalar Cordova
npm install -g cordova

# Verificar instalación
cordova -v
```

### Paso 3: Crear Proyecto Cordova

```bash
# Crear nuevo proyecto del mismo nivel
cd ..
cordova create CursosVirtualAPK com.cursosvirtual.app "Cursos Virtual"

# O si prefieres reutilizar, entra a la carpeta
cd CursosVirtualAPK
```

### Paso 4: Agregar Plataforma Android

```bash
cordova platform add android
```

_Esto puede tomar varios minutos la primera vez_

### Paso 5: Copiar Archivos del Proyecto

En Windows CMD:

```batch
# Copiar archivos HTML
copy ..\CursosVirtual\index.html www\index.html
copy ..\CursosVirtual\estudiante-nuevo.html www\estudiante.html
copy ..\CursosVirtual\profesor-nuevo.html www\profesor.html

# Copiar CSS
copy ..\CursosVirtual\login.css www\css\login.css
copy ..\CursosVirtual\index.css www\css\index.css
copy ..\CursosVirtual\profesor.css www\css\profesor.css

# Copiar JavaScript
copy ..\CursosVirtual\login.js www\js\login.js
copy ..\CursosVirtual\estudiante.js www\js\estudiante.js
copy ..\CursosVirtual\profesor.js www\js\profesor.js
```

### Paso 6: Compilar APK

```bash
# APK en Debug (para testing)
cordova build android

# APK en Release (para producción)
cordova build android --release
```

_Espera 2-5 minutos mientras compila_

### Paso 7: ¡Listo! 🎉

El APK se encontrará en:

```
CursosVirtualAPK\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 MÉTODO 2: Usando Android Studio

### Paso 1: Abrir Android Studio

1. Abre Android Studio
2. Selecciona "Open Project"
3. Navega a `CursosVirtualAPK/platforms/android/`

### Paso 2: Esperar a que Sincronice

Android Studio descargará dependencias automáticamente.

### Paso 3: Compilar

1. Click en `Build` en el menú
2. Selecciona `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. Espera a que termine

---

## 📱 INSTALACIÓN EN DISPOSITIVO

### Opción A: Instalación Directa (Vía USB)

```bash
# Con el dispositivo conectado por USB
cordova run android

# O manualmente:
adb install -r path\a\app-debug.apk
```

### Opción B: Transferencia Manual

1. Conecta tu dispositivo al PC
2. Copia el APK a la carpeta `Descargas`
3. En el dispositivo: Abre el archivo APK
4. Confirm "Instalar"

### Opción C: Email o Nube

1. Email el APK a ti mismo
2. Abre el email en el dispositivo
3. Descarga e instala

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "cordova: comando no encontido"

**Solución:**

```bash
npm install -g cordova
```

### ❌ Error: "Android SDK not found"

**Solución:**

1. Abre Android Studio
2. Configura el SDK en `Tools → SDK Manager`
3. Establece la variable de entorno `ANDROID_HOME`

En Windows (CMD):

```bash
setx ANDROID_HOME "C:\Users\TuUsuario\AppData\Local\Android\Sdk"
```

### ❌ Error: "Java not found"

**Solución:**

1. Instala Java JDK desde [Oracle](https://www.oracle.com/java/technologies/downloads/)
2. Establece la variable de entorno `JAVA_HOME`

En Windows (CMD):

```bash
setx JAVA_HOME "C:\Program Files\Java\jdk1.8.0_XX"
```

### ❌ El APK es muy grande

**Solución:**

```bash
# Compilar sin plugins innecesarios
cordova build android --release
```

### ❌ La app se cierra al abrir

**Solución:**

1. Revisa los logs:

```bash
cordova run android -- --verbose
```

2. Verifica que los archivos CSS/JS estén en `www/`
3. Abre DevTools en Chrome: `chrome://inspect`

---

## ⚙️ CONFIGURACIONES AVANZADAS

### Cambiar el Nombre de la App

Edita `config.xml`:

```xml
<widget id="com.cursosvirtual.app" version="2.0.0">
    <name>Cursos Virtual</name>
    <description>Plataforma moderna de aprendizaje</description>
    <author email="contacto@cursosvirtual.com">José Augusto</author>
</widget>
```

### Cambiar el Icono

```xml
<icon src="res/icon.png" />
<splash src="res/splash.png" />
```

### Agregar Orientación

```xml
<preference name="Orientation" value="portrait" />
```

---

## 📦 VERSIONES DEL APK

### Debug APK (Desarrollo)

- Más grande
- Contiene datos de debug
- Ideal para testing
- Ubicación: `.../debug/app-debug.apk`

### Release APK (Producción)

- Más pequeño
- Sin datos de debug
- Requiere firma digital
- Ubicación: `.../release/app-release-unsigned.apk`

---

## 🔐 FIRMAR APK PARA GOOGLE PLAY

```bash
# Generar keystore
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000

# Firmar APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

# Alinear APK (opcional pero recomendado)
zipalign -v 4 app-release-unsigned.apk CursosVirtual.apk
```

---

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] Java JDK instalado
- [ ] Android SDK configurado
- [ ] ANDROID_HOME establecido
- [ ] Dependencias instaladas (`npm install -g cordova`)
- [ ] Archivos copiados a `www/`
- [ ] Cordova platform configurado (`cordova platform add android`)
- [ ] Compilación completada (`cordova build android`)
- [ ] APK encontrado en `platforms/android/app/build/outputs/apk/debug/`

---

## 🎯 Próximos Pasos

1. ✅ Prueba el APK en tu dispositivo
2. ✅ Personaliza colores y logos
3. ✅ Agrega más funcionalidades
4. ✅ Firma el APK para producción
5. ✅ Publica en Google Play Store

---

## 📞 Ayuda Rápida

| Problema         | Comando                            |
| ---------------- | ---------------------------------- |
| Ver logs         | `cordova run android -- --verbose` |
| Limpiar proyecto | `cordova clean`                    |
| Ver información  | `cordova info`                     |
| Instalar plugin  | `cordova plugin add <plugin>`      |
| Remover plugin   | `cordova plugin remove <plugin>`   |

---

## 🎓 Tutorial Video (Recomendado)

Busca en YouTube:

- "Convertir web a APK con Cordova"
- "Cordova Android tutorial"
- "Phonegap build setup"

---

## ✨ ¡Éxito!

Con estos pasos tendrás tu APK listo en menos de 5 minutos.

**¿Tienes dudas?**

- Revisa los logs en la terminal
- Busca el error en Google
- Consulta la [documentación oficial de Cordova](https://cordova.apache.org/)

---

**Ahora a crear una app increíble! 🚀**

Desarrollador: José Augusto
Email: contacto@cursosvirtual.com
© 2026 Cursos Virtual
