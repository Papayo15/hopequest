# ⚡ Quick Test Guide

Comandos rápidos para probar Hope Quest en diferentes plataformas.

---

## 🚀 Testing Rápido

### 🌐 Web (Más rápido)
```bash
npm run web
```
Se abre automáticamente en `http://localhost:8081`

### 📦 Web Build + Preview
```bash
npm run preview:web
```
Build de producción + servidor local

### 🤖 Android
```bash
npm run android
```
Requiere: Android Studio con emulador corriendo

### 🍎 iOS
```bash
npm run ios
```
Requiere: macOS con Xcode

---

## 🛠️ Utilities

### Limpiar cache
```bash
npm run clean
```

### Type check
```bash
npm run typecheck
```

### Lint
```bash
npm run lint
npm run lint:fix  # Auto-fix
```

### Format code
```bash
npm run format
```

### Validar todo
```bash
npm run validate
```

---

## 🎮 Menu Interactivo

```bash
npm run test:platforms
```

Menu visual para seleccionar plataforma:
1. Web
2. Android
3. iOS
4. Build Web
5. Typecheck
6. Lint
7. Clean cache
8. Project info

---

## 📱 Compilar Builds

### Android APK (testing)
```bash
npm run build:preview:android
```

### iOS IPA (testing)
```bash
npm run build:preview:ios
```

### Producción (ambos)
```bash
npm run deploy
```

---

## ✅ Checklist Diario

Antes de hacer commit:

```bash
# 1. Validar código
npm run validate

# 2. Formatear
npm run format

# 3. Probar en web
npm run web
```

---

## 🐛 Problemas Comunes

### Error: Metro bundler
```bash
npm run clean
npm start
```

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Types
```bash
npm run typecheck
# Fix errors
npm run lint:fix
```

---

**Tiempo estimado para probar:**
- Web: 1-2 minutos
- Android: 2-3 minutos
- iOS: 2-3 minutos
- Build: 10-20 minutos
