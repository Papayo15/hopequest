# App Icon & Splash Screen

Estos assets son necesarios para publicar la app en las stores.

## App Icon

### Requisitos
- **Archivo**: `icon.png`
- **Tamaño**: 1024x1024px
- **Formato**: PNG con transparencia (o sin fondo blanco)
- **Diseño**: Logo del juego Hope Quest

### Diseño Sugerido
- Globo terráqueo estilizado
- Familia silueta (4 personas + perro)
- Colores vibrantes (azul cielo, verde esperanza, amarillo sol)
- Texto "Hope Quest" (opcional, mejor sin texto)

### Generación con AI
Prompt para Midjourney/DALL-E:

```
App icon for "Hope Quest", educational mobile game about migration and geography.
Features: colorful globe with family silhouettes (parents, children, dog) walking together.
Style: friendly cartoon, vibrant colors (blue, green, yellow), hopeful and adventurous mood.
Simple, recognizable at small sizes. No text. 1024x1024px.
```

### Herramientas Online
- **Icon Kitchen**: https://icon.kitchen (genera todos los tamaños automáticamente)
- **App Icon Generator**: https://appicon.co
- **MakeAppIcon**: https://makeappicon.com

## Splash Screen

### Requisitos
- **Archivo**: `splash.png`
- **Tamaño**: 2048x2048px (Expo lo adapta a todos los dispositivos)
- **Formato**: PNG
- **Diseño**: Pantalla de carga del juego

### Diseño Sugerido
- Fondo degradado (cielo azul a horizonte dorado)
- Logo centrado (mismo que icon pero más grande)
- Texto "Hope Quest" debajo del logo
- Subtítulo: "A Journey of Hope and Discovery"
- Versión: "v1.0.0" en esquina inferior

### Generación
Similar al icon pero con más espacio y texto:

```
Splash screen for mobile game "Hope Quest".
Centered logo: colorful globe with family silhouettes.
Background: blue sky gradient to golden horizon.
Text "Hope Quest" below logo in friendly font.
Tagline: "A Journey of Hope and Discovery".
Inspirational, welcoming, educational. 2048x2048px.
```

## Configuración en app.json

Una vez tengas los archivos, actualiza `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4A90E2"
    }
  }
}
```

## Tamaños Necesarios (Auto-generados por Expo)

Expo genera automáticamente desde el 1024x1024:
- iOS: 20x20 a 1024x1024 (múltiples tamaños)
- Android: 48x48 a 512x512 (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)

No necesitas crearlos manualmente.

## Placeholder Temporal

Para testing, crea un placeholder simple:

### Icon Placeholder
```bash
# Con ImageMagick
convert -size 1024x1024 xc:"#4A90E2" \
  -gravity center -pointsize 200 -fill white \
  -annotate +0+0 "HQ" \
  icon.png
```

### Splash Placeholder
```bash
# Con ImageMagick
convert -size 2048x2048 \
  gradient:"#4A90E2"-"#F39C12" \
  -gravity center -pointsize 150 -fill white \
  -annotate +0-200 "Hope Quest" \
  -pointsize 80 \
  -annotate +0+200 "A Journey of Hope" \
  splash.png
```

O simplemente copia el icon como splash temporalmente:
```bash
cp icon.png splash.png
```

## Testing

Después de crear los archivos:

```bash
# Reinicia Expo para que los detecte
npm start

# Prueba en simulador
npm run ios
npm run android
```

Verifica que:
- El icon aparece en el home screen
- El splash se muestra al abrir la app
- Los colores se ven bien

## Branding Consistency

Asegúrate que el icon y splash:
- Usen la misma paleta de colores
- Tengan el mismo estilo visual
- Sean reconocibles como la misma app
- Reflejen el tema educativo y esperanzador del juego

---

**Próximos pasos**: Genera o diseña los assets, colócalos en `/assets/`, y actualiza `app.json`.
