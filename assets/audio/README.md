# Audio Assets

Este directorio debe contener 19 archivos de audio (música y efectos de sonido).

## Lista de Assets Requeridos

### Música (6 tracks MP3)
Ubicación: `./music/`

- `menu.mp3` - Música del menú principal (2-3 min, loop)
- `map.mp3` - Música del mapa mundial (2-3 min, loop)
- `portal.mp3` - Música al seleccionar portal (1-2 min)
- `activity.mp3` - Música durante actividades (2-3 min, loop)
- `victory.mp3` - Música de victoria (15-30 seg)
- `defeat.mp3` - Música de derrota/retry (15-30 seg)

### Efectos de Sonido (13 archivos MP3)
Ubicación: `./sfx/`

- `button_press.mp3` - Click de botón (0.1 seg)
- `button_hover.mp3` - Hover sobre botón (0.1 seg)
- `portal_select.mp3` - Seleccionar portal (0.5 seg)
- `portal_enter.mp3` - Entrar a portal (1-2 seg)
- `level_complete.mp3` - Completar nivel (2 seg)
- `achievement_unlock.mp3` - Desbloquear logro (1-2 seg)
- `coin_collect.mp3` - Recolectar moneda (0.3 seg)
- `star_earn.mp3` - Ganar estrella (0.5 seg)
- `error.mp3` - Error/incorrecto (0.5 seg)
- `success.mp3` - Éxito/correcto (0.5 seg)
- `companion_meet.mp3` - Conocer compañero (2 seg)
- `checkpoint_pass.mp3` - Pasar checkpoint (1 seg)
- `checkpoint_fail.mp3` - Fallar checkpoint (1 seg)

## Especificaciones Técnicas

### Música
- **Formato**: MP3
- **Bitrate**: 128-192 kbps
- **Tamaño**: ~2-4MB por track
- **Estilo**: Uplifting, adventure, cultural influences

### SFX
- **Formato**: MP3
- **Bitrate**: 64-128 kbps
- **Tamaño**: 50-200KB por efecto
- **Volumen**: Normalizado a -3dB

## Dónde Encontrar Audio Royalty-Free

### Música
1. **Epidemic Sound** (Suscripción) - https://www.epidemicsound.com
2. **Artlist** (Suscripción) - https://artlist.io
3. **Incompetech** (Gratis CC) - https://incompetech.com
4. **Free Music Archive** - https://freemusicarchive.org

### Sound Effects
1. **Freesound** (Gratis CC) - https://freesound.org
2. **Zapsplat** (Gratis) - https://www.zapsplat.com
3. **Soundsnap** (Suscripción) - https://www.soundsnap.com
4. **Sonniss Game Audio** (Gratis) - https://sonniss.com/gameaudiogdc

## Generación con AI

### Música AI
- **Suno AI** - https://suno.ai
- **Udio** - https://www.udio.com
- **AIVA** - https://www.aiva.ai

### SFX AI
- **ElevenLabs Sound Effects** - https://elevenlabs.io/sound-effects

## Placeholder Temporal

Para testing rápido, usa sonidos del sistema o placeholders silenciosos:

```javascript
// En audioService.ts, retorna null para cargas de audio si no existe
if (!audioFile) {
  console.warn('Audio file not found, using silence');
  return null;
}
```

## Optimización

Comprime audio antes de usar:
```bash
# Convertir a MP3 optimizado
ffmpeg -i input.wav -b:a 128k -ar 44100 output.mp3

# Normalizar volumen
ffmpeg -i input.mp3 -af loudnorm output_normalized.mp3
```

Consulta el audioService.ts para ver cómo se cargan los archivos.
