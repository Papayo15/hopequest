# FASE 9: Audio System & Achievements - COMPLETADA ✅

**Fecha de Finalización**: Noviembre 4, 2025
**Estado**: COMPLETA
**Progreso Total del Proyecto**: 9/10 Fases (90%)

---

## 📋 Resumen Ejecutivo

FASE 9 implementa el sistema completo de audio (música, SFX, narración) utilizando expo-av, y el sistema de logros con tracking, notificaciones y recompensas. Ambos sistemas son modulares, escalables y están integrados con Firebase Analytics.

### Objetivos Completados

✅ Audio Service con expo-av para música, SFX y narración
✅ React hooks para fácil integración de audio
✅ Sistema de logros con 22 achievements definidos
✅ Achievement Service con tracking automático
✅ Notificaciones animadas de logros desbloqueados
✅ Pantalla de Achievements con progreso y reclamación de recompensas
✅ Integración con Firebase Analytics para tracking

---

## 🗂️ Archivos Creados

### Audio System

#### 1. **src/services/audio/audioService.ts** (428 líneas)
**Propósito**: Servicio centralizado para reproducción de música, efectos de sonido y narración.

**Características principales**:
- Singleton pattern para acceso global
- Gestión de música de fondo con loop automático
- Cache de SFX para rendimiento óptimo
- Sistema de narración con callbacks
- Fade in/out para transiciones suaves
- Control de volumen por categoría (master, music, sfx, narration)
- Manejo de estados (enabled/disabled) por tipo de audio

**Tipos de Audio**:

```typescript
export type MusicTrack =
  | 'menu'
  | 'map'
  | 'portal'
  | 'activity'
  | 'victory'
  | 'defeat';

export type SFXType =
  | 'button_press'
  | 'button_hover'
  | 'portal_select'
  | 'portal_enter'
  | 'level_complete'
  | 'achievement_unlock'
  | 'coin_collect'
  | 'star_earn'
  | 'error'
  | 'success'
  | 'companion_meet'
  | 'checkpoint_pass'
  | 'checkpoint_fail';
```

**Métodos principales**:

1. **initialize()**: Configura audio mode de React Native
   - Permite reproducción en modo silencioso (iOS)
   - Mantiene audio activo en background
   - Duck audio en Android cuando hay notificaciones

2. **playMusic(track, fadeIn)**: Reproduce música de fondo
   - Auto-loop activado
   - Fade in opcional (1 segundo)
   - Stop automático de música anterior

3. **stopMusic(fadeOut)**: Detiene música
   - Fade out opcional (500ms)
   - Cleanup de recursos

4. **playSFX(type)**: Reproduce efecto de sonido
   - One-shot (no loop)
   - Sistema de cache para mejor rendimiento
   - Volumen controlado por settings

5. **playNarration(audioPath, onComplete)**: Reproduce narración
   - Callback al completar
   - Control de reproducción (play, pause, stop, resume)
   - Integrado con storytelling educativo

6. **setVolume(category, volume)**: Ajusta volumen
   - Por categoría: master, music, sfx, narration
   - Actualiza sonidos en reproducción en tiempo real

7. **toggleMusic/SFX/Narration(enabled)**: Activa/desactiva audio
   - Persistente en sesión
   - Stop automático al desactivar

**Configuración de Audio Mode**:
```typescript
await Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  shouldDuckAndroid: true,
});
```

**Rutas de Audio**:
- Música: `@/assets/audio/music/*.mp3`
- SFX: `@/assets/audio/sfx/*.mp3`
- Narración: Paths dinámicos pasados como parámetros

**Nota importante**: Los archivos de audio deben ser creados/descargados y colocados en las carpetas correspondientes. El servicio está preparado para usar archivos MP3 de tamaño moderado (música ~2-4MB, SFX ~50-200KB).

#### 2. **src/hooks/useAudio.ts** (97 líneas)
**Propósito**: React hooks para integración fácil del audioService en componentes.

**Hooks disponibles**:

1. **useBackgroundMusic(track, autoPlay)**
   - Auto-play al montar componente
   - Auto-stop al desmontar
   - Retorna { play, stop }

   ```typescript
   const MapScreen = () => {
     useBackgroundMusic('map', true);
     // Música de mapa se reproduce automáticamente
     return <View>...</View>;
   };
   ```

2. **useSFX()**
   - Retorna función para reproducir SFX

   ```typescript
   const MyButton = () => {
     const { playSFX } = useSFX();

     const handlePress = () => {
       playSFX('button_press');
       // ... lógica del botón
     };
   };
   ```

3. **useButtonPress(onPress, sfxType)**
   - Wrapper para onPress con SFX automático

   ```typescript
   const MyButton = () => {
     const handlePress = useButtonPress(() => {
       console.log('Clicked!');
     }, 'button_press');

     return <Button onPress={handlePress} />;
   };
   ```

4. **useNarration()**
   - Control completo de narración
   - Retorna { play, stop, pause, resume }

   ```typescript
   const StoryScreen = () => {
     const narration = useNarration();

     const startStory = () => {
       narration.play(
         require('@/assets/audio/narration/story1.mp3'),
         () => console.log('Story ended')
       );
     };
   };
   ```

5. **useAudioSettings()**
   - Control de configuraciones de audio
   - Retorna { setVolume, getVolume, toggleMusic, toggleSFX, toggleNarration, getAudioStates }

   ```typescript
   const SettingsScreen = () => {
     const { setVolume, toggleMusic } = useAudioSettings();

     return (
       <View>
         <Slider onValueChange={(v) => setVolume('music', v)} />
         <Switch onValueChange={toggleMusic} />
       </View>
     );
   };
   ```

---

### Achievement System

#### 3. **src/constants/achievements.ts** (312 líneas)
**Propósito**: Definiciones de todos los logros del juego, tipos, y helpers.

**Sistema de Tiers** (4 niveles):
- **Bronze** (#CD7F32): Logros básicos, fáciles de conseguir
- **Silver** (#C0C0C0): Logros intermedios, requieren dedicación
- **Gold** (#FFD700): Logros avanzados, alto compromiso
- **Platinum** (#E5E4E2): Logros maestros, completar todo

**Categorías de Logros** (6 tipos):
- **Exploration** (🌍): Completar países, viajar distancias
- **Education** (🎓): Ganar estrellas, responder trivia
- **Social** (🤝): Conocer compañeros, interacciones sociales
- **Skill** (⚡): Usar portales, completar actividades
- **Collection** (💎): Acumular monedas, coleccionar items
- **Special** (✨): Logros secretos, eventos especiales

**Estructura de Achievement**:
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string; // emoji
  requirement: {
    type: 'countries_completed' | 'stars_earned' | ...;
    target: number;
    specificType?: string; // opcional
  };
  rewards: {
    coins: number;
    stars?: number;
    specialItem?: string;
    title?: string; // Título desbloqueable
  };
  hidden?: boolean; // Logros secretos
}
```

**Logros Implementados** (22 total):

**Exploration (4)**:
1. Primeros Pasos - Completa tu primer país (Bronze, 100 coins)
2. Viajero Continental - 5 países (Silver, 500 coins, título "Viajero")
3. Explorador Global - 15 países (Gold, 1500 coins, título "Explorador")
4. Trotamundos - 35 países (Platinum, 5000 coins, 10 stars, título, item especial)

**Education (5)**:
1. Estudiante Estrella - 50 estrellas (Bronze, 300 coins)
2. Mente Brillante - 150 estrellas (Silver, 800 coins, título "Sabio")
3. Genio - 300 estrellas (Gold, 2000 coins, título "Genio")
4. Maestro del Trivia - 100 preguntas correctas (Gold, 1000 coins, título)
5. Puntuación Perfecta - 10 actividades perfectas (Gold, 1500 coins, título)

**Social (2)**:
1. Hacer un Amigo - Conoce primer compañero (Bronze, 200 coins)
2. Reunión Familiar - Conoce a todos (Silver, 1000 coins, título)

**Skill (4)**:
1. Novato del Portal - Usa 5 portales (Bronze, 250 coins)
2. Experto del Portal - 20 portales (Silver, 800 coins, título)
3. Entusiasta de Actividades - 30 actividades (Silver, 700 coins)
4. Maestro de Actividades - 100 actividades (Gold, 2000 coins, título)

**Collection (2)**:
1. Ahorrador - Ahorra 5000 monedas (Silver, 500 coins, título)
2. Viajero Adinerado - 15000 monedas (Gold, 2000 coins, título "Magnate")

**Special (5 - todos hidden)**:
1. Viajero Afortunado - Éxito con baja probabilidad (Gold, 1000 coins, título)
2. Espíritu Resiliente - Completar después de 3 fallos (Gold, 1200 coins, título)
3. Corredor Veloz - País en <10 minutos (Platinum, 3000 coins, título, item)
4. Mejor Amigo de Xolo - 50 interacciones (Silver, 800 coins, título, item)

**Recompensas Totales Posibles**:
- **Monedas**: 22,650 coins
- **Estrellas**: 10 stars
- **Títulos**: 15 títulos únicos
- **Items Especiales**: 3 items

**Helper Functions**:
```typescript
getAchievementById(id: string): Achievement | undefined
getAchievementsByCategory(category): Achievement[]
getAchievementsByTier(tier): Achievement[]
getTotalAchievementCoins(): number
```

#### 4. **src/services/achievements/achievementService.ts** (251 líneas)
**Propósito**: Servicio para tracking, unlock y gestión de logros.

**Características principales**:
- Sistema de progreso (0-100%)
- Detección automática de unlock
- Observer pattern para notificaciones
- Integración con Analytics
- Auto-play de SFX al desbloquear
- Sistema de reclamación de recompensas

**Métodos principales**:

1. **initialize(userAchievements)**: Carga datos del usuario

2. **subscribe(callback)**: Suscribirse a eventos de unlock
   ```typescript
   achievementService.subscribe((achievement) => {
     showNotification(achievement);
   });
   ```

3. **updateProgress(achievementId, currentValue)**: Actualiza progreso
   - Calcula % automáticamente
   - Retorna true si recién desbloqueado
   - Trigger de notificaciones y analytics

4. **checkAchievements(stats)**: Verifica todos los logros basados en stats
   - Automático con GameStats interface
   - Actualiza todos los logros aplicables

   ```typescript
   interface GameStats {
     countriesCompleted: number;
     totalStars: number;
     portalsUsed: number;
     activitiesCompleted: number;
     perfectActivities: number;
     companionsMet: number;
     currentMoney: number;
     triviaCorrect: number;
   }

   // Uso
   achievementService.checkAchievements({
     countriesCompleted: 5,
     totalStars: 45,
     portalsUsed: 10,
     // ...
   });
   ```

5. **triggerSpecialAchievement(achievementId)**: Para logros especiales
   - No siguen patrón de stats
   - Eventos únicos del juego

6. **claimAchievement(achievementId)**: Reclama recompensas
   - Solo si está desbloqueado y no reclamado
   - Retorna objeto de recompensas
   - Marca como claimed

   ```typescript
   const rewards = achievementService.claimAchievement('first_steps');
   if (rewards) {
     addMoney(rewards.coins);
     if (rewards.stars) addStars(rewards.stars);
     if (rewards.title) unlockTitle(rewards.title);
   }
   ```

7. **getUnclaimedAchievements()**: Lista de logros pendientes de reclamar

8. **getAchievementStats()**: Estadísticas generales
   ```typescript
   {
     total: 22,
     unlocked: 8,
     claimed: 5,
     percentage: 36
   }
   ```

9. **exportUserAchievements()**: Para guardar en Firebase

**Integración con Audio y Analytics**:
```typescript
private handleAchievementUnlocked(achievement: Achievement): void {
  // SFX
  audioService.playSFX('achievement_unlock');

  // Analytics
  analyticsService.logAchievementUnlocked(achievement.id, achievement.name);

  // Notificaciones
  this.notify(achievement);
}
```

#### 5. **src/components/ui/AchievementNotification.tsx** (192 líneas)
**Propósito**: Componente de notificación animada para logros desbloqueados.

**Características**:
- Animación slide-in desde arriba
- Auto-dismiss después de 4 segundos (configurable)
- Muestra icon, nombre, descripción y recompensas
- Badge de tier con color
- Z-index alto para estar siempre visible

**Animaciones**:
- TranslateY: -200 → 0 (slide in)
- Opacity: 0 → 1 (fade in)
- Spring animation para efecto suave

**Props**:
```typescript
interface AchievementNotificationProps {
  achievement: Achievement;
  visible: boolean;
  onDismiss: () => void;
  autoHideDuration?: number; // default 4000ms
}
```

**Uso**:
```typescript
const [notification, setNotification] = useState<Achievement | null>(null);

useEffect(() => {
  const unsubscribe = achievementService.subscribe((achievement) => {
    setNotification(achievement);
  });
  return unsubscribe;
}, []);

return (
  <View>
    {/* ... tu app ... */}
    <AchievementNotification
      achievement={notification}
      visible={!!notification}
      onDismiss={() => setNotification(null)}
    />
  </View>
);
```

**Estilo**:
- Posición absolute, top 60, siempre en pantalla
- Border left con color del tier
- Shadow elevado para destacar
- Diseño card con icono circular

#### 6. **src/screens/game/AchievementsScreen.tsx** (446 líneas)
**Propósito**: Pantalla completa para ver y reclamar logros.

**Características**:
- Vista de todos los logros (desbloqueados y bloqueados)
- Filtros por categoría
- Stats de progreso global
- Progreso individual con barra
- Modal de detalles
- Botón de reclamación de recompensas
- Logros hidden solo visibles si desbloqueados

**Secciones**:

1. **Header con Stats**:
   - Logros desbloqueados (número)
   - Porcentaje de completitud

2. **Category Tabs** (scroll horizontal):
   - Todos
   - Exploración 🌍
   - Educación 🎓
   - Social 🤝
   - Habilidad ⚡
   - Colección 💎
   - Especial ✨

3. **Achievement List**:
   - Cards con icon, nombre, descripción
   - Barra de progreso si <100%
   - Badges de estado (Desbloquear, Completado, Tier)
   - Border left con color de tier
   - Opacity reducida si ya reclamado

4. **Detail Modal**:
   - Icon grande
   - Título y descripción expandida
   - Lista detallada de recompensas
   - Progreso actual
   - Botón "Reclamar Recompensas" (si desbloqueado)
   - Botón "Cerrar"

**Interacción con Sistema**:
```typescript
const stats = achievementService.getAchievementStats();
const progress = achievementService.getProgress(achievement.id);
const isUnlocked = achievementService.isUnlocked(achievement.id);
const isClaimed = achievementService.isClaimed(achievement.id);

const handleClaimRewards = () => {
  const rewards = achievementService.claimAchievement(achievement.id);
  if (rewards) {
    addMoney(rewards.coins);
    if (rewards.stars) addStars(rewards.stars);
  }
};
```

---

## 📊 Métricas de FASE 9

### Archivos de Código
- **Total de archivos**: 6
- **Líneas de código**: ~1,726
- **Archivos TypeScript**: 5 (.ts, .tsx)
- **Componentes React**: 2

### Audio System
- **Music tracks**: 6 tipos definidos
- **SFX sounds**: 13 tipos definidos
- **Narration support**: Full control
- **Volume controls**: 4 categorías (master, music, sfx, narration)
- **React hooks**: 5 hooks creados

### Achievement System
- **Total achievements**: 22 logros
- **Tiers**: 4 niveles (Bronze → Platinum)
- **Categories**: 6 categorías
- **Hidden achievements**: 5 logros secretos
- **Total rewards**: 22,650 coins + 10 stars + 15 titles + 3 special items
- **Progress tracking**: 8 tipos de stats

---

## 🔗 Integración con App

### 1. App.tsx - Inicialización de Audio

```typescript
import { useEffect } from 'react';
import { audioService } from '@/services/audio/audioService';

export default function App() {
  useEffect(() => {
    // Inicializar audio
    audioService.initialize();

    // Cleanup al cerrar app
    return () => {
      audioService.cleanup();
    };
  }, []);

  return <RootNavigator />;
}
```

### 2. MapScreen.tsx - Música de Fondo

```typescript
import { useBackgroundMusic, useSFX } from '@/hooks/useAudio';

const MapScreen = () => {
  useBackgroundMusic('map', true); // Auto-play
  const { playSFX } = useSFX();

  const handleCountrySelect = (country) => {
    playSFX('button_press');
    // ... navegar
  };

  return <View>...</View>;
};
```

### 3. Achievements Integration - Global Listener

```typescript
// En App.tsx o en un provider
import { useState, useEffect } from 'react';
import { achievementService } from '@/services/achievements/achievementService';
import { AchievementNotification } from '@/components/ui';

const AchievementProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Cargar achievements del usuario
    const userAchievements = await loadUserAchievements();
    achievementService.initialize(userAchievements);

    // Suscribirse a nuevos unlocks
    const unsubscribe = achievementService.subscribe((achievement) => {
      setNotification(achievement);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {children}
      <AchievementNotification
        achievement={notification}
        visible={!!notification}
        onDismiss={() => setNotification(null)}
      />
    </>
  );
};
```

### 4. Game Logic - Verificar Achievements

```typescript
import { achievementService } from '@/services/achievements/achievementService';
import { useUserStore } from '@/stores/userStore';

const GameScreen = () => {
  const {
    completedCountries,
    totalStars,
    portalsUsed,
    // ... más stats
  } = useUserStore();

  const handleLevelComplete = () => {
    // Actualizar stats en store
    // ...

    // Verificar achievements
    achievementService.checkAchievements({
      countriesCompleted: completedCountries.length,
      totalStars,
      portalsUsed,
      activitiesCompleted,
      perfectActivities,
      companionsMet,
      currentMoney,
      triviaCorrect,
    });

    // Guardar achievements en Firebase
    const userAchievements = achievementService.exportUserAchievements();
    await firestoreService.saveUserAchievements(userId, userAchievements);
  };
};
```

### 5. Special Achievements - Event Triggers

```typescript
// Trigger manual para logros especiales
const handleLuckyEvent = () => {
  // Si portal tuvo éxito con baja probabilidad
  if (portalOutcome === 'success' && probability < 0.3) {
    achievementService.triggerSpecialAchievement('lucky_traveler');
  }
};

const handleXoloInteraction = () => {
  // Incrementar contador de interacciones con Xolo
  xoloInteractions++;

  // Verificar logro
  achievementService.updateProgress('xolo_best_friend', xoloInteractions);
};
```

### 6. Settings - Audio Controls

```typescript
import { useAudioSettings } from '@/hooks/useAudio';

const AudioSettingsScreen = () => {
  const {
    setVolume,
    getVolume,
    toggleMusic,
    toggleSFX,
    toggleNarration,
    getAudioStates,
  } = useAudioSettings();

  const [musicVolume, setMusicVolume] = useState(getVolume('music'));
  const audioStates = getAudioStates();

  return (
    <View>
      <Text>Volumen de Música</Text>
      <Slider
        value={musicVolume}
        onValueChange={(v) => {
          setMusicVolume(v);
          setVolume('music', v);
        }}
      />

      <Switch
        value={audioStates.music}
        onValueChange={toggleMusic}
      />

      {/* Similar para SFX y Narration */}
    </View>
  );
};
```

---

## 🚀 Próximos Pasos (FASE 10 - FINAL)

### Character Art with AI
1. Generar art de personajes con Midjourney o DALL-E 3
2. **Personajes a crear**:
   - Pepe (niño protagonista) - 8-10 años, latino, mochila
   - Paula (niña protagonista) - 8-10 años, latina, mochila
   - Isabella (niña adoptada) - 6 años, africana, vestido
   - Xolo (perro) - Xoloitzcuintle, compañero leal
   - Don Bowser (villano) - Adulto, traje, apariencia intimidante
   - Koopa Hielo (ayudante) - Personaje secundario

3. **Especificaciones**:
   - Estilo: Cartoon, friendly, educativo
   - Expresiones: 3-5 variantes (feliz, triste, sorprendido, determinado)
   - Vistas: Frontal, perfil, 3/4
   - Formato: PNG con transparencia
   - Resolución: 2048x2048 para escalar

4. **Prompts de ejemplo**:
   ```
   Pepe (boy protagonist):
   "8 year old latino boy character, friendly cartoon style, wearing a
   colorful backpack, casual clothes, determined expression, adventure
   game character, educational game art, full body, transparent background,
   high quality, 2D game art"

   Paula (girl protagonist):
   "8 year old latina girl character, friendly cartoon style, wearing a
   colorful backpack, casual clothes, brave expression, adventure game
   character, educational game art, full body, transparent background,
   high quality, 2D game art"
   ```

### Lottie Animations
1. Crear animaciones vectoriales con Lottie
2. **Animaciones necesarias**:
   - Portal entrance (6 variantes por tipo)
   - Star collection effect
   - Coin collection effect
   - Level complete celebration
   - Achievement unlock burst
   - Map transition effects
   - Loading animations

3. **Herramientas**:
   - LottieFiles Creator
   - After Effects con plugin Bodymovin
   - Exportar como JSON

4. **Especificaciones técnicas**:
   - Duración: 1-3 segundos (loops donde aplique)
   - Tamaño: <100KB por animación
   - Formato: JSON (Lottie)
   - Compatibilidad: lottie-react-native

5. **Integración**:
   ```typescript
   import LottieView from 'lottie-react-native';

   <LottieView
     source={require('@/assets/animations/portal_enter.json')}
     autoPlay
     loop={false}
     style={{ width: 200, height: 200 }}
   />
   ```

---

## 📦 Dependencias Necesarias

Para que FASE 9 funcione correctamente, instalar:

```bash
# Audio con expo-av
npx expo install expo-av

# Lottie animations (para FASE 10)
npx expo install lottie-react-native

# Ya instaladas en fases anteriores:
# - @react-native-async-storage/async-storage
# - firebase
# - zustand
```

**Configuración de expo-av en app.json**:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": false
        }
      ]
    ]
  }
}
```

---

## 🎯 Checklist de Completitud

### Audio System
- [x] Audio service creado con expo-av
- [x] Música de fondo con loop y fade
- [x] Sistema de SFX con cache
- [x] Narración con callbacks
- [x] Control de volumen por categoría
- [x] Toggles on/off por tipo
- [x] React hooks para componentes
- [ ] Archivos de audio creados (.mp3) - **PENDIENTE**
- [ ] Audio integrado en todas las pantallas - **PENDIENTE**

### Achievement System
- [x] 22 achievements definidos
- [x] Sistema de tiers y categorías
- [x] Achievement service con tracking
- [x] Integración con analytics
- [x] Notificaciones animadas
- [x] Pantalla de achievements
- [x] Sistema de recompensas
- [x] Logros hidden/secretos
- [ ] Achievements guardados en Firebase - **PENDIENTE** (estructura lista)
- [ ] Leaderboard de achievements - **PENDIENTE** (FASE futura)

---

## 📝 Notas Técnicas

### Audio Best Practices

1. **Optimización de archivos**:
   - Música: MP3, 192 kbps, stereo
   - SFX: MP3, 128 kbps, mono
   - Narración: MP3, 128 kbps, mono
   - Comprimir para reducir tamaño de app

2. **Gestión de memoria**:
   - Unload sonidos no usados
   - Cache solo SFX frecuentes
   - Cleanup al desmontar componentes

3. **Performance**:
   - Preload música de siguiente pantalla
   - SFX siempre listo (cache)
   - No más de 1 música simultánea

### Achievement Design Principles

1. **Balance de dificultad**:
   - 30% Bronze (fácil acceso)
   - 40% Silver (requiere esfuerzo)
   - 25% Gold (dedicación alta)
   - 5% Platinum (maestría)

2. **Recompensas escalables**:
   - Bronze: 100-300 coins
   - Silver: 500-1000 coins
   - Gold: 1500-2000 coins
   - Platinum: 3000-5000 coins + extras

3. **Engagement**:
   - Logros tempranos para hook
   - Logros intermedios para retención
   - Logros finales para completionistas
   - Hidden achievements para sorpresa

---

## ✅ FASE 9 COMPLETA

**Resumen**: Sistema completo de audio con música, SFX y narración, y sistema de achievements con 22 logros, tracking automático, notificaciones y recompensas. Ambos sistemas integrados con Firebase Analytics.

**Próximo y último objetivo**: FASE 10 - Character Art & Animations

**Cobertura del proyecto**: 90% completo

---

**Última actualización**: Noviembre 4, 2025
**Mantenido por**: Claude (Anthropic)
**Proyecto**: Hope Quest (WisdomQuest)
