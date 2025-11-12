# Sistema de Portales de Migración

## Concepto General

Inspirado en las tuberías de Mario Bros, pero con significado educativo sobre el proceso migratorio. Los portales representan diferentes métodos de transporte y migración entre países.

## Tipos de Portales (Inspirados en Tuberías)

### 1. **Portal Aéreo** (Avión) 🛫
- **Visual**: Túnel circular con nubes y cielo, colores azul/blanco
- **Animación**: El personaje "vuela" a través del portal con efecto de viento
- **Sonido**: Motor de avión, anuncio de aeropuerto
- **Uso**: Migración legal moderna entre países lejanos
- **Países**: Conexiones intercontinentales (México → USA, Brasil → Japón)
- **Costo en juego**: Requiere documentos (visa)

### 2. **Portal Marítimo** (Barco) 🚢
- **Visual**: Túnel ondulado con olas, colores azul océano/verde agua
- **Animación**: Efecto de navegación con balanceo
- **Sonido**: Olas, campana de barco, gaviotas
- **Uso**: Migración histórica (siglo XIX-XX)
- **Países**: Rutas transatlánticas (España → Argentina, Japón → Brasil)
- **Costo en juego**: Más tiempo pero más barato

### 3. **Portal Terrestre** (Tren/Bus) 🚂
- **Visual**: Túnel rectangular con raíles o carretera, colores tierra/verde
- **Animación**: Movimiento lateral con paisajes pasando
- **Sonido**: Traqueteo de tren, bocina de autobús
- **Uso**: Migración dentro del mismo continente
- **Países**: Rutas continentales (México → USA, Siria → Turquía)
- **Costo en juego**: Medio

### 4. **Portal Clandestino** (Ruta peligrosa) ⚠️
- **Visual**: Túnel oscuro, agrietado, inestable, colores grises/negros
- **Animación**: Movimiento errático, pantalla sacudiéndose
- **Sonido**: Latidos acelerados, respiración agitada
- **Uso**: Cuando no hay opción legal (usado en narrativa, no glorificado)
- **Países**: Rutas de crisis (Centroamérica → USA, África → Europa)
- **Costo en juego**: Peligroso, puede fallar, requiere mini-juego de supervivencia
- **Sensibilidad**: Nivel 4-5, requiere control parental

### 5. **Portal Refugiado** (Convoy humanitario) 🏕️
- **Visual**: Túnel con banderas de ONU/Cruz Roja, colores blanco/azul
- **Animación**: Movimiento lento pero seguro
- **Sonido**: Radio de emergencia, voces de ayuda
- **Uso**: Escapando de guerra o persecución
- **Países**: Zonas de conflicto → países de acogida
- **Costo en juego**: Gratuito pero requiere demostrar necesidad

### 6. **Portal Familiar** (Reunificación) 👨‍👩‍👧‍👦
- **Visual**: Túnel cálido con fotos familiares flotando, colores dorados/rosa
- **Animación**: Efecto de "ser atraído" por el amor familiar
- **Sonido**: Voces de familia llamando, música emotiva
- **Uso**: Cuando un familiar ya está en el país destino
- **Países**: Reunificación familiar (cualquier combinación)
- **Costo en juego**: Requiere tener contacto familiar en destino

## Mecánica de Juego

### Flujo de Uso

1. **Descubrimiento**: Al completar un país, se revela el portal de salida
2. **Selección**: El jugador puede elegir qué tipo de portal usar (si hay opciones)
3. **Preparación**: Mini-juego de "empacar" (¿qué llevar? ¿qué dejar?)
4. **Viaje**: Animación del portal con contenido educativo
5. **Llegada**: Mini-escena de llegada al nuevo país

### Contenido Educativo Durante el Viaje

Mientras el personaje está "en el portal", se muestra:

- **Datos curiosos** sobre el método de transporte
- **Estadísticas** de migración entre esos países
- **Historia personal** de un migrante real (testimonios breves)
- **Pregunta de reflexión** para el jugador
- **Preparación cultural** para el nuevo país

### Sistema de Decisiones

Algunos portales requieren decisiones:

```
Portal Aéreo disponible
├─ Opción A: Visa de turista ($500, 6 meses)
├─ Opción B: Visa de trabajo ($1200, 2 años, requiere oferta laboral)
└─ Opción C: Solicitar asilo (gratis, proceso largo, incierto)

¿Qué eliges?
```

## Representación Visual

### Estructura del Portal

```
   [ENTRADA]
       ║
   ┌───╨───┐
   │ TÚNEL │  ← Parte animada (efecto de movimiento)
   │       │
   │ INFO  │  ← Contenido educativo flotante
   │       │
   │ TÚNEL │
   └───╥───┘
       ║
    [SALIDA]
```

### Animación de Entrada

1. Personaje corre hacia el portal
2. Portal brilla y se expande
3. Personaje es "absorbido" con efecto de espiral
4. Pantalla hace transición al interior del túnel
5. Viaje (5-10 segundos con contenido educativo)
6. Salida en el nuevo país con animación de "llegada"

### Estados del Portal

- **Bloqueado**: Gris, con candado (requiere completar país anterior)
- **Disponible**: Brillante, animación pulsante
- **Inaccesible**: Rojo, con X (no tienes documentos/dinero necesarios)
- **Activo**: Girando, esperando al jugador
- **En uso**: Animación completa de viaje

## Elementos Educativos

### Datos Mostrados Durante el Viaje

**Ejemplo: Portal Marítimo (España → Argentina)**

```
════════════════════════════════════
   🌊 Viaje Transatlántico 🚢
════════════════════════════════════

📊 SABÍAS QUE...
Entre 1880-1930, más de 6 millones de
españoles e italianos emigraron a Argentina
en barcos como este.

⏱️ DURACIÓN: 15-20 días de viaje
💰 COSTO: 3 meses de salario promedio
🎒 PERMITIDO: 1 maleta de 20kg

────────────────────────────────────
TESTIMONIO:
"Dejé mi aldea en Galicia con 17 años.
El barco estaba lleno de familias con
esperanza y miedo. Dormíamos 200 personas
en la bodega. Pero valió la pena."
- María R., emigrante española, 1912
────────────────────────────────────

🤔 REFLEXIÓN:
Si tuvieras que dejar tu país,
¿qué tres cosas llevarías contigo?

════════════════════════════════════
```

### Mini-Juego: "Empacar para el Viaje"

Antes de entrar al portal, juego rápido tipo "inventory management":

- **Espacio limitado**: Solo puedes llevar X kg
- **Opciones**:
  - 📸 Fotos familiares (0.2kg, +10 moral)
  - 💰 Dinero ahorrado (0.5kg, necesario)
  - 📄 Documentos (0.1kg, OBLIGATORIO)
  - 🍲 Comida de casa (2kg, +5 moral, -espacio)
  - 👔 Ropa extra (3kg, necesario para clima nuevo)
  - 📱 Teléfono (0.3kg, +comunicación)
  - 📚 Libro favorito (0.5kg, +10 moral)
  - 🎸 Instrumento musical (4kg, +cultura, -espacio)

Decisiones difíciles que reflejan la realidad migratoria.

## Sistema de Riesgo

### Portal Clandestino - Mini-Juego de Supervivencia

**IMPORTANTE**: Este contenido es sensible (nivel 4-5) y requiere:
- Control parental activado
- Contexto educativo claro
- No glorificación, sino concientización
- Mensaje de esperanza al final

**Mecánica**:
1. **Esquivar obstáculos**: Patrullas, barreras naturales
2. **Gestionar recursos**: Agua, energía, moral
3. **Tomar decisiones**: ¿Ayudar a otro migrante? ¿Arriesgar o esperar?
4. **Resultado**: Éxito (llegada), Fracaso parcial (deportación → reintento), Ayuda humanitaria (rescate)

**Mensaje educativo**:
```
════════════════════════════════════
Este camino fue peligroso.

Miles de personas reales toman rutas
así porque NO tienen otra opción.

No es una aventura. Es supervivencia.

Todos merecen una forma segura de
migrar y buscar una vida mejor.

🕊️ Nadie debería tener que arriesgar
   su vida por buscar seguridad.
════════════════════════════════════
```

## Implementación Técnica

### Archivos Necesarios

1. `src/types/portals.ts` - Definiciones TypeScript
2. `src/components/migration/PortalEntrance.tsx` - Componente de entrada
3. `src/components/migration/PortalTransition.tsx` - Animación de viaje
4. `src/components/migration/PackingGame.tsx` - Mini-juego de empacar
5. `src/data/portals/portalDefinitions.json` - Datos de todos los portales
6. `src/data/portals/portalRoutes.json` - Rutas entre países
7. `src/animations/portals/*.json` - Animaciones Lottie

### Stack Técnico

- **Animaciones**: Lottie (JSON) + React Native Reanimated
- **Física**: Matter.js (para efectos de "absorción" y "expulsión")
- **Transiciones**: React Navigation con transiciones custom
- **Sonido**: react-native-sound para efectos de audio
- **Partículas**: react-native-particles para efectos visuales

## Progresión

### Desbloqueo de Portales

- **País 1-5**: Solo Portal Terrestre
- **País 6-10**: Desbloqueo Portal Marítimo
- **País 11-15**: Desbloqueo Portal Aéreo
- **País 16-20**: Desbloqueo Portal Familiar
- **País 21-30**: Desbloqueo Portal Refugiado (contextual)
- **País 31-35**: Todos disponibles, elección estratégica

### Costos Dinámicos

```javascript
const portalCost = {
  aereo: {
    money: 500,
    documents: ['passport', 'visa'],
    time: 1 // día en juego
  },
  maritimo: {
    money: 200,
    documents: ['passport'],
    time: 15 // días en juego
  },
  terrestre: {
    money: 100,
    documents: ['id'],
    time: 3 // días en juego
  },
  clandestino: {
    money: 300, // "coyote"
    documents: [],
    time: 7,
    risk: 0.3 // 30% fallo
  },
  refugiado: {
    money: 0,
    documents: ['refugee_status'],
    time: 30, // proceso largo
    requirement: 'persecution_proof'
  },
  familiar: {
    money: 300,
    documents: ['family_proof', 'sponsor_letter'],
    time: 10
  }
}
```

## Diseño de Arte (Prompts para AI)

### Portal Aéreo
```
"Isometric view of a circular portal made of blue sky and white clouds,
airplane contrails forming a spiral entrance, modern airport aesthetic,
soft lighting, Pixar style, hopeful atmosphere, 3D render"
```

### Portal Marítimo
```
"Isometric view of an oval portal made of ocean waves and foam,
wooden ship planks forming the frame, seagulls flying around,
vintage nautical aesthetic, sunset lighting, Pixar style, adventurous mood"
```

### Portal Terrestre
```
"Isometric view of a rectangular portal made of train tracks and road signs,
desert landscape visible through it, warm earth tones,
dust particles in the air, Pixar style, journey atmosphere"
```

### Portal Clandestino
```
"Isometric view of a cracked, unstable portal, dark tunnel with dim light,
barbed wire visible, stormy atmosphere, muted dark colors,
Pixar style but serious tone, not scary but somber"
```

## Narrativa Integrada

Cada portal tiene diálogos contextuales:

**Ejemplo: Primera vez usando Portal Aéreo**

```javascript
{
  character: "luis",
  dialogue: {
    es: "¡Marco, mira! Un avión... nunca había volado. ¿Tú sí?",
    en: "Marco, look! An airplane... I've never flown. Have you?"
  }
},
{
  character: "marco",
  dialogue: {
    es: "No, hermano. Será nuestra primera vez. Papá siempre soñó con volar... Esto es por él.",
    en: "No, brother. It'll be our first time. Dad always dreamed of flying... This is for him."
  }
},
{
  character: "xolo",
  dialogue: {
    es: "Cada viaje es un salto de fe. Respiren profundo, familia. El futuro nos espera al otro lado.",
    en: "Every journey is a leap of faith. Breathe deep, family. The future awaits us on the other side."
  }
}
```

## Accesibilidad

- **Modo simplificado**: Sin mini-juegos de riesgo, solo transiciones educativas
- **Control parental**: Desactivar portales clandestinos y contenido sensible
- **Velocidad de lectura**: Ajustar tiempo de contenido educativo
- **Audio-descripción**: Narración de todos los textos mostrados

## Métricas Educativas

Track para los maestros (versión escolar):

- ¿Qué portales eligió el estudiante? (¿Por qué?)
- ¿Qué dejó en el mini-juego de empacar?
- ¿Leyó el contenido educativo completo?
- ¿Respondió las preguntas de reflexión?
- Tiempo promedio en cada tipo de portal

## Próximos Pasos de Implementación

1. ✅ Documento de diseño (este archivo)
2. ⏳ Definir tipos TypeScript
3. ⏳ Crear estructura de datos JSON
4. ⏳ Implementar componentes React Native
5. ⏳ Crear animaciones Lottie
6. ⏳ Integrar con sistema de países existente
7. ⏳ Pruebas de jugabilidad
8. ⏳ Ajustes basados en feedback

---

**Nota importante**: Este sistema convierte una mecánica divertida (tuberías de Mario) en una herramienta educativa profunda sobre migración, manteniendo el espíritu lúdico pero añadiendo significado y empatía.
