# Hope Quest - Lottie Animations Guide 🎬

**Proyecto**: Hope Quest (WisdomQuest)
**Propósito**: Guía completa para crear animaciones Lottie para el juego
**Fecha**: Noviembre 4, 2025

---

## 📋 Animaciones Necesarias

### Categorías
1. **Portal Animations** - Transiciones entre países
2. **Collection Effects** - Recolección de monedas y estrellas
3. **Celebration Animations** - Completar niveles y logros
4. **UI Feedback** - Loading, success, error
5. **Character Effects** - Apariciones y reacciones

**Total**: 15-20 animaciones

---

## 🎨 Especificaciones Técnicas Generales

### Formato
- **Formato**: JSON (Lottie)
- **Framework**: Bodymovin plugin (After Effects) o LottieFiles Creator
- **Versión**: Lottie 5.7+
- **Tamaño de archivo**: <100KB por animación (idealmente <50KB)

### Rendimiento
- **Duración**: 1-3 segundos (2s promedio)
- **Frame rate**: 30fps o 60fps
- **Dimensiones**: 512x512px o 1024x1024px
- **Shapes**: Preferir shapes sobre paths cuando sea posible
- **Layers**: Máximo 20-30 layers por animación

### Estilo Visual
- **Tipo**: Flat design, vectorial, minimalista
- **Colores**: Según paleta del juego (vibrant pero no saturado)
- **Movimiento**: Smooth easing, principios de animación Disney
- **Efectos**: Preferir escalado y rotación sobre motion blur

---

## 🌀 1. PORTAL ANIMATIONS (6 tipos)

### 1.1 Portal Aéreo (Avión)
**Nombre**: `portal_aereo.json`
**Duración**: 2 segundos
**Loop**: No (one-shot)

**Descripción**:
- Avión aparece desde la derecha
- Sube en diagonal hacia arriba-izquierda
- Deja estela de nubes
- Fade out al final

**Elementos**:
- Avión simplificado (silueta)
- 3-4 nubes detrás
- Efecto de velocidad con líneas

**Colores**: Azul cielo (#4A90E2), blanco (#FFFFFF), gris claro (#E0E0E0)

**Keyframes**:
- 0s: Avión fuera de frame (derecha)
- 0.3s: Avión entra con ease-out
- 1.5s: Avión cruza center
- 2s: Avión sale por izquierda con fade

**LottieFiles search**: "airplane flying", "plane travel animation"

---

### 1.2 Portal Marítimo (Barco)
**Nombre**: `portal_maritimo.json`
**Duración**: 2.5 segundos
**Loop**: No

**Descripción**:
- Barco navega de izquierda a derecha
- Olas ondulantes debajo
- Pequeñas gotas de agua
- Fade out al final

**Elementos**:
- Barco simplificado
- 2-3 olas animadas
- Gotas de agua (particles)

**Colores**: Azul marino (#2E5C8A), azul claro (#5DADE2), blanco (#FFFFFF)

**Keyframes**:
- 0s: Barco y olas en posición inicial
- 0.5-2s: Movimiento ondulante continuo
- 2.5s: Fade out

**LottieFiles search**: "boat sailing", "ship ocean animation"

---

### 1.3 Portal Terrestre (Autobús/Carretera)
**Nombre**: `portal_terrestre.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Autobús cruza horizontalmente
- Carretera con líneas pasando
- Nubes de polvo
- Fade out

**Elementos**:
- Autobús lateral simplificado
- Líneas de carretera
- Nube de polvo detrás

**Colores**: Marrón tierra (#8B7355), gris carretera (#787878), amarillo (#F39C12)

**Keyframes**:
- 0s: Bus fuera de frame
- 0.3s: Bus entra
- 1.5s: Bus cruza
- 2s: Bus sale con fade

**LottieFiles search**: "bus travel", "road trip animation"

---

### 1.4 Portal Clandestino (Sombra/Túnel)
**Nombre**: `portal_clandestino.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Silueta de persona caminando
- Túnel oscuro con luz al final
- Efecto de misterio (sin ser aterrador)

**Elementos**:
- Silueta humana simple
- Círculo de luz al fondo
- Efecto de sombras

**Colores**: Gris oscuro (#5A5A5A), negro (#2C2C2C), luz cálida (#FFA726)

**IMPORTANTE**: Diseño sensible, no aterrador, apropiado para niños.

**Keyframes**:
- 0s: Túnel oscuro, figura al fondo
- 1s: Figura avanza hacia luz
- 2s: Fade to white (luz)

**LottieFiles search**: "tunnel walk", "silhouette walking light"

---

### 1.5 Portal Refugiado (Tienda/Campo)
**Nombre**: `portal_refugiado.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Tienda de campaña aparece
- Bandera ondeando
- Efecto de esperanza (sunrise/colores cálidos)

**Elementos**:
- Tienda simplificada
- Bandera u objeto de esperanza
- Sol o luz de fondo

**Colores**: Naranja esperanza (#E8A03A), beige (#F5DEB3), amarillo (#FFD700)

**IMPORTANTE**: Diseño sensible, enfoque en esperanza no en sufrimiento.

**Keyframes**:
- 0s: Escena vacía
- 0.5s: Tienda aparece (scale up)
- 1.5s: Bandera ondea
- 2s: Sol sube en fondo

**LottieFiles search**: "tent camping", "hope sunrise"

---

### 1.6 Portal Familiar (Corazón/Reunión)
**Nombre**: `portal_familiar.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Corazón palpitante
- Siluetas de familia reuniéndose
- Efecto cálido y emotivo

**Elementos**:
- Corazón central
- 2-3 figuras humanas simplificadas
- Efecto de abrazo (círculo que los une)

**Colores**: Rojo/Rosa (#E27D60), naranja cálido (#F4A460), amarillo (#FFE5B4)

**Keyframes**:
- 0s: Figuras separadas
- 1s: Figuras se acercan
- 1.5s: Corazón aparece y crece
- 2s: Abrazo completo

**LottieFiles search**: "family reunion", "heart love animation"

---

## ⭐ 2. COLLECTION EFFECTS

### 2.1 Star Collection
**Nombre**: `star_collect.json`
**Duración**: 1 segundo
**Loop**: No

**Descripción**:
- Estrella aparece pequeña
- Crece con rotation
- Partículas de brillo alrededor
- Fade out con scale

**Elementos**:
- Estrella de 5 puntas
- 8-10 partículas pequeñas alrededor
- Efecto de glow

**Colores**: Amarillo dorado (#FFD700), amarillo claro (#FFF9C4), blanco (#FFFFFF)

**Keyframes**:
- 0s: Scale 0, rotation 0°
- 0.3s: Scale 1.2, rotation 180°, particles expand
- 0.7s: Scale 1, rotation 360°
- 1s: Fade out

**LottieFiles search**: "star collect", "coin collect effect"

---

### 2.2 Coin Collection
**Nombre**: `coin_collect.json`
**Duración**: 1 segundo
**Loop**: No

**Descripción**:
- Moneda gira y sube
- Brillo dorado
- Desaparece arriba

**Elementos**:
- Moneda circular
- Efecto de shine
- Path curvo hacia arriba

**Colores**: Dorado (#FFB300), amarillo (#FDD835), naranja (#FF9800)

**Keyframes**:
- 0s: Moneda en posición inicial
- 0.5s: Giro 360° + movimiento en Y
- 1s: Fade out arriba

**LottieFiles search**: "coin spin collect"

---

## 🎉 3. CELEBRATION ANIMATIONS

### 3.1 Level Complete
**Nombre**: `level_complete.json`
**Duración**: 2.5 segundos
**Loop**: No

**Descripción**:
- Confeti cayendo
- Estrellas apareciendo
- Texto "¡Completado!" o checkmark grande
- Colores vibrantes

**Elementos**:
- Confeti (20-30 pieces)
- 3 estrellas en secuencia
- Checkmark o trophy icon
- Burst effect

**Colores**: Multicolor (azul, rojo, amarillo, verde, morado)

**Keyframes**:
- 0s: Burst desde center
- 0-1s: Confeti cae con gravity
- 0.5s: Estrellas aparecen
- 1-2.5s: Confeti continúa, fade out

**LottieFiles search**: "confetti celebration", "level complete"

---

### 3.2 Achievement Unlock
**Nombre**: `achievement_unlock.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Burst de luz
- Trophy o medal aparece
- Partículas doradas
- Scale y rotation

**Elementos**:
- Trophy/medal central
- Burst rays desde centro
- Partículas flotando

**Colores**: Dorado (#FFD700), amarillo (#FFF176), blanco (#FFFFFF)

**Keyframes**:
- 0s: Burst comienza
- 0.3s: Trophy aparece con scale
- 1s: Trophy gira levemente
- 1.5s: Partículas flotan
- 2s: Fade out

**LottieFiles search**: "trophy unlock", "achievement badge"

---

### 3.3 Perfect Score
**Nombre**: `perfect_score.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- "100" o "PERFECT" aparece
- Efecto de arco iris o shimmer
- Estrellas girando

**Elementos**:
- Texto/número grande
- Rainbow gradient effect
- 5 estrellas alrededor

**Colores**: Arco iris (gradient multicolor)

**LottieFiles search**: "perfect score", "100 percent animation"

---

## 💫 4. UI FEEDBACK ANIMATIONS

### 4.1 Loading Spinner
**Nombre**: `loading.json`
**Duración**: 2 segundos
**Loop**: Sí (infinito)

**Descripción**:
- Spinner circular
- Smooth rotation
- Diseño simple y elegante

**Elementos**:
- Círculo con gap
- Rotation continua

**Colores**: Azul primario (#4A90E2), gradiente opcional

**Keyframes**:
- 0s: Rotation 0°
- 2s: Rotation 360° (loop)

**LottieFiles search**: "loading spinner simple"

---

### 4.2 Success Checkmark
**Nombre**: `success.json`
**Duración**: 1 segundo
**Loop**: No

**Descripción**:
- Checkmark dibujándose
- Círculo verde alrededor
- Efecto de aprobación

**Elementos**:
- Checkmark path
- Círculo de fondo
- Scale effect

**Colores**: Verde éxito (#2ECC71), verde claro (#A9DFBF)

**Keyframes**:
- 0s: Círculo aparece
- 0.3s: Checkmark se dibuja (path animation)
- 0.7s: Scale 1.1
- 1s: Scale 1

**LottieFiles search**: "success checkmark"

---

### 4.3 Error/Failure
**Nombre**: `error.json`
**Duración**: 1 segundo
**Loop**: No

**Descripción**:
- X roja dibujándose
- Shake effect suave
- No debe ser agresivo

**Elementos**:
- X path
- Círculo rojo
- Shake animation

**Colores**: Rojo error (#E74C3C), rosa claro (#F5B7B1)

**Keyframes**:
- 0s: Círculo aparece
- 0.3s: X se dibuja
- 0.5-0.8s: Shake suave (2-3 oscilaciones)
- 1s: Stop

**LottieFiles search**: "error cross animation"

---

## 👥 5. CHARACTER EFFECTS

### 5.1 Character Appear
**Nombre**: `character_appear.json`
**Duración**: 1.5 segundos
**Loop**: No

**Descripción**:
- Personaje aparece con fade y scale
- Sparkles alrededor
- Efecto de introducción

**Elementos**:
- Shape placeholder (círculo/silueta)
- Partículas de luz
- Scale animation

**Colores**: Depende del contexto, partículas blancas/amarillas

**Keyframes**:
- 0s: Scale 0, opacity 0
- 0.5s: Scale 1.2, opacity 1, sparkles expand
- 1s: Scale 1
- 1.5s: Sparkles fade

**LottieFiles search**: "character appear sparkle"

---

### 5.2 Companion Meet
**Nombre**: `companion_meet.json`
**Duración**: 2 segundos
**Loop**: No

**Descripción**:
- Dos siluetas acercándose
- Corazón o estrella aparece entre ellos
- Efecto de amistad

**Elementos**:
- 2 círculos/siluetas
- Corazón central
- Partículas de conexión

**Colores**: Cálidos (naranja, rosa, amarillo)

**Keyframes**:
- 0s: Figuras separadas
- 1s: Figuras se acercan
- 1.5s: Corazón aparece
- 2s: Efecto completo

**LottieFiles search**: "friendship meet animation"

---

## 🛠️ Herramientas de Creación

### 1. LottieFiles Creator (Web - Gratis)
**URL**: https://lottiefiles.com/creator
**Pros**:
- No requiere After Effects
- Interface simple drag-and-drop
- Export directo a JSON
- Preview en tiempo real
- Librería de assets

**Cons**:
- Menos potente que After Effects
- Limitado en efectos complejos

**Recomendado para**: Animaciones simples (loading, success, error)

---

### 2. After Effects + Bodymovin (Profesional)
**Requerimientos**:
- Adobe After Effects
- Plugin Bodymovin

**Pros**:
- Control total
- Efectos avanzados
- Profesional

**Cons**:
- Curva de aprendizaje
- Software de pago

**Recomendado para**: Animaciones complejas (portales, celebrations)

**Tutorial básico**:
1. Crear animación en AE
2. Instalar plugin Bodymovin
3. Window → Extensions → Bodymovin
4. Seleccionar composition
5. Export as JSON

---

### 3. LottieFiles Library (Uso de plantillas)
**URL**: https://lottiefiles.com/
**Método**:
1. Buscar animaciones similares
2. Descargar JSON
3. Personalizar colores y timing con LottieFiles Editor
4. Export

**Recomendado para**: Prototipado rápido

---

## 📦 Integración en React Native

### Instalación
```bash
npx expo install lottie-react-native
```

### Uso Básico
```typescript
import LottieView from 'lottie-react-native';
import { useRef, useEffect } from 'react';

const AnimationComponent = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Auto-play
    animationRef.current?.play();

    // Or play with specific frames
    // animationRef.current?.play(30, 120);
  }, []);

  return (
    <LottieView
      ref={animationRef}
      source={require('@/assets/animations/star_collect.json')}
      autoPlay
      loop={false}
      style={{ width: 200, height: 200 }}
      onAnimationFinish={() => console.log('Animation finished')}
    />
  );
};
```

### Hook Personalizado
```typescript
// src/hooks/useLottieAnimation.ts
import { useRef, useCallback } from 'react';
import LottieView from 'lottie-react-native';

export function useLottieAnimation() {
  const animationRef = useRef<LottieView>(null);

  const play = useCallback(() => {
    animationRef.current?.play();
  }, []);

  const reset = useCallback(() => {
    animationRef.current?.reset();
  }, []);

  const pause = useCallback(() => {
    animationRef.current?.pause();
  }, []);

  return { animationRef, play, reset, pause };
}
```

### Componente Reutilizable
```typescript
// src/components/ui/LottieAnimation.tsx
import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

interface LottieAnimationProps {
  animation: any; // require() source
  size?: number;
  loop?: boolean;
  autoPlay?: boolean;
  onFinish?: () => void;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animation,
  size = 150,
  loop = false,
  autoPlay = true,
  onFinish,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LottieView
        source={animation}
        autoPlay={autoPlay}
        loop={loop}
        style={styles.lottie}
        onAnimationFinish={onFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
```

---

## 📊 Organización de Archivos

```
assets/
  animations/
    portals/
      portal_aereo.json
      portal_maritimo.json
      portal_terrestre.json
      portal_clandestino.json
      portal_refugiado.json
      portal_familiar.json
    collections/
      star_collect.json
      coin_collect.json
    celebrations/
      level_complete.json
      achievement_unlock.json
      perfect_score.json
    ui/
      loading.json
      success.json
      error.json
    characters/
      character_appear.json
      companion_meet.json
```

---

## 🎯 Checklist de Animaciones

### Portal Animations (6)
- [ ] Portal Aéreo
- [ ] Portal Marítimo
- [ ] Portal Terrestre
- [ ] Portal Clandestino
- [ ] Portal Refugiado
- [ ] Portal Familiar

### Collection Effects (2)
- [ ] Star Collection
- [ ] Coin Collection

### Celebration Animations (3)
- [ ] Level Complete
- [ ] Achievement Unlock
- [ ] Perfect Score

### UI Feedback (3)
- [ ] Loading Spinner
- [ ] Success Checkmark
- [ ] Error/Failure

### Character Effects (2)
- [ ] Character Appear
- [ ] Companion Meet

**Total: 16 animaciones**

---

## 💡 Tips de Optimización

### Reducir Tamaño de Archivo
1. Simplificar paths (menos puntos)
2. Reducir número de layers
3. Evitar effects pesados (blur, glow) cuando sea posible
4. Usar shapes en lugar de bitmaps
5. Comprimir JSON con herramientas online

### Rendimiento
1. No más de 2-3 animaciones simultáneas
2. Unmount cuando no esté visible
3. Usar `useNativeDriver` donde sea posible
4. Test en dispositivos low-end

### Accesibilidad
1. Proveer opción de "reducir animaciones"
2. No depender solo de animaciones para comunicar información
3. Usar animaciones que no causen mareos

---

## 🔗 Recursos Útiles

### LottieFiles
- **Explorar**: https://lottiefiles.com/featured
- **Editor**: https://lottiefiles.com/editor
- **Creator**: https://lottiefiles.com/creator
- **Plugins**: https://lottiefiles.com/plugins

### Tutorials
- **After Effects Basics**: YouTube "Lottie Animation Tutorial"
- **LottieFiles Creator**: Documentación oficial
- **React Native Integration**: lottie-react-native docs

### Inspiración
- **Dribbble**: Buscar "lottie animation"
- **Behance**: Motion design projects
- **LottieFiles Showcase**: Featured animations

---

**Última actualización**: Noviembre 4, 2025
**Proyecto**: Hope Quest (WisdomQuest)
