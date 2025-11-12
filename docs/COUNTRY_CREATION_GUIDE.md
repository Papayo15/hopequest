# 🌍 Guía Completa de Creación de Países - Hope Quest

Esta guía te ayudará a crear los **30 países restantes** (actualmente tenemos 6/35 completados).

---

## 📋 Índice

1. [Estructura General](#estructura-general)
2. [85% Contenido Carmen Sandiego](#contenido-carmen-sandiego)
3. [15% Contenido de Migración](#contenido-de-migración)
4. [Sistema de Sensibilidad (1-5)](#sistema-de-sensibilidad)
5. [Mecánicas de Juego](#mecánicas-de-juego)
6. [Investigación y Fuentes](#investigación-y-fuentes)
7. [Checklist de Creación](#checklist-de-creación)
8. [Ejemplos por Continente](#ejemplos-por-continente)

---

## 1. Estructura General

Cada país es un archivo JSON con esta estructura:

```json
{
  "id": "nombre_pais",
  "name": { LocalizedString en 5 idiomas },
  "continent": "americas|europe|asia|africa|oceania",
  "difficulty": 1|2|3,
  "order": 1-35,

  "culturalObject": { ... },
  "adventure": { ... },
  "bridgeBuilding": { ... },
  "familyDialogue": [ ... ],
  "metadata": { ... }
}
```

### Países por Orden y Modo

**Países 1-20: BUILD MODE** (Construir puentes)
- Marco + familia construyen puentes sobre obstáculos
- Materiales: wood_plank, rope, steel_beam
- Dificultad progresiva (gaps más anchos)

**Países 21-34: DESTROY MODE** (Destruir muros)
- Marco + familia destruyen muros de injusticia
- 4 tipos de muros: prejudice, bureaucracy, border, misinformation
- Capas: 3-6 dependiendo del país

**País 35: BOSS BATTLE**
- Castillo de Don Bowser
- Modo destroy épico
- Bowser se redime al final

---

## 2. 85% Contenido Carmen Sandiego

### 2.1 Cultural Object (Objeto Cultural)

El "tesoro" que Marco encuentra en cada país.

**Criterios de selección:**
- ✅ Icónico del país
- ✅ Relacionado con migración/viajes si es posible
- ✅ Fácil de visualizar para niños
- ✅ Tiene historia interesante

**Ejemplos:**
- 🇲🇽 México: Sombrero de charro (viajeros)
- 🇧🇷 Brasil: Berimbau (resistencia afrobrasileña)
- 🇪🇸 España: Zapato del emigrante
- 🇯🇵 Japón: Omamori del viajero
- 🇪🇬 Egipto: Papiro del refugiado (Éxodo)
- 🇦🇺 Australia: Boomerang (siempre regresa)

**Template:**
```json
"culturalObject": {
  "id": "objeto_unico",
  "name": {
    "es": "Nombre en español",
    "en": "Name in English",
    "zh": "中文名称",
    "hi": "हिंदी में नाम",
    "ar": "الاسم بالعربية"
  },
  "description": {
    "es": "Descripción del objeto (2-3 oraciones). Explicar qué es y su significado simbólico.",
    "en": "Object description (2-3 sentences). Explain what it is and its symbolic meaning."
  },
  "funFact": {
    "es": "¡Un dato curioso fascinante sobre el objeto o su historia!",
    "en": "A fascinating fun fact about the object or its history!"
  },
  "image": "objects/pais_objeto.png",
  "model3D": "objects/pais_objeto.glb"
}
```

### 2.2 Adventure Mode - Locations

Cada país tiene **2-3 locaciones** con elementos interactivos.

**Estructura típica:**
1. **Capital/Ciudad Principal**: Plaza, monumentos, barrios
2. **Sitio Natural/Histórico**: Montaña, río, sitio arqueológico
3. **Región Cultural** (opcional): Pueblo, mercado, zona especial

**Por cada locación incluir:**
- 2-4 **Interactive Elements** (monumentos, objetos, personajes)
- 1 **Activity** educativa (trivia, puzzle, memory, etc.)
- **Migration Content** (si aplica en esa locación)

**Template de Location:**
```json
{
  "id": "ciudad_nombre",
  "name": {
    "es": "Nombre Ciudad",
    "en": "City Name"
  },
  "background": "backgrounds/pais_ciudad.jpg",
  "interactiveElements": [
    {
      "id": "monumento_1",
      "type": "monument",
      "name": { "es": "...", "en": "..." },
      "position": { "x": 400, "y": 300 },
      "fact": {
        "es": "Dato fascinante sobre el monumento (2-3 oraciones).",
        "en": "Fascinating fact about the monument (2-3 sentences)."
      },
      "image": "monuments/monumento.png",
      "sound": "sfx/discovery.mp3"
    }
  ],
  "activity": {
    "id": "pais_activity_1",
    "type": "trivia|puzzle|memory|...",
    "config": { ... }
  }
}
```

### 2.3 Activities (Actividades)

**10 tipos disponibles:**

| Tipo | Descripción | Dificultad | Recomendado para |
|------|-------------|------------|------------------|
| **trivia** | Preguntas de opción múltiple | ⭐ | Conceptos clave |
| **puzzle** | Armar imagen (4-20 piezas) | ⭐⭐ | Monumentos |
| **memory** | Emparejar cartas (6-16 pares) | ⭐ | Cultura, comida |
| **hidden_objects** | Buscar objetos en escena | ⭐⭐ | Paisajes |
| **sequence_order** | Ordenar cronológicamente | ⭐⭐⭐ | Historia |
| **match_colors** | Emparejar objetos con colores | ⭐ | Banderas, arte |
| **whats_different** | Encontrar diferencias | ⭐⭐ | Escenas culturales |
| **connect_dots** | Conectar puntos para revelar | ⭐ | Monumentos simples |
| **timeline** | Organizar eventos históricos | ⭐⭐⭐ | Historia migratoria |
| **map_navigator** | Ubicar lugares en mapa | ⭐⭐ | Geografía |

**Distribución recomendada por país:**
- 1 **trivia** (obligatorio, evalúa conocimiento clave)
- 1 **puzzle o memory** (refuerzo visual)
- 1 actividad variada (elegir según contenido)

---

## 3. 15% Contenido de Migración

### 3.1 Historical Context (Contexto Histórico)

Explicar la historia migratoria del país.

**Preguntas guía:**
- ¿Este país fue origen o destino de migrantes?
- ¿Cuándo fueron las grandes olas migratorias?
- ¿Por qué migraban (guerra, hambre, oportunidad)?
- ¿Qué grupos étnicos llegaron/salieron?

**Template:**
```json
"historicalContext": {
  "text": {
    "es": "Entre [años], [número] de personas de [origen] migraron a/desde [destino] porque [razón]. [Detalle interesante]. [Consecuencia histórica].",
    "en": "Between [years], [number] people from [origin] migrated to/from [destination] because [reason]. [Interesting detail]. [Historical consequence]."
  },
  "sensitivityLevel": 2|3|4,
  "parentalControlRequired": false|true
}
```

**Niveles de sensibilidad:**
- **Nivel 2**: Migración económica ("buscaban trabajo")
- **Nivel 3**: Guerras/crisis ("escapaban de la guerra civil")
- **Nivel 4**: Esclavitud/genocidio ("fueron traídos como esclavos")

### 3.2 Famous Migrants (Migrantes Famosos)

1-2 historias inspiradoras por país.

**Criterios de selección:**
- ✅ Logros reconocidos mundialmente
- ✅ Historia inspiradora para niños
- ✅ Diversos orígenes (no solo celebridades)
- ✅ Rompieron barreras o estereotipos

**Categorías:**
- 🎬 **Artistas/Entretenimiento**: Actores, directores, músicos
- 🔬 **Científicos/Inventores**: Ganadores Nobel, innovadores
- ⚽ **Deportistas**: Campeones olímpicos/mundiales
- 📚 **Escritores/Pensadores**: Autores, filósofos
- 🏛️ **Líderes**: Políticos, activistas, empresarios
- 👷 **Trabajadores anónimos**: Representando a millones

**Template:**
```json
{
  "name": "Nombre Completo",
  "origin": "País Origen → País Destino",
  "destination": "País Final",
  "achievement": {
    "es": "Breve descripción de su logro más importante (2-3 oraciones). Mencionar obstáculos superados.",
    "en": "Brief description of their most important achievement (2-3 sentences). Mention overcome obstacles."
  },
  "quote": {
    "es": "Una frase inspiradora del personaje sobre migración, sueños o identidad.",
    "en": "An inspiring quote from the person about migration, dreams or identity."
  },
  "image": "migrants/nombre_apellido.png",
  "sensitivityLevel": 1|2|3
}
```

**Ejemplos reales usados:**
- Guillermo del Toro (México → USA): Oscars
- Carmen Miranda (Portugal → Brasil → USA): Pionera latina
- Moisés (Egipto → Canaán): Historia bíblica del Éxodo
- Anh Do (Vietnam → Australia): Refugiado a comediante famoso

### 3.3 Cultural Contributions (Contribuciones Culturales)

Qué dio el país al mundo (o recibió de inmigrantes).

**Categories:**
- 🍕 **Comida**: Tacos, sushi, pizza, curry
- 🎵 **Música/Danza**: Samba, flamenco, k-pop
- 🎨 **Arte**: Pinturas, arquitectura, cine
- 💡 **Ciencia/Tecnología**: Inventos, descubrimientos
- 📖 **Idioma/Literatura**: Palabras, cuentos, filosofía
- ⚽ **Deportes**: Fútbol, artes marciales

**Template:**
```json
"culturalContributions": {
  "description": {
    "es": "Este país ha compartido/recibido [categorías] con el mundo. [Explicar impacto global].",
    "en": "This country has shared/received [categories] with the world. [Explain global impact]."
  },
  "examples": [
    "Ejemplo 1 (específico)",
    "Ejemplo 2",
    "Ejemplo 3",
    "Ejemplo 4",
    "Ejemplo 5"
  ],
  "sensitivityLevel": 1
}
```

### 3.4 Modern Reality (Realidad Moderna)

Estado actual de la migración en ese país.

**⚠️ IMPORTANTE: Nivel de sensibilidad 3-5**

**Preguntas guía:**
- ¿El país recibe o expulsa migrantes hoy?
- ¿Qué políticas tiene (abierta/cerrada/mixta)?
- ¿Hay crisis humanitarias actuales?
- ¿Cómo trata a refugiados/inmigrantes?

**Template:**
```json
"modernReality": {
  "text": {
    "es": "Hoy [país] [recibe/expulsa] migrantes de [orígenes]. [Política actual]. [Desafío principal]. [Nota de esperanza u acción positiva].",
    "en": "Today [country] [receives/expels] migrants from [origins]. [Current policy]. [Main challenge]. [Note of hope or positive action]."
  },
  "sensitivityLevel": 4|5,
  "parentalControlRequired": true
}
```

**Reglas:**
- ✅ Ser honesto sobre realidades duras
- ✅ SIEMPRE terminar con nota de esperanza
- ✅ Evitar lenguaje que culpabilice a víctimas
- ✅ Mencionar organizaciones que ayudan

**Ejemplo bueno:**
> "Hoy miles de venezolanos llegan a Colombia escapando de la crisis. Aunque enfrentan discriminación, muchas comunidades colombianas los han acogido con solidaridad. Organizaciones como [X] ayudan a las familias a integrarse."

**Ejemplo malo (no hacer):**
> "Venezuela es un desastre y todos se van porque el gobierno es corrupto." ❌

### 3.5 Hopeful Message (Mensaje de Esperanza)

Reflexión final de Marco/familia sobre lo aprendido.

**Temas:**
- 💪 Resiliencia
- 🤝 Solidaridad
- 🌈 Diversidad como fortaleza
- 🏠 Hogar es donde te sientes aceptado
- ⭐ Sueños son válidos

**Template:**
```json
"hopefulMessage": {
  "es": "[País] me enseña que [lección universal sobre migración/humanidad]. [Aplicación personal].",
  "en": "[Country] teaches me that [universal lesson about migration/humanity]. [Personal application]."
}
```

**Ejemplos:**
- 🇲🇽 México: "Llevar tu cultura contigo te hace más fuerte"
- 🇧🇷 Brasil: "De la mezcla dolorosa puede nacer algo hermoso"
- 🇪🇸 España: "La historia da vueltas; los de ayer emigraban, los de hoy acogen"
- 🇯🇵 Japón: "Incluso culturas cerradas pueden aprender a abrirse"
- 🇦🇺 Australia: "Un país puede reconocer errores y construir mejor futuro"

---

## 4. Sistema de Sensibilidad (1-5)

### Niveles Definidos

| Nivel | Edad | Contenido | Requiere Control Parental | Ejemplos |
|-------|------|-----------|---------------------------|----------|
| **1** | 6+ | Muy ligero, celebratorio | ❌ | Comida, música, celebraciones |
| **2** | 8+ | Migración económica básica | ❌ | "Buscaban trabajo", Gold Rush |
| **3** | 10+ | Guerras, crisis, discriminación leve | ❌ | Guerra Civil, pobreza, refugiados |
| **4** | 12+ | Violencia, muerte, racismo | ✅ | Mediterráneo, frontera USA-México |
| **5** | 14+ | Esclavitud, genocidio, trauma | ✅ | Trata de esclavos, Holocausto, rutas clandestinas |

### Guía de Aplicación

**Nivel 1 - Siempre incluir:**
- Datos geográficos
- Comida y cultura
- Celebraciones
- Contribuciones artísticas
- Migrantes exitosos felices

**Nivel 2 - Incluir en mayoría de países:**
- Migración por trabajo ("buscaban oportunidades")
- Migración familiar ("reunirse con familia")
- Viajes históricos (Columbus, exploradores)

**Nivel 3 - Incluir con cuidado:**
- Guerras y conflictos (sin detalles gráficos)
- Refugiados ("escapaban del peligro")
- Discriminación ("no los trataban bien")
- Pobreza extrema

**Nivel 4 - Solo con control parental:**
- Muerte en rutas migratorias (con números)
- Detenciones y deportaciones
- Racismo institucional (políticas como White Australia)
- Campos de refugiados

**Nivel 5 - Muy limitado, solo países clave:**
- Esclavitud (Brasil, USA, países del Caribe)
- Genocidio y limpieza étnica
- Rutas clandestinas mortales
- Traumas severos

**Regla de oro:** Si dudas entre dos niveles, elige el más conservador.

---

## 5. Mecánicas de Juego

### 5.1 Bridge Building Mode (Países 1-20)

**Estructura:**
```json
"bridgeBuilding": {
  "mode": "build",
  "theme": "Puente de [concepto relacionado con migración]",
  "background": "backgrounds/pais_bridge.jpg",
  "music": "music/pais_ambient.mp3",
  "objective": {
    "es": "Construye un puente para que Marco y familia crucen [obstáculo]. [Contexto narrativo].",
    "en": "Build a bridge so Marco and family can cross [obstacle]. [Narrative context]."
  },
  "structures": [
    {
      "id": "gap_1",
      "type": "gap",
      "gap": {
        "width": 180-300, // Incrementa con dificultad
        "height": 100-200,
        "startPosition": { "x": 150-200, "y": 400 },
        "endPosition": { "x": calcular, "y": 400 }
      },
      "blocks": [
        // wood_plank: 100-150 width, 20 height
        // steel_beam: 100-180 width, 15-18 height
        // rope: 60-100 width, 8 height
      ],
      "culturalObjectPosition": { "x": endPosition.x + 20-50, "y": 350-380 }
    }
  ],
  "helpersAvailable": 2-5, // Incrementa con progreso
  "optimalSolutions": 2-4,
  "starThresholds": {
    "3": optimal,
    "2": optimal + 1,
    "1": optimal + 3
  },
  "specialMechanics": [], // viento, gravedad baja, etc.
  "tutorial": {
    "es": "Pista sobre cómo resolver el nivel",
    "en": "Hint about how to solve the level"
  }
}
```

**Progresión de dificultad:**
- Países 1-5: Gap 180-200px, 2-3 helpers, 3-5 bloques
- Países 6-10: Gap 220-250px, 3 helpers, 5-7 bloques
- Países 11-15: Gap 260-280px, 3-4 helpers, 7-9 bloques, viento leve
- Países 16-20: Gap 290-320px, 4-5 helpers, 9-12 bloques, mecánicas especiales

### 5.2 Destroy Mode (Países 21-34)

**Tipos de muros:**

| Material | Color | Salud | Representa | Cuándo usar |
|----------|-------|-------|------------|-------------|
| **prejudice_wall** | Rojo | 80-120 | Prejuicios, discriminación | Países con historia racista |
| **bureaucracy_wall** | Gris | 100-150 | Burocracia, trámites | Países con sistemas complejos |
| **border_wall** | Negro | 150-200 | Fronteras físicas | Países con muros/vallas |
| **misinformation_wall** | Amarillo | 70-100 | Fake news, propaganda | Países con desinformación |

**Estructura:**
```json
"bridgeBuilding": {
  "mode": "destroy",
  "theme": "Derrumbando el Muro de [Injusticia Específica]",
  "objective": {
    "es": "Destruye el muro que representa [qué injusticia]. [Por qué debe caer].",
    "en": "Destroy the wall representing [what injustice]. [Why it must fall]."
  },
  "structures": [
    {
      "id": "wall_1",
      "type": "wall",
      "wall": {
        "width": 200-350,
        "height": 150-250,
        "position": { "x": 350, "y": 350 },
        "material": "prejudice_wall|bureaucracy_wall|border_wall|misinformation_wall",
        "layers": 3-6,
        "blocks": [
          // Definir cada bloque con position, size, health
          // Marcar algunos como "isKey: true"
        ]
      },
      "culturalObjectPosition": { "x": 350-400, "y": 280-320 }
    }
  ],
  "specialMechanics": [
    {
      "type": "key_blocks",
      "description": {
        "es": "Los bloques [color/posición] son clave para colapsar el muro",
        "en": "The [color/position] blocks are key to collapsing the wall"
      }
    }
  ]
}
```

**Progresión:**
- Países 21-25: 3 capas, 200px width, materiales mixtos
- Países 26-30: 4-5 capas, 250-300px width, mecánicas especiales
- Países 31-34: 5-6 capas, 300-350px width, viento/obstáculos
- País 35 (Boss): 7+ capas, 400px width, Koopas, mecánicas épicas

### 5.3 Family Dialogue (Diálogo Familiar)

4-6 líneas de diálogo entre los personajes.

**Estructura narrativa:**
1. **Observación** (Teo o Marco nota algo)
2. **Contexto** (Luis o Xolo explica)
3. **Reflexión** (Patricia o Marco relaciona con su viaje)
4. **Lección** (Xolo da sabiduría)
5. **Conexión personal** (Marco aplica a su situación)

**Template:**
```json
"familyDialogue": [
  {
    "character": "teo",
    "text": {
      "es": "¿Observación o pregunta inocente sobre el país?",
      "en": "Observation or innocent question about the country?"
    }
  },
  {
    "character": "luis|xolo",
    "text": {
      "es": "Explicación del contexto histórico/cultural.",
      "en": "Explanation of historical/cultural context."
    }
  },
  {
    "character": "marco|patricia",
    "text": {
      "es": "Reflexión personal, relacionando con su propia experiencia migratoria.",
      "en": "Personal reflection, relating to their own migration experience."
    }
  },
  {
    "character": "xolo",
    "text": {
      "es": "Lección de sabiduría universal sobre migración/humanidad.",
      "en": "Lesson of universal wisdom about migration/humanity."
    }
  }
]
```

**Distribución recomendada por personaje:**
- **Teo**: Preguntas inocentes, observaciones simples (voz infantil)
- **Marco**: Reflexiones serias, conexiones emocionales (protagonista)
- **Luis**: Datos históricos, apoyo emocional (hermano)
- **Patricia**: Fuerza, empatía, justicia (partner fuerte)
- **Xolo**: Sabiduría, contexto profundo, lecciones (guía)

---

## 6. Investigación y Fuentes

### 6.1 Fuentes Confiables

**Migración y Refugiados:**
- 🔗 **International Organization for Migration (IOM)**: https://www.iom.int
- 🔗 **UNHCR (UN Refugee Agency)**: https://www.unhcr.org
- 🔗 **Migration Policy Institute**: https://www.migrationpolicy.org
- 🔗 **Pew Research Center**: https://www.pewresearch.org

**Historia:**
- 🔗 **Wikipedia** (verificar fuentes citadas)
- 🔗 **Britannica**: https://www.britannica.com
- 🔗 **History.com**

**Geografía y Cultura:**
- 🔗 **National Geographic**
- 🔗 **UNESCO World Heritage Sites**
- 🔗 **CIA World Factbook**

**Estadísticas:**
- 🔗 **World Bank Data**
- 🔗 **United Nations Statistics Division**
- 🔗 **Government Census websites**

### 6.2 Proceso de Investigación

**Para cada país:**

1. **Wikipedia (30 min):**
   - Lee artículo principal
   - Secciones clave: History, Demographics, Culture, Immigration
   - Anota años, números, nombres importantes

2. **Google búsqueda específica (20 min):**
   - "[Country] immigration history"
   - "[Country] famous immigrants"
   - "[Country] refugee crisis"
   - "[Country] cultural contributions"

3. **IOM/UNHCR (si aplica, 15 min):**
   - Busca reportes sobre ese país
   - Estadísticas recientes
   - Crisis actuales

4. **Imágenes (10 min):**
   - Google Images: monumentos, paisajes
   - Wikimedia Commons (imágenes libres)
   - Unsplash, Pexels (fotos gratis)

5. **Verificación (10 min):**
   - Confirma fechas en 2+ fuentes
   - Verifica nombres de personas
   - Double-check números (millones vs miles)

**Total: ~1.5 horas de investigación por país**

### 6.3 Citas y Atribución

**En metadata incluir:**
```json
"metadata": {
  "sources": [
    "International Organization for Migration (IOM) - 2023 World Migration Report",
    "UNHCR - Syria Regional Refugee Response",
    "Wikipedia - [Country] Immigration Article (verified 2024-01)",
    "Pew Research Center - Global Migration Trends 2023"
  ]
}
```

---

## 7. Checklist de Creación

### ✅ Por País

**Investigación:**
- [ ] Historia general del país (Wikipedia)
- [ ] Historia migratoria (IOM, artículos académicos)
- [ ] 2-3 migrantes famosos identificados
- [ ] Contribuciones culturales listadas
- [ ] Situación actual investigada
- [ ] Fuentes citadas en metadata

**Contenido Cultural (85%):**
- [ ] Cultural Object seleccionado y descrito
- [ ] 2-3 locaciones definidas
- [ ] 6-12 Interactive Elements creados
- [ ] 3 activities implementadas (trivia obligatoria)
- [ ] Clues escritas (3 pistas)
- [ ] Fun facts incluidos

**Contenido Migración (15%):**
- [ ] Historical Context escrito (nivel 2-4)
- [ ] 1-2 Famous Migrants con quotes
- [ ] Cultural Contributions (5 ejemplos)
- [ ] Modern Reality (si aplica, nivel 4-5)
- [ ] Hopeful Message inspirador

**Mecánica de Juego:**
- [ ] Bridge Building configurado (build o destroy según orden)
- [ ] Dificultad apropiada para orden del país
- [ ] Optimal solutions calculado
- [ ] Star thresholds definidos
- [ ] Tutorial/hint escrito

**Narrativa:**
- [ ] 4-6 Family Dialogue escritos
- [ ] Progresión de personajes coherente
- [ ] Tono apropiado (esperanzador)

**Metadata:**
- [ ] Temas migratorios tagueados
- [ ] Educational focus listado
- [ ] Nivel de sensibilidad asignado
- [ ] Fuentes citadas

**Calidad:**
- [ ] Todos los textos en 5 idiomas (o al menos ES/EN)
- [ ] Sin faltas ortográficas
- [ ] Fechas y números verificados
- [ ] Nombres propios correctos
- [ ] Sensibilidad apropiada para edad

---

## 8. Ejemplos por Continente

### 🌎 Americas (7 países)

**Completados:**
- ✅ México (país 1) - Migración a USA, cultura maya/azteca
- ✅ Brasil (país 3) - Inmigración europea/japonesa, esclavitud

**Pendientes:**
- ❌ **Perú** - Inmigración china, italiana; cultura inca
- ❌ **Canadá** - Multiculturalismo, refugiados sirios, indígenas
- ❌ **Argentina** - Inmigración italiana/española masiva
- ❌ **USA** - Ellis Island, melting pot, fronteras
- ❌ **Chile** - Inmigración palestina, alemana

**Temas clave:**
- Esclavitud africana (Brasil, Caribe)
- Inmigración europea (Argentina, Uruguay)
- Migración centroamericana (México → USA)
- Refugiados modernos (Canadá, USA)
- Pueblos indígenas desplazados

### 🌍 Europe (7 países)

**Completados:**
- ✅ España (país 15) - Emigración a América, inmigración latina moderna

**Pendientes:**
- ❌ **Francia** - Inmigración africana/árabe, huguenotes
- ❌ **Italia** - Emigración masiva a América, inmigración africana moderna
- ❌ **Grecia** - Diáspora griega, crisis de refugiados 2015
- ❌ **UK** - Commonwealth, Brexit, Windrush
- ❌ **Alemania** - Gastarbeiter turcos, refugiados sirios
- ❌ **Rusia** - Emigración judía, inmigración de ex-URSS

**Temas clave:**
- Emigración europea a América (1850-1950)
- Inmigración postcolonial (UK, Francia)
- Crisis de refugiados 2015 (Grecia, Alemania)
- Migración intra-europea (Polonia → UK)
- Diásporas históricas (griega, judía, irlandesa)

### 🌏 Asia (7 países)

**Completados:**
- ✅ Japón (país 22) - Dekasegi, cerrado a inmigración

**Pendientes:**
- ❌ **China** - Diáspora china global, migración interna
- ❌ **India** - Diáspora india, refugiados tibetanos/bengalíes
- ❌ **Tailandia** - Refugiados birmanos, migración laboral
- ❌ **Corea del Sur** - Emigración a USA, trabajadores extranjeros
- ❌ **Indonesia** - Migración a Malasia, transmigración interna
- ❌ **Arabia Saudita** - Trabajadores migrantes (filipinos, indios, árabes)

**Temas clave:**
- Diáspora china (Chinatowns globales)
- Diáspora india (Silicon Valley, UK, África)
- Trabajadores migrantes en Golfo Pérsico
- Refugiados rohingyas (Myanmar → Bangladesh)
- Migración laboral intra-asiática

### 🌍 Africa (7 países)

**Completados:**
- ✅ Egipto (país 28) - Refugiados, tránsito a Europa

**Pendientes:**
- ❌ **Kenia** - Refugiados somalíes, campo de Dadaab
- ❌ **Marruecos** - Migración a Europa, trabajadores en España
- ❌ **Sudáfrica** - Apartheid, xenofobia contra africanos
- ❌ **Nigeria** - Diáspora nigeriana, tráfico humano
- ❌ **Etiopía** - Refugiados eritreos, diáspora etíope
- ❌ **Madagascar** - Migración a Francia, aislamiento

**Temas clave:**
- Trata de esclavos transatlántica (nivel 5)
- Refugiados de guerras (Somalia, Sudán del Sur, Eritrea)
- Migración económica a Europa (Marruecos, Nigeria)
- Xenofobia intra-africana (Sudáfrica)
- Diásporas africanas (UK, USA, Francia)

### 🌏 Oceania (7 países)

**Completados:**
- ✅ Australia (país 33) - Convictos, White Australia Policy, multiculturalismo

**Pendientes:**
- ❌ **Nueva Zelanda** - Inmigración británica, refugiados polinesios, maoríes
- ❌ **Papúa Nueva Guinea** - Migración interna, centro de detención australiano
- ❌ **Fiji** - Trabajadores indios, golpes étnicos
- ❌ **Samoa** - Migración a NZ/USA, remesas
- ❌ **Tonga** - Migración masiva, remesas 40% GDP
- ❌ **Vanuatu** - Migración climática, blackbirding

**Temas clave:**
- Colonización europea (Australia, NZ)
- Pueblos indígenas (aborígenes, maoríes)
- Migración de islas del Pacífico a NZ/Australia
- Centros de detención offshore (PNG)
- Migración climática (islas hundidas)

---

## 9. Consejos Finales

### ✅ DO's (Hacer)

1. **Investigar bien**: 1.5 horas mínimo por país
2. **Balancear 85/15**: No sobre-enfocarse en migración
3. **Ser empático**: Lenguaje que dignifica a migrantes
4. **Terminar con esperanza**: Siempre mensaje positivo
5. **Verificar fechas**: Usar múltiples fuentes
6. **Citar fuentes**: En metadata
7. **Diversificar migrantes famosos**: No solo celebridades
8. **Usar control parental**: Para contenido nivel 4-5
9. **Probar dificultad**: Bridge/wall debe ser desafiante pero justo
10. **Revisar sensibilidad**: Pedir segunda opinión si dudas

### ❌ DON'Ts (Evitar)

1. **No politizar**: Evitar agendas partidistas
2. **No glorificar violencia**: Ni en migración ni historia
3. **No victimizar**: Migrantes son protagonistas, no víctimas pasivas
4. **No simplificar**: Historia migratoria es compleja
5. **No usar lenguaje deshumanizante**: "Ilegales", "invasión", etc.
6. **No omitir pueblos indígenas**: Reconocer nativos originales
7. **No copiar-pegar**: Adapta información, no copies Wikipedia directo
8. **No inventar datos**: Usa fuentes reales
9. **No asumir conocimiento**: Explica contexto para niños
10. **No dejar sin esperanza**: Siempre incluir Hopeful Message

---

## 10. Template Completo (Copiar/Pegar)

Ver archivo: `docs/COUNTRY_TEMPLATE.json`

---

## 11. Orden de Creación Sugerido

### Prioridad Alta (Países icónicos, fáciles de investigar):
1. **USA** (país 20) - Ellis Island, melting pot
2. **Canadá** (país 12) - Multiculturalismo modelo
3. **Italia** (país 18) - Emigración masiva
4. **China** (país 24) - Diáspora global
5. **India** (país 25) - Diáspora tech

### Prioridad Media:
6. Francia, UK, Alemania (Europa)
7. Argentina, Perú (América)
8. Tailandia, Corea del Sur (Asia)
9. Kenia, Sudáfrica (África)
10. Nueva Zelanda (Oceanía)

### Prioridad Baja (Requieren más investigación):
11. Países pequeños de Oceanía (Fiji, Samoa, Tonga, Vanuatu)
12. Países con poca información en español (Madagascar, PNG)
13. Países con situaciones muy complejas (Rusia, Arabia Saudita)

---

## 12. Estimación de Tiempo

**Por país:**
- Investigación: 1.5 horas
- Escritura JSON: 2 horas
- Traducción (si no usas AI): 1 hora
- Revisión: 0.5 horas
- **Total: ~5 horas por país**

**30 países restantes:**
- 30 × 5 horas = **150 horas**
- A 5 horas/día = **30 días laborales** (~6 semanas)
- A 2 horas/día = **75 días** (~10 semanas)

**Recomendación:**
Crear países en batches de 5:
- Semana 1-2: 5 países América
- Semana 3-4: 5 países Europa
- Semana 5-6: 5 países Asia
- Semana 7-8: 5 países África
- Semana 9-10: 5 países Oceanía
- Semana 11-12: 5 países finales + revisión

---

## 📚 Recursos Adicionales

- `CHARACTER_AI_PROMPTS.md` - Cómo generar arte
- `MIGRATION_PORTALS_DESIGN.md` - Sistema de portales entre países
- `HOPEQUEST_README.md` - Visión general del proyecto

---

**¡Buena suerte creando los 30 países restantes!** 🌍✨

Cada país que completes educará a miles de niños sobre geografía, cultura y la humanidad compartida de todos los migrantes. Es un trabajo importante y hermoso.

---

*Última actualización: 2025-01-01*
*Versión: 1.0*
*Países completados: 6/35 (17%)*
