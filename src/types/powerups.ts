/**
 * Power-Ups Culturales - Sistema de potenciadores del juego
 * Para niños de 5-12 años: Simple, visual y educativo
 */

import type { LocalizedString } from './index';

export type PowerUpType =
  | 'invincibility'      // Estrella invencible (como Mario)
  | 'double_stars'       // Gana el doble de estrellas
  | 'super_jump'         // Salto extra alto
  | 'time_slow'          // Tiempo en cámara lenta
  | 'reveal_hint'        // Revela una pista
  | 'extra_launch'       // Lanzamiento extra en modo físico
  | 'shield'             // Escudo protector
  | 'magnet';            // Atrae estrellas automáticamente

export interface CulturalPowerUp {
  id: string;
  type: PowerUpType;
  name: LocalizedString;
  description: LocalizedString; // Explicación simple para niños
  country: string; // De qué país viene
  icon: string; // Emoji grande y colorido
  duration: number; // Segundos (o 0 si es instantáneo)
  color: string; // Color del efecto visual
  funFact: LocalizedString; // Dato curioso cultural (educativo)
}

// Power-ups por país (35 power-ups únicos)
export const CULTURAL_POWERUPS: CulturalPowerUp[] = [
  // México
  {
    id: 'powerup_mexico_pinata',
    type: 'double_stars',
    name: {
      es: 'Piñata de la Suerte',
      en: 'Lucky Piñata'
    },
    description: {
      es: '¡Las estrellas valen el doble! 🎉',
      en: 'Stars are worth double! 🎉'
    },
    country: 'mexico',
    icon: '🪅',
    duration: 20,
    color: '#FF1493',
    funFact: {
      es: 'Las piñatas mexicanas tienen 7 picos que representan los 7 pecados capitales. ¡Romperlas simboliza vencer las tentaciones!',
      en: 'Mexican piñatas have 7 points representing the 7 deadly sins. Breaking them symbolizes overcoming temptations!'
    }
  },

  // Colombia
  {
    id: 'powerup_colombia_coffee',
    type: 'time_slow',
    name: {
      es: 'Café Colombiano',
      en: 'Colombian Coffee'
    },
    description: {
      es: '¡Todo va más despacio para ti! ⏱️',
      en: 'Everything moves slower for you! ⏱️'
    },
    country: 'colombia',
    icon: '☕',
    duration: 15,
    color: '#6F4E37',
    funFact: {
      es: 'Colombia es el tercer productor de café del mundo. ¡Su café es famoso por su suavidad!',
      en: 'Colombia is the third largest coffee producer in the world. Its coffee is famous for its smoothness!'
    }
  },

  // Argentina
  {
    id: 'powerup_argentina_mate',
    type: 'invincibility',
    name: {
      es: 'Mate Mágico',
      en: 'Magic Mate'
    },
    description: {
      es: '¡Eres invencible por unos segundos! ✨',
      en: "You're invincible for a few seconds! ✨"
    },
    country: 'argentina',
    icon: '🧉',
    duration: 10,
    color: '#75B8C8',
    funFact: {
      es: 'El mate es una bebida tradicional argentina que se comparte entre amigos. ¡Compartir mate es signo de amistad!',
      en: 'Mate is a traditional Argentine drink shared among friends. Sharing mate is a sign of friendship!'
    }
  },

  // España
  {
    id: 'powerup_spain_paella',
    type: 'shield',
    name: {
      es: 'Escudo de Paella',
      en: 'Paella Shield'
    },
    description: {
      es: '¡Un escudo te protege de errores! 🛡️',
      en: 'A shield protects you from mistakes! 🛡️'
    },
    country: 'spain',
    icon: '🥘',
    duration: 30,
    color: '#FFD700',
    funFact: {
      es: 'La paella es un plato español de Valencia. ¡Hay más de 200 tipos diferentes de paella!',
      en: 'Paella is a Spanish dish from Valencia. There are over 200 different types of paella!'
    }
  },

  // Brasil
  {
    id: 'powerup_brazil_samba',
    type: 'super_jump',
    name: {
      es: 'Ritmo de Samba',
      en: 'Samba Rhythm'
    },
    description: {
      es: '¡Salta súper alto con el ritmo! 🎵',
      en: 'Jump super high with the rhythm! 🎵'
    },
    country: 'brazil',
    icon: '🎭',
    duration: 20,
    color: '#FFD700',
    funFact: {
      es: 'La samba es un baile brasileño lleno de energía. ¡En el Carnaval de Río, millones de personas bailan samba!',
      en: 'Samba is a Brazilian dance full of energy. At the Rio Carnival, millions of people dance samba!'
    }
  },

  // India
  {
    id: 'powerup_india_curry',
    type: 'reveal_hint',
    name: {
      es: 'Sabiduría del Curry',
      en: 'Curry Wisdom'
    },
    description: {
      es: '¡Te revela una pista útil! 💡',
      en: 'Reveals a helpful hint! 💡'
    },
    country: 'india',
    icon: '🍛',
    duration: 0, // Instantáneo
    color: '#FF8C00',
    funFact: {
      es: 'El curry indio usa más de 20 especias diferentes. ¡Cada familia tiene su receta secreta!',
      en: 'Indian curry uses over 20 different spices. Every family has their secret recipe!'
    }
  },

  // Francia
  {
    id: 'powerup_france_baguette',
    type: 'extra_launch',
    name: {
      es: 'Baguette Mágica',
      en: 'Magic Baguette'
    },
    description: {
      es: '¡Ganas un intento extra! 🥖',
      en: 'You get an extra try! 🥖'
    },
    country: 'france',
    icon: '🥖',
    duration: 0,
    color: '#C19A6B',
    funFact: {
      es: 'En Francia se comen 30 millones de baguettes cada día. ¡Eso es una baguette cada 2 segundos!',
      en: 'In France, 30 million baguettes are eaten every day. That\'s one baguette every 2 seconds!'
    }
  },

  // Japón (Si se agrega)
  {
    id: 'powerup_japan_sushi',
    type: 'magnet',
    name: {
      es: 'Imán de Sushi',
      en: 'Sushi Magnet'
    },
    description: {
      es: '¡Las estrellas vienen solas a ti! 🧲',
      en: 'Stars come to you automatically! 🧲'
    },
    country: 'japan',
    icon: '🍣',
    duration: 15,
    color: '#FF69B4',
    funFact: {
      es: 'El sushi originalmente era una forma de preservar pescado. ¡Ahora es famoso en todo el mundo!',
      en: 'Sushi was originally a way to preserve fish. Now it\'s famous all over the world!'
    }
  },

  // Marruecos
  {
    id: 'powerup_morocco_mint_tea',
    type: 'time_slow',
    name: {
      es: 'Té de Menta',
      en: 'Mint Tea'
    },
    description: {
      es: '¡El tiempo va más lento! 🍵',
      en: 'Time moves slower! 🍵'
    },
    country: 'morocco',
    icon: '🍵',
    duration: 15,
    color: '#98FF98',
    funFact: {
      es: 'En Marruecos, servir té de menta es un signo de hospitalidad. ¡Se sirve desde muy alto para hacer espuma!',
      en: 'In Morocco, serving mint tea is a sign of hospitality. It\'s poured from high up to create foam!'
    }
  },

  // Perú
  {
    id: 'powerup_peru_quinoa',
    type: 'shield',
    name: {
      es: 'Escudo de Quinoa',
      en: 'Quinoa Shield'
    },
    description: {
      es: '¡Te protege de un error! 🛡️',
      en: 'Protects you from one mistake! 🛡️'
    },
    country: 'peru',
    icon: '🌾',
    duration: 30,
    color: '#DAA520',
    funFact: {
      es: 'La quinoa es un superalimento de Perú. ¡Los incas la llamaban "la madre de todos los granos"!',
      en: 'Quinoa is a superfood from Peru. The Incas called it "the mother of all grains"!'
    }
  },

  // Italia
  {
    id: 'powerup_italy_gelato',
    type: 'double_stars',
    name: {
      es: 'Gelato Doble',
      en: 'Double Gelato'
    },
    description: {
      es: '¡Estrellas dobles por un rato! 🍦',
      en: 'Double stars for a while! 🍦'
    },
    country: 'italy',
    icon: '🍦',
    duration: 25,
    color: '#FFB6C1',
    funFact: {
      es: 'El gelato italiano tiene menos aire que el helado normal. ¡Por eso su sabor es más intenso!',
      en: 'Italian gelato has less air than regular ice cream. That\'s why its flavor is more intense!'
    }
  },

  // Australia
  {
    id: 'powerup_australia_boomerang',
    type: 'extra_launch',
    name: {
      es: 'Boomerang Mágico',
      en: 'Magic Boomerang'
    },
    description: {
      es: '¡Tu intento vuelve! Juega de nuevo! 🪃',
      en: 'Your try comes back! Play again! 🪃'
    },
    country: 'australia',
    icon: '🪃',
    duration: 0,
    color: '#8B4513',
    funFact: {
      es: 'Los boomerangs fueron inventados por los aborígenes australianos hace más de 10,000 años. ¡Algunos vuelven y otros no!',
      en: 'Boomerangs were invented by Aboriginal Australians over 10,000 years ago. Some come back and others don\'t!'
    }
  },

  // Estados Unidos
  {
    id: 'powerup_usa_liberty',
    type: 'invincibility',
    name: {
      es: 'Antorcha de la Libertad',
      en: 'Liberty Torch'
    },
    description: {
      es: '¡Poder invencible como la Estatua! 🗽',
      en: 'Invincible power like the Statue! 🗽'
    },
    country: 'usa',
    icon: '🗽',
    duration: 12,
    color: '#4169E1',
    funFact: {
      es: 'La Estatua de la Libertad fue un regalo de Francia a Estados Unidos. ¡Representa la libertad y la bienvenida a los inmigrantes!',
      en: 'The Statue of Liberty was a gift from France to the United States. It represents freedom and welcome to immigrants!'
    }
  },
];

// Helper functions para obtener power-ups
export const getPowerUpsByCountry = (countryId: string): CulturalPowerUp[] => {
  return CULTURAL_POWERUPS.filter(p => p.country === countryId);
};

export const getPowerUpById = (id: string): CulturalPowerUp | undefined => {
  return CULTURAL_POWERUPS.find(p => p.id === id);
};

export const getRandomPowerUp = (): CulturalPowerUp => {
  return CULTURAL_POWERUPS[Math.floor(Math.random() * CULTURAL_POWERUPS.length)];
};
