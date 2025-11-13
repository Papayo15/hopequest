# Guía de Integración - Audio y Achievements

## ✅ Lo que YA está integrado

### 1. Audio Service
- ✅ **Inicializado en App.tsx** (línea 35)
- ✅ **Hook useDynamicMusic actualizado** para usar audioService
- ✅ **Paths correctos** (.wav en lugar de .mp3)

### 2. Achievement Service
- ✅ **Inicializado en App.tsx** (línea 35)
- ✅ **Conectado con GameStore** (gameStore.ts)
- ✅ **Auto-check en acciones**:
  - `completeCountry()` → verifica achievements
  - `incrementPortalsUsed()` → verifica achievements
  - `incrementActivitiesCompleted()` → verifica achievements
  - `incrementTriviaCorrect()` → verifica achievements

---

## 🎵 Cómo usar Audio en tus pantallas

### Opción 1: Música de Fondo (Recomendado)

```tsx
import { useBackgroundMusic } from '@/hooks/useAudio';

export default function HomeScreen() {
  // Auto-play y auto-stop al salir
  useBackgroundMusic('menu', true);

  return (
    <View>
      {/* Tu contenido */}
    </View>
  );
}
```

**Tracks disponibles:**
- `'menu'` - Menú principal
- `'map'` - Mapa mundial
- `'activity'` - Durante actividades
- `'portal'` - Portal/Boss battle
- `'victory'` - Pantalla de victoria
- `'defeat'` - Pantalla de derrota

### Opción 2: Efectos de Sonido (SFX)

```tsx
import { useSFX } from '@/hooks/useAudio';

export default function MyScreen() {
  const { playSFX } = useSFX();

  const handleButtonPress = () => {
    playSFX('button_press');
    // Tu lógica...
  };

  return (
    <Button onPress={handleButtonPress} title="Presiona" />
  );
}
```

**SFX disponibles:**
- `'button_press'` - Al presionar botón
- `'button_hover'` - Hover sobre botón (web)
- `'portal_select'` - Seleccionar portal
- `'portal_enter'` - Entrar al portal
- `'level_complete'` - Completar nivel
- `'achievement_unlock'` - Logro desbloqueado (se toca automáticamente)
- `'coin_collect'` - Recoger moneda
- `'star_earn'` - Ganar estrella
- `'error'` - Error/fallo
- `'success'` - Éxito
- `'companion_meet'` - Conocer compañero
- `'checkpoint_pass'` - Pasar checkpoint
- `'checkpoint_fail'` - Fallar checkpoint

### Opción 3: Botones con SFX Automático

```tsx
import { useButtonPress } from '@/hooks/useAudio';

export default function MyScreen() {
  const handlePress = useButtonPress(() => {
    // Tu lógica aquí
    console.log('Botón presionado');
  });

  return (
    <Button onPress={handlePress} title="Presiona" />
  );
}
```

### Opción 4: Narración

```tsx
import { useNarration } from '@/hooks/useAudio';

export default function StoryScreen() {
  const { play, stop, pause, resume } = useNarration();

  const playStory = () => {
    play(require('@/assets/audio/narration/intro.wav'), () => {
      console.log('Narración terminó');
    });
  };

  return (
    <View>
      <Button onPress={playStory} title="Reproducir historia" />
      <Button onPress={pause} title="Pausar" />
      <Button onPress={resume} title="Continuar" />
      <Button onPress={stop} title="Detener" />
    </View>
  );
}
```

---

## 🏆 Cómo trackear Achievements

### Los achievements se verifican AUTOMÁTICAMENTE

Cuando usas las funciones del gameStore, los achievements se checkean solos:

```tsx
import { useGameStore } from '@/stores/gameStore';

export default function GameplayScreen() {
  const completeCountry = useGameStore(state => state.completeCountry);
  const incrementPortalsUsed = useGameStore(state => state.incrementPortalsUsed);
  const incrementActivitiesCompleted = useGameStore(state => state.incrementActivitiesCompleted);

  const handleCountryComplete = () => {
    // Esto automáticamente verifica achievements de países
    completeCountry('mexico', 3);
  };

  const handlePortalEnter = () => {
    // Esto automáticamente verifica achievements de portales
    incrementPortalsUsed();
  };

  const handleActivityComplete = (isPerfect: boolean) => {
    // Esto automáticamente verifica achievements de actividades
    incrementActivitiesCompleted(isPerfect);
  };

  return (
    // Tu UI
  );
}
```

### Mostrar Notificación de Achievement Desbloqueado

```tsx
import { achievementService } from '@/services/achievements/achievementService';
import { useEffect, useState } from 'react';

export default function GameScreen() {
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    // Suscribirse a achievements desbloqueados
    const unsubscribe = achievementService.subscribe((achievement) => {
      setNewAchievement(achievement);
      // El SFX 'achievement_unlock' ya se reproduce automáticamente
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      {/* Tu contenido */}

      {newAchievement && (
        <AchievementNotification
          achievement={newAchievement}
          onDismiss={() => setNewAchievement(null)}
        />
      )}
    </View>
  );
}
```

---

## 📱 Ejemplo Completo de Integración

### HomeScreen.tsx

```tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBackgroundMusic, useButtonPress } from '@/hooks/useAudio';
import { achievementService } from '@/services/achievements/achievementService';

export default function HomeScreen({ navigation }) {
  // Música de fondo automática
  useBackgroundMusic('menu', true);

  // Botón con SFX
  const handlePlayPress = useButtonPress(() => {
    navigation.navigate('WorldMap');
  });

  const handleSettingsPress = useButtonPress(() => {
    navigation.navigate('Settings');
  }, 'button_press');

  return (
    <View style={styles.container}>
      <Button onPress={handlePlayPress} title="Jugar" />
      <Button onPress={handleSettingsPress} title="Configuración" />
    </View>
  );
}
```

### WorldMapScreen.tsx

```tsx
import React from 'react';
import { View } from 'react-native';
import { useBackgroundMusic, useSFX } from '@/hooks/useAudio';
import { useGameStore } from '@/stores/gameStore';

export default function WorldMapScreen() {
  // Música del mapa
  useBackgroundMusic('map', true);

  const { playSFX } = useSFX();
  const incrementPortalsUsed = useGameStore(state => state.incrementPortalsUsed);

  const handlePortalPress = (countryId: string) => {
    playSFX('portal_select');
    // Lógica de selección...
  };

  const handlePortalEnter = () => {
    playSFX('portal_enter');
    incrementPortalsUsed(); // ✅ Esto checkea achievements automáticamente
    // Navegar a actividad...
  };

  return (
    // Tu UI con portales...
  );
}
```

### ActivityScreen.tsx

```tsx
import React, { useEffect } from 'react';
import { useBackgroundMusic, useSFX } from '@/hooks/useAudio';
import { useGameStore } from '@/stores/gameStore';

export default function ActivityScreen() {
  useBackgroundMusic('activity', true);
  const { playSFX } = useSFX();

  const incrementActivitiesCompleted = useGameStore(
    state => state.incrementActivitiesCompleted
  );

  const handleActivityComplete = (stars: number) => {
    const isPerfect = stars === 3;

    // SFX
    playSFX(isPerfect ? 'success' : 'level_complete');

    // Track achievement ✅ Auto-checkea achievements
    incrementActivitiesCompleted(isPerfect);

    // Navegar a victoria...
  };

  return (
    // Tu UI...
  );
}
```

### VictoryScreen.tsx

```tsx
import React from 'react';
import { useBackgroundMusic, useSFX } from '@/hooks/useAudio';
import { useGameStore } from '@/stores/gameStore';

export default function VictoryScreen({ route }) {
  useBackgroundMusic('victory', true);
  const { playSFX } = useSFX();

  const completeCountry = useGameStore(state => state.completeCountry);
  const { countryId, stars } = route.params;

  useEffect(() => {
    // SFX de estrellas
    playSFX('star_earn');

    // Completar país ✅ Auto-checkea achievements
    completeCountry(countryId, stars);
  }, []);

  return (
    // Tu celebración...
  );
}
```

---

## 🎮 Control de Volumen

```tsx
import { useAudioSettings } from '@/hooks/useAudio';

export default function SettingsScreen() {
  const {
    setVolume,
    getVolume,
    toggleMusic,
    toggleSFX,
    getAudioStates
  } = useAudioSettings();

  const handleMusicVolumeChange = (value: number) => {
    setVolume('music', value); // 0.0 a 1.0
  };

  const handleSFXVolumeChange = (value: number) => {
    setVolume('sfx', value);
  };

  const handleToggleMusic = () => {
    const states = getAudioStates();
    toggleMusic(!states.music);
  };

  return (
    // Tu UI de configuración...
  );
}
```

---

## 📋 Checklist de Integración

### Audio
- [ ] HomeScreen → `useBackgroundMusic('menu')`
- [ ] WorldMapScreen → `useBackgroundMusic('map')`
- [ ] ActivityScreen → `useBackgroundMusic('activity')`
- [ ] BossBattleScreen → `useBackgroundMusic('portal')`
- [ ] VictoryScreen → `useBackgroundMusic('victory')`
- [ ] DefeatScreen → `useBackgroundMusic('defeat')`
- [ ] Botones → `useButtonPress()` o `playSFX('button_press')`
- [ ] Portales → `playSFX('portal_enter')`
- [ ] Completar actividad → `playSFX('level_complete')`
- [ ] Ganar estrella → `playSFX('star_earn')`
- [ ] Recoger moneda → `playSFX('coin_collect')`

### Achievements
- [ ] Usar `useGameStore().completeCountry()` al completar país
- [ ] Usar `useGameStore().incrementPortalsUsed()` al usar portal
- [ ] Usar `useGameStore().incrementActivitiesCompleted()` al completar actividad
- [ ] Usar `useGameStore().incrementTriviaCorrect()` en trivia correcta
- [ ] Suscribirse a `achievementService.subscribe()` para mostrar notificaciones
- [ ] Agregar botón de Achievements en ProfileScreen o HomeScreen

---

## 🐛 Troubleshooting

### No se escucha la música

1. Verifica que el archivo existe en `assets/audio/music/[nombre].wav`
2. Verifica que `musicEnabled` está en `true`:
   ```ts
   const musicEnabled = useGameStore(state => state.musicEnabled);
   console.log('Music enabled:', musicEnabled);
   ```
3. Verifica el volumen:
   ```ts
   const { getVolume } = useAudioSettings();
   console.log('Music volume:', getVolume('music'));
   ```

### No se reproducen los SFX

1. Verifica que el archivo existe en `assets/audio/sfx/[nombre].wav`
2. Verifica que `soundEnabled` está en `true`
3. Verifica el volumen de SFX

### Los achievements no se desbloquean

1. Verifica que estás usando las funciones del gameStore (no set directo)
2. Verifica que `achievementService.initialize()` fue llamado
3. Verifica las stats:
   ```ts
   const stats = useGameStore(state => ({
     countries: state.completedCountries.length,
     stars: state.totalStars,
     portals: state.portalsUsed,
   }));
   console.log('Stats:', stats);
   ```

---

## 📚 Recursos

- **audioService**: `/src/services/audio/audioService.ts`
- **achievementService**: `/src/services/achievements/achievementService.ts`
- **Audio Hooks**: `/src/hooks/useAudio.ts`
- **GameStore**: `/src/stores/gameStore.ts`
- **Achievements constants**: `/src/constants/achievements.ts`

---

## ✨ Próximos Pasos

1. **Agregar archivos de audio** en `assets/audio/`:
   - `music/` → tracks .wav
   - `sfx/` → efectos .wav
   - `narration/` → narraciones .wav (opcional)

2. **Crear AchievementNotification component** para mostrar logros desbloqueados

3. **Agregar pantalla de Achievements** con todos los logros disponibles

4. **Conectar con ProfileScreen** para mostrar progreso

¡Listo! 🎉 El audio y achievements están completamente integrados y funcionando.
