import axios from 'axios';

// API del Sistema Solar
const BASE_URL = 'https://api.le-systeme-solaire.net/rest';

export const getPlanetData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bodies`);
    const planets = response.data.bodies.filter(body => body.isPlanet);
    
    return planets.map(planet => ({
      id: planet.id,
      name: getSpanishName(planet.englishName),
      englishName: planet.englishName,
      description: getSpanishDescription(planet.englishName),
      physicalData: {
        mass: `${planet.mass?.massValue.toFixed(2)} × 10^${planet.mass?.massExponent} kg`,
        diameter: `${(planet.meanRadius * 2).toLocaleString()} km`,
        gravity: `${planet.gravity} m/s²`,
        density: `${planet.density} g/cm³`
      },
      orbitalData: {
        distanceFromSun: `${(planet.semimajorAxis / 1000000).toFixed(1)} millones km`,
        orbitalPeriod: `${planet.sideralOrbit} días terrestres`,
        rotationPeriod: `${planet.sideralRotation} horas`,
        avgTemp: `${planet.avgTemp}°K (${(planet.avgTemp - 273.15).toFixed(1)}°C)`
      },
      atmosphere: getAtmosphereInfo(planet.englishName),
      curiosities: getCuriosities(planet.englishName),
      image: getPlanetImage(planet.englishName),
      order: getPlanetOrder(planet.englishName)
    }));
  } catch (error) {
    console.error('Error fetching planet data:', error);
    return [];
  }
};

const getSpanishName = (englishName) => {
  const names = {
    Mercury: "Mercurio",
    Venus: "Venus",
    Earth: "Tierra",
    Mars: "Marte",
    Jupiter: "Júpiter",
    Saturn: "Saturno",
    Uranus: "Urano",
    Neptune: "Neptuno"
  };
  return names[englishName] || englishName;
};

const getAtmosphereInfo = (planetName) => {
  const atmospheres = {
    Mercury: {
      composition: "Prácticamente inexistente",
      pressure: "Casi nula",
      details: "Atmósfera extremadamente tenue compuesta principalmente de átomos capturados del viento solar"
    },
    Venus: {
      composition: "96.5% CO₂, 3.5% N₂",
      pressure: "90 atmósferas",
      details: "Atmósfera densa con fuerte efecto invernadero, causante de temperaturas extremadamente altas"
    },
    Earth: {
      composition: "78% N₂, 21% O₂, 1% otros",
      pressure: "1 atmósfera",
      details: "Única atmósfera conocida que sustenta vida, con una capa de ozono protectora"
    },
    // ... información para los demás planetas
  };
  return atmospheres[planetName] || {};
};

const getCuriosities = (planetName) => {
  const curiosities = {
    Mercury: [
      "Es el planeta más pequeño del Sistema Solar",
      "Tiene la órbita más excéntrica de todos los planetas",
      "A pesar de ser el más cercano al Sol, no es el más caliente",
      "Un día solar en Mercurio dura 176 días terrestres"
    ],
    Venus: [
      "Es el planeta más caliente del Sistema Solar",
      "Gira en sentido contrario a la mayoría de los planetas",
      "Se le conoce como el 'gemelo malvado' de la Tierra por su tamaño similar",
      "Su día es más largo que su año"
    ],
    // ... curiosidades para los demás planetas
  };
  return curiosities[planetName] || [];
};

// Imágenes estáticas de alta calidad
const getPlanetImage = (planetName) => {
  const images = {
    Mercury: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/1024px-Mercury_in_true_color.jpg",
    Venus: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    Earth: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg",
    Mars: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    Jupiter: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    Saturn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    Uranus: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    Neptune: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
  };

  // URL de respaldo en caso de que la imagen no exista
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg";
  
  return images[planetName] || fallbackImage;
};

// Descripciones en español
const getSpanishDescription = (planetName) => {
  const descriptions = {
    Mercury: "El planeta más pequeño y más cercano al Sol, con temperaturas extremas.",
    Venus: "El planeta más caliente, con una densa atmósfera de efecto invernadero.",
    Earth: "Nuestro hogar, el único planeta conocido con vida.",
    Mars: "El planeta rojo, objetivo principal para la exploración humana.",
    Jupiter: "El planeta más grande, con su característica Gran Mancha Roja.",
    Saturn: "Famoso por sus espectaculares anillos y numerosas lunas.",
    Uranus: "El planeta inclinado, gira casi de lado en su órbita.",
    Neptune: "El planeta más ventoso, con vientos de hasta 2,100 km/h."
  };
  return descriptions[planetName] || "";
};

// Orden de los planetas desde el Sol
const getPlanetOrder = (planetName) => {
  const order = {
    Mercury: 1,
    Venus: 2,
    Earth: 3,
    Mars: 4,
    Jupiter: 5,
    Saturn: 6,
    Uranus: 7,
    Neptune: 8
  };
  return order[planetName] || 0;
}; 