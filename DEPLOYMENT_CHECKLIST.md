# 🚀 Deployment Checklist - Hope Quest

Guía completa para probar en web y compilar para iOS/Android.

---

## ✅ Pre-requisitos Verificados

Este repositorio **YA TIENE** todo lo necesario:

- ✅ `package.json` con todas las dependencias
- ✅ `package-lock.json` (versiones exactas)
- ✅ `eas.json` (configuración de build)
- ✅ `app.json` (configuración de Expo)
- ✅ `babel.config.js` (transpilación)
- ✅ `metro.config.js` (bundler)
- ✅ `tsconfig.json` (TypeScript)
- ✅ `vercel.json` (deploy web)
- ✅ Assets completos (icon, splash, adaptive-icon)
- ✅ Audio files (19 WAV)
- ✅ 150 archivos TypeScript/TSX

---

## 📱 1. PROBAR EN WEB

### Opción A: Modo Desarrollo (Rápido)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en web
npm run web

# 3. Abrir en navegador
# Se abre automáticamente en http://localhost:8081
```

**Tiempo:** 2-3 minutos

### Opción B: Build de Producción (Para deploy)

```bash
# 1. Build para web
npm run build:web

# 2. Preview local
npx serve dist

# 3. Abrir http://localhost:3000
```

**Resultado:** Carpeta `dist/` lista para subir a Vercel/Netlify/GitHub Pages

---

## 🍎 2. COMPILAR PARA iOS

### Pre-requisitos iOS

- Mac con macOS (requerido)
- Xcode 15+ instalado
- Cuenta Apple Developer ($99/año)

### Build con EAS (En la nube)

```bash
# 1. Instalar EAS CLI
npm install -g eas-cli

# 2. Login a Expo
eas login

# 3. Configurar (primera vez)
eas build:configure

# 4. Build de prueba (para TestFlight)
npm run build:preview:ios

# 5. Build de producción (para App Store)
npm run build:ios
```

**Tiempo:** 15-20 minutos (build en la nube)
**Resultado:** Archivo `.ipa` descargable

### Submit a App Store

```bash
# Subir a TestFlight/App Store
npm run submit:ios
```

---

## 🤖 3. COMPILAR PARA ANDROID

### Pre-requisitos Android

- Ninguno (EAS Build funciona en cualquier OS)

### Build con EAS (En la nube)

```bash
# 1. Instalar EAS CLI (si no lo tienes)
npm install -g eas-cli

# 2. Login a Expo
eas login

# 3. Build APK (para testing)
npm run build:preview:android

# 4. Build AAB (para Google Play Store)
npm run build:android
```

**Tiempo:** 10-15 minutos (build en la nube)
**Resultado:**
- Preview: `.apk` (instalable directo)
- Production: `.aab` (App Bundle para Play Store)

### Submit a Google Play Store

```bash
# Subir a Play Store
npm run submit:android
```

---

## 🎯 4. BUILD COMPLETO (iOS + Android)

```bash
# Build ambas plataformas en paralelo
npm run deploy

# Equivalente a:
# npm run build:ios && npm run build:android
```

**Tiempo:** ~25 minutos total

---

## 📊 5. PERFILES DE BUILD (eas.json)

El proyecto tiene 3 perfiles configurados:

### Development
```bash
eas build --platform android --profile development
```
- Build con dev client
- Para testing interno
- Incluye debugging tools

### Preview
```bash
npm run build:preview:android
npm run build:preview:ios
```
- APK/IPA standalone
- Para beta testers
- Sin developer tools

### Production
```bash
npm run build:android
npm run build:ios
```
- Optimizado y firmado
- Listo para stores
- Sin debugging

---

## 🌐 6. DEPLOY WEB (Vercel)

### Opción A: Vercel CLI

```bash
# 1. Instalar Vercel
npm install -g vercel

# 2. Deploy
vercel

# 3. Deploy a producción
vercel --prod
```

### Opción B: GitHub Integration

1. Conecta tu repo a Vercel
2. Cada push a `main` hace deploy automático
3. Pull requests generan preview URLs

**URL ejemplo:** `https://hopequest.vercel.app`

---

## 🔑 7. CONFIGURACIÓN DE SECRETS

### Para builds nativos (iOS/Android)

```bash
# Configurar secretos en EAS
eas secret:create --scope project --name FIREBASE_API_KEY --value "tu_api_key"
eas secret:create --scope project --name ADMOB_APP_ID_ANDROID --value "ca-app-pub-xxx"
# ... etc
```

### Para web (Vercel)

1. Dashboard de Vercel
2. Settings > Environment Variables
3. Agregar variables de `.env.example`

---

## ✅ 8. CHECKLIST ANTES DE DEPLOY

### Web
- [ ] `npm run build:web` funciona sin errores
- [ ] Assets se cargan correctamente (images, audio)
- [ ] Firebase Analytics funciona
- [ ] Responsive en mobile/tablet/desktop
- [ ] Variables de entorno configuradas en Vercel

### iOS
- [ ] `eas.json` tiene bundleIdentifier correcto
- [ ] Apple Developer Account activa
- [ ] Certificados y provisioning profiles configurados
- [ ] Info.plist tiene descripciones de permisos
- [ ] Build de preview funciona en TestFlight

### Android
- [ ] `eas.json` tiene package correcto
- [ ] Google Play Console configurada
- [ ] Keystore y signing configurado (automático con EAS)
- [ ] Permisos en AndroidManifest correcto
- [ ] Build de preview funciona en dispositivo

---

## 🐛 9. TROUBLESHOOTING

### Error: "Metro bundler failed"
```bash
# Limpiar cache
npx expo start -c
```

### Error: "EAS build failed"
```bash
# Ver logs
eas build:list

# Re-intentar build
eas build --platform android --profile preview --clear-cache
```

### Error: "Assets not loading in web"
```bash
# Verificar metro.config.js existe
# Rebuild
npm run build:web
```

### Error: "Type errors"
```bash
# Verificar tipos
npm run typecheck

# Fix automático
npm run format
```

---

## 📈 10. MONITOREO POST-DEPLOY

### Web (Vercel)
- Analytics: https://vercel.com/analytics
- Logs: Dashboard > Deployments > Logs
- Performance: Lighthouse CI

### Mobile (Firebase)
- Crashlytics: Console > Crashlytics
- Analytics: Console > Analytics
- Performance: Console > Performance

---

## 🎉 11. NEXT STEPS

Después de deploy exitoso:

1. **Submit a Stores**
   ```bash
   npm run submit:ios
   npm run submit:android
   ```

2. **Configurar CI/CD** (GitHub Actions)
   - Auto-build en cada PR
   - Auto-deploy a stores con tags

3. **Monitoring**
   - Firebase Analytics
   - Crashlytics
   - Vercel Analytics

4. **Updates OTA** (Expo Updates)
   ```bash
   eas update --branch production
   ```

---

## 📞 SOPORTE

- Expo Docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- Vercel Docs: https://vercel.com/docs

---

**Proyecto:** Hope Quest v1.0.0
**Última actualización:** Noviembre 2024
**Status:** ✅ Listo para deployment
