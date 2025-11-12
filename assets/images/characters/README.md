# Character Art Assets

Este directorio debe contener 22 imágenes de personajes generadas con AI.

## Lista de Assets Requeridos (22 archivos PNG)

### Pepe (Niño) - 5 expresiones
- `pepe_neutral.png` - Expresión neutral/normal
- `pepe_happy.png` - Feliz/sonriente
- `pepe_sad.png` - Triste/preocupado
- `pepe_excited.png` - Emocionado/sorprendido
- `pepe_determined.png` - Determinado/valiente

### Paula (Niña) - 5 expresiones
- `paula_neutral.png` - Expresión neutral/normal
- `paula_happy.png` - Feliz/sonriente
- `paula_sad.png` - Triste/preocupado
- `paula_excited.png` - Emocionado/sorprendida
- `paula_determined.png` - Determinada/valiente

### Isabella (Niña Adoptada) - 5 expresiones
- `isabella_neutral.png` - Expresión neutral/normal
- `isabella_happy.png` - Feliz/sonriente
- `isabella_sad.png` - Triste/preocupado
- `isabella_excited.png` - Emocionado/sorprendida
- `isabella_hopeful.png` - Esperanzada

### Xolo (Ajolote Sabio) - 3 expresiones
- `xolo_neutral.png` - Expresión neutral/sabio
- `xolo_wise.png` - Sabio/explicando
- `xolo_playful.png` - Juguetón

### Don Bowser (Antagonista) - 2 expresiones
- `don_bowser_angry.png` - Enojado/autoritario
- `don_bowser_smug.png` - Arrogante/petulante

### Koopa Hielo (Guardias) - 2 expresiones
- `koopa_hielo_guard.png` - Guardia vigilando
- `koopa_hielo_chase.png` - Persiguiendo

## Especificaciones Técnicas

- **Formato**: PNG con transparencia
- **Resolución**: 2048x2048px (alta resolución)
- **Estilo**: Cartoon amigable, apropiado para niños 7-14 años
- **Color**: Vibrante pero no saturado

## Cómo Generar

Consulta el archivo `/docs/AI_CHARACTER_ART_GUIDE.md` para:
- Prompts de Midjourney/DALL-E listos para usar
- Guía de estilo visual
- Instrucciones de post-procesamiento
- Optimización para React Native

## Placeholder Temporal

Para testing, puedes usar:
1. Imágenes de placeholder services (placeholder.com)
2. Emojis grandes exportados como PNG
3. Formas geométricas simples con colores distintivos

```bash
# Ejemplo: Crear placeholder simple
convert -size 2048x2048 xc:blue -pointsize 200 -fill white \
  -annotate +512+1024 "PEPE" pepe_neutral.png
```
