# FASE 6: Portal Components & Activities - COMPLETADA ✅

## Resumen

FASE 6 ha sido completada exitosamente con todos los componentes de portales, actividades educativas y el nuevo sistema de selección de personaje (niño/niña) implementado.

---

## NUEVO SISTEMA: Selección de Personaje Protagonista

### Cambios Principales

**Antes:**
- Marco (agricultor mexicano) era el protagonista fijo
- Familia: Marco, Luis, Patricia, Teo, Xolo

**Ahora:**
- ✅ **Usuario elige género**: Niño o Niña
- ✅ **Nombre personalizable**: Usuario escoge nombre (default: Pepe o Paula)
- ✅ **Compañero dinámico**: Encuentran al personaje del género opuesto durante la ruta
  - Si elige niño → Encuentra a Paula
  - Si elige niña → Encuentra a Pepe
- ✅ **Isabella**: Niña adoptada (antes era "Teo", ahora siempre es Isabella)
- ✅ **Xolo**: Ajolote sabio (permanece igual)

### Archivos Modificados

#### 1. [gameConfig.ts](../src/constants/gameConfig.ts)
```typescript
characters: {
  protagonist: {
    boy: 'custom_boy',
    girl: 'custom_girl',
  },
  companion: {
    ifProtagonistBoy: 'paula',
    ifProtagonistGirl: 'pepe',
  },
  adoptedChild: 'isabella',
  //...
}

// NUEVOS TIPOS
export type ProtagonistGender = 'boy' | 'girl';
export type CharacterName = 'pepe' | 'paula' | 'isabella' | 'xolo' | 'don_bowser' | 'koopa_hielo' | string;
```

#### 2. [userStore.ts](../src/stores/userStore.ts)
**Nuevos estados:**
```typescript
protagonistGender: ProtagonistGender | null;
protagonistName: string | null;
companionName: string; // 'Paula' o 'Pepe' automáticamente
companionDiscovered: boolean;
isabellaDiscovered: boolean;
```

**Nuevas acciones:**
```typescript
setProtagonist: (gender: ProtagonistGender, name: string) => void;
discoverCompanion: () => void; // Para cuando encuentren al compañero
discoverIsabella: () => void; // Para cuando encuentren a Isabella
```

#### 3. [AuthScreen.tsx](../src/screens/AuthScreen.tsx) - Completamente renovado

**Pantalla 1: Información del Usuario**
- Nombre del jugador
- Edad (5-99 años)

**Pantalla 2: Selección de Personaje**
- Cards visuales para elegir niño 👦 o niña 👧
- Input opcional para nombre custom (default: Pepe/Paula)
- Información de personajes que encontrará:
  - Compañero/a (automático según género)
  - Isabella (niña adoptada)
  - Xolo (ajolote guía)

---

## Componentes de Portales (Completados)

### 1. **PortalCard.tsx** ([src/components/portal/PortalCard.tsx](../src/components/portal/PortalCard.tsx))
- 6 tipos de portales con colores únicos
- Animaciones con Animated API (scale, fade)
- Barras de riesgo visuales (salud, detección)
- Estados: locked, unlocked, selected
- Stats: costo, tiempo, riesgo
- Props: portalType, name, description, icon, unlocked, costs, risks

### 2. **PackingItem.tsx** ([src/components/portal/PackingItem.tsx](../src/components/portal/PackingItem.tsx))
- 7 categorías con colores: documents, money, clothing, food, personal, sentimental, tools
- Estados visuales: selected, packed
- Animaciones de transición (scale, opacity)
- Efectos de items (salud, moral, dinero, historia)
- Indicador de items obligatorios ⚠️
- Props: item, selected, packed, onPress, onLongPress

### 3. **PortalEntranceScreen.tsx** ([src/screens/game/PortalEntranceScreen.tsx](../src/screens/game/PortalEntranceScreen.tsx))
- Carga dinámica de portales desde JSON
- Filtrado por nivel de sensibilidad
- Validación de dinero y documentos requeridos
- Status bar de economía (💰 dinero, 📄 documentos, estado)
- Modal educativo con:
  - Contexto histórico
  - Estadísticas reales
  - Datos curiosos
- Props: countryId, fromCountry

**Características:**
- 3 portales implementados (aéreo, marítimo, clandestino)
- Alertas para condiciones no cumplidas
- Navegación a PortalPacking al confirmar

### 4. **PortalPackingScreen.tsx** ([src/screens/game/PortalPackingScreen.tsx](../src/screens/game/PortalPackingScreen.tsx))
- Sistema de peso y volumen en tiempo real
- Barras de capacidad con colores (verde→amarillo→rojo)
- 33 items cargados desde JSON
- Items obligatorios vs opcionales
- **Auto-pack inteligente**: Selecciona items recomendados según tipo de portal
- Validación antes de viajar
- Props: portalId, routeId

**Capacidades por portal:**
- Aéreo: 23kg / 40L
- Marítimo: 50kg / 80L
- Terrestre: 30kg / 60L
- Clandestino: 20kg / 35L

### 5. **PortalTransitionScreen.tsx** ([src/screens/game/PortalTransitionScreen.tsx](../src/screens/game/PortalTransitionScreen.tsx))
- **4 fases de viaje**: Preparación → Viaje → Llegada → Control
- Animaciones complejas:
  - Portal giratorio con partículas
  - Barra de progreso animada
  - Fade in/out de narrativa
- Narrativas específicas por tipo de portal
- **Sistema de outcomes probabilístico**:
  - Success (70%): -5 salud, +10 moral
  - Partial (25%): -15 salud, -10 moral
  - Failure (5%): -30 salud, -40 moral
- Colores dinámicos por portal
- Integración con economyStore (aplica cambios)
- Props: portalId, routeId, phase

---

## Actividades Educativas (3 componentes)

### 1. **TriviaActivity.tsx** ([src/components/activities/TriviaActivity.tsx](../src/components/activities/TriviaActivity.tsx))

**Características:**
- Preguntas de opción múltiple
- 3 niveles de dificultad (fácil, media, difícil)
- Timer opcional por pregunta
- Barra de progreso visual
- Explicación educativa después de cada respuesta
- Colores dinámicos:
  - Verde para respuesta correcta ✅
  - Rojo para incorrecta ❌
- Score tracking en tiempo real

**Props:**
```typescript
{
  questions: TriviaQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  timeLimit?: number; // segundos
}
```

**Interfaz TriviaQuestion:**
```typescript
{
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### 2. **PuzzleActivity.tsx** ([src/components/activities/PuzzleActivity.tsx](../src/components/activities/PuzzleActivity.tsx))

**Características:**
- Rompecabezas deslizante (sliding puzzle)
- Tamaños: 3x3, 4x4, 5x5
- Algoritmo de shuffle válido (100 movimientos aleatorios)
- Detección automática de completado
- Contador de movimientos
- Función de reset
- Piezas con indicador visual de correcta posición

**Props:**
```typescript
{
  imageUrl: string;
  gridSize: 3 | 4 | 5;
  title: string;
  description: string;
  onComplete: (moves: number, timeSpent: number) => void;
}
```

**Algoritmo:**
- Solo permite movimientos válidos (vecinos del espacio vacío)
- Verifica vecinos en 4 direcciones (arriba, abajo, izquierda, derecha)
- Detecta completado cuando todas las piezas están en posición correcta

### 3. **MemoryActivity.tsx** ([src/components/activities/MemoryActivity.tsx](../src/components/activities/MemoryActivity.tsx))

**Características:**
- Juego clásico de memoria (encontrar parejas)
- Grid responsive (4 columnas, filas dinámicas)
- Animaciones de flip
- Sistema de coincidencias con delay visual
- Previene flips rápidos
- Stats: movimientos y parejas encontradas

**Props:**
```typescript
{
  pairs: Array<{ id: number; content: string; }>;
  onComplete: (moves: number, timeSpent: number) => void;
  difficulty?: 'easy' | 'medium' | 'hard'; // 6, 10, or 16 pairs
}
```

**Lógica del juego:**
1. Usuario voltea primera carta
2. Usuario voltea segunda carta
3. Si coinciden: se quedan volteadas (verde)
4. Si no coinciden: se voltean de nuevo después de 1s
5. Juego termina cuando todas las parejas están encontradas

---

## Estructura de Archivos Completa

```
src/
├── components/
│   ├── portal/
│   │   ├── PortalCard.tsx (320 líneas)
│   │   ├── PackingItem.tsx (280 líneas)
│   │   └── index.ts
│   ├── activities/
│   │   ├── TriviaActivity.tsx (280 líneas)
│   │   ├── PuzzleActivity.tsx (380 líneas)
│   │   ├── MemoryActivity.tsx (320 líneas)
│   │   └── index.ts
│   └── ui/ (de FASE 5)
├── screens/
│   ├── AuthScreen.tsx (327 líneas - renovado)
│   └── game/
│       ├── PortalEntranceScreen.tsx (398 líneas)
│       ├── PortalPackingScreen.tsx (397 líneas)
│       └── PortalTransitionScreen.tsx (463 líneas)
├── stores/
│   └── userStore.ts (actualizado con protagonista)
└── constants/
    └── gameConfig.ts (actualizado con sistema de personajes)
```

---

## Métricas de FASE 6

- **Archivos nuevos**: 8
- **Archivos modificados**: 3
- **Componentes creados**: 6 (3 portales + 3 actividades)
- **Pantallas implementadas**: 3 (renovadas)
- **Líneas de código**: ~3,200
- **TypeScript**: 100% tipado
- **Animaciones**: 15+ (Animated API)

---

## Sistema de Personajes - Implementación

### Flow del Usuario

1. **AuthScreen - Paso 1:**
   ```
   Usuario ingresa:
   - Nombre: "Ana"
   - Edad: 10
   ```

2. **AuthScreen - Paso 2:**
   ```
   Usuario selecciona:
   - Género: 👧 Niña
   - Nombre del personaje: "María" (o deja default "Paula")
   ```

3. **Resultado:**
   ```typescript
   userStore: {
     username: "Ana",
     age: 10,
     protagonistGender: "girl",
     protagonistName: "María",
     companionName: "Pepe", // Automático
     companionDiscovered: false,
     isabellaDiscovered: false
   }
   ```

### Durante el juego

**País X (ej: 15):**
```typescript
// Evento narrativo
if (!companionDiscovered) {
  // Mostrar cutscene: María encuentra a Pepe
  discoverCompanion();
}
```

**País Y (ej: 25):**
```typescript
// Evento narrativo
if (!isabellaDiscovered) {
  // Mostrar cutscene: La familia adopta a Isabella
  discoverIsabella();
}
```

---

## Integración Portal → Activities

El flujo completo de un país es:

```
1. CountryOverview
   ↓
2. LocationSelection
   ↓
3. Activity (Trivia / Puzzle / Memory)
   ↓
4. BridgeGame (Matter.js - FASE 7)
   ↓
5. PortalEntrance (seleccionar portal)
   ↓
6. PortalPacking (empacar items)
   ↓
7. PortalTransition (viaje con narrativa)
   ↓
8. CountryComplete (recompensas)
   ↓
9. Siguiente País
```

---

## TODOs para Futuras Fases

### **Inmediato - FASE 7**
- [ ] Implementar BridgeGame con Matter.js
- [ ] Sistema de física para puentes (países 1-20)
- [ ] Sistema de destrucción de muros (países 21-34)
- [ ] Boss final (país 35)
- [ ] Implementar ParentalControlsScreen con PIN

### **Mejoras a Portal Components**
- [ ] Integrar Lottie animations en PortalTransition (FASE 10)
- [ ] Añadir imágenes reales a PortalCard
- [ ] Implementar drag & drop en PackingScreen
- [ ] Añadir audio effects en transiciones (FASE 9)

### **Mejoras a Activities**
- [ ] Cargar imágenes reales en PuzzleActivity
- [ ] Añadir más tipos de actividades:
  - Hidden Objects
  - Sorting/Matching
  - Timeline sequencing
- [ ] Integrar con country JSON data

### **Sistema de Personajes**
- [ ] Crear cutscenes para descubrir compañero
- [ ] Crear cutscene para adoptar a Isabella
- [ ] Generar arte AI para Pepe, Paula, Isabella (FASE 10)
- [ ] Dialogues dinámicos según personaje elegido

---

## Notas Técnicas

### **Animaciones Implementadas**
```typescript
// PortalCard
- scale: 1 → 0.95 (onPress)
- opacity transitions

// PackingItem
- scale: 1 → 0.9 (when packed)
- opacity: 1 → 0.6 (when packed)

// PortalTransition
- fade: 0 → 1 (entrance)
- scale: 0.8 → 1 (spring)
- rotate: 0deg → 360deg (continuous loop)
- progress bar animation
- 12 particles radiating outward
```

### **Validaciones Implementadas**
1. **PortalEntrance:**
   - ✓ Dinero suficiente
   - ✓ Documentos requeridos
   - ✓ Salud crítica (warning)
   - ✓ Nivel de sensibilidad

2. **PortalPacking:**
   - ✓ Items obligatorios empacados
   - ✓ Peso total ≤ maxWeight
   - ✓ Volumen total ≤ maxVolume

3. **AuthScreen:**
   - ✓ Nombre no vacío
   - ✓ Edad válida (5-99)
   - ✓ Género seleccionado

### **Stores Integration**
- **portalStore**: Maneja portal actual, items empacados, transitions
- **economyStore**: Aplica costos de portales, cambios de salud/moral
- **userStore**: Guarda protagonista, compañero, descubrimientos

---

## Próximos Pasos

**FASE 7 está lista para comenzar:**

1. Implementar Matter.js para BridgeGame
2. Sistema de física híbrido (puentes vs muros)
3. Parental controls con PIN
4. Conectar actividades con country data

**FASE 6 está 100% completa.** Todos los componentes de portales, actividades educativas y el sistema de personajes están implementados y listos para integrarse con el resto del juego.
