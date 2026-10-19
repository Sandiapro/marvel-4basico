/**
 * BASE DE DATOS EDUCATIVA Y PEDAGÓGICA - MIS TABLAS
 * Contenido adaptado a las Bases Curriculares de 4° Básico (Chile / SIMCE)
 */

// Información didáctica de las Tablas de Multiplicar del 2 al 10 con Mentores Marvel & Minecraft
const TABLAS_INFO = {
  2: {
    numero: 2,
    nombre: "Tabla del 2",
    subtitulo: "Doble Salto Arácnido de Spider-Man & Ghost-Spider",
    color: "#EF4444",
    colorBg: "#FEF2F2",
    icono: "🕸️",
    mentor: "Spider-Man & Ghost-Spider",
    mentorRol: "Centinelas Arácnidos",
    avatarImg: "IMAGEN/avatar_spiderman.svg",
    objeto: "telarañas eléctricas",
    emojiObjeto: "🕸️",
    unidad: "redes dobles",
    universo: "Marvel Spider-Verse",
    poder: "Lanzatelarañas Cuántico",
    sonido: "playWebThwip",
    patron: "Todos los resultados terminan en número par: 0, 2, 4, 6 u 8. ¡Multiplicar por 2 es calcular el DOBLE exacto!",
    truco: "💡 Truco Arácnido: ¡Suma el número consigo mismo! Para 2 × 7, solo haz 7 + 7 = 14.",
    pistas: [
      "Spider-Man dispara 2 telarañas en cada balanceo: 2, 4, 6, 8, 10...",
      "¡Todo número multiplicado por 2 siempre es PAR, como los ojos del traje de Spidey!"
    ]
  },
  3: {
    numero: 3,
    nombre: "Tabla del 3",
    subtitulo: "Reactores Arc Triples de Iron Man",
    color: "#EAB308",
    colorBg: "#FEFCE8",
    icono: "⚡",
    mentor: "Iron Man (Tony Stark)",
    mentorRol: "Genio Tecnológico de los Vengadores",
    avatarImg: "IMAGEN/avatar_ironman.svg",
    objeto: "reactores arc",
    emojiObjeto: "⚡",
    unidad: "reactores",
    universo: "Marvel Stark Labs",
    poder: "Propulsor Repulsor Triple",
    sonido: "playJarvisChime",
    patron: "La suma de los dígitos de cualquier resultado siempre da 3, 6 o 9 (Ej: 3 × 7 = 21, y 2 + 1 = 3).",
    truco: "💡 Protocolo Stark: Multiplicar por 3 es calcular el TRIPLE. Puedes calcular el doble (×2) y sumarle una vez más el número: 3 × 6 = 12 + 6 = 18.",
    pistas: [
      "Avanza en propulsión de 3 en 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30...",
      "Suma las cifras del resultado: ¡siempre suman 3, 6 o 9 según Jarvis!"
    ]
  },
  4: {
    numero: 4,
    nombre: "Tabla del 4",
    subtitulo: "Escudo Cuádruple de Vibranium del Capitán América",
    color: "#3B82F6",
    colorBg: "#EFF6FF",
    icono: "🛡️",
    mentor: "Capitán América (Steve Rogers)",
    mentorRol: "Líder de los Vengadores",
    avatarImg: "IMAGEN/avatar_capitan.svg",
    objeto: "escudos de vibranium",
    emojiObjeto: "🛡️",
    unidad: "escudos",
    universo: "Marvel Avengers",
    poder: "Rebote Táctico Cuádruple",
    sonido: "playCapShieldRing",
    patron: "Todos los resultados terminan en 0, 4, 8, 2 o 6. ¡Es exactamente el doble de la tabla del 2!",
    truco: "💡 Táctica del Capitán: ¡Haz el doble dos veces! Para 4 × 7, saca el doble de 7 (14) y luego el doble de 14 (28). ¡Victoria asegurada!",
    pistas: [
      "El escudo tiene 4 cuadrantes y una estrella central.",
      "Si ya dominas la tabla del 2, solo duplica su resultado."
    ]
  },
  5: {
    numero: 5,
    nombre: "Tabla del 5",
    subtitulo: "¡Hulk Smash y Gemas de Esmeralda!",
    color: "#10B981",
    colorBg: "#ECFDF5",
    icono: "💚",
    mentor: "Hulk Titánico",
    mentorRol: "Fuerza Bruta de los Vengadores",
    avatarImg: "IMAGEN/avatar_hulk.svg",
    objeto: "bloques de esmeralda smash",
    emojiObjeto: "💚",
    unidad: "gemas",
    universo: "Marvel & Minecraft",
    poder: "Impacto Titánico Quíntuple",
    sonido: "playHulkRoar",
    patron: "¡Los resultados SIEMPRE terminan en 0 o en 5 intercaladamente! (5, 10, 15, 20, 25, 30...).",
    truco: "💡 Furia de Hulk: Si multiplicas por un número par termina en 0 (5 × 6 = 30). Si es impar termina en 5 (5 × 7 = 35).",
    pistas: [
      "Hulk tiene 5 dedos gigantes en cada puño. 3 puños tienen 15 nudillos destructores.",
      "¡Nunca terminará en 1, 2, 3, 4, 6, 7, 8 o 9! Solo 0 o 5."
    ]
  },
  6: {
    numero: 6,
    nombre: "Tabla del 6",
    subtitulo: "Mesa de Crafteo y Espadas de Diamante de Steve",
    color: "#06B6D4",
    colorBg: "#ECFEFF",
    icono: "💎",
    mentor: "Steve Guerrero de Diamante",
    mentorRol: "Héroe del Overworld",
    avatarImg: "IMAGEN/avatar_steve.svg",
    objeto: "espadas de diamante",
    emojiObjeto: "💎",
    unidad: "espadas",
    universo: "Minecraft Overworld",
    poder: "Crafteo Legendario 6 Caras",
    sonido: "playSwordHit",
    patron: "Todos los resultados son pares. Al multiplicar por un número par, termina en ese mismo número (6 × 4 = 24, 6 × 8 = 48).",
    truco: "💡 Regla de Crafteo: Un cubo de Minecraft tiene 6 caras. Puedes multiplicar por 5 y sumarle una vez el número: 6 × 7 = 35 + 7 = 42.",
    pistas: [
      "6 caras tiene un bloque de diamante en Minecraft.",
      "¡Es el doble exacto de la tabla del 3 de Tony Stark!"
    ]
  },
  7: {
    numero: 7,
    nombre: "Tabla del 7",
    subtitulo: "Los 7 Relámpagos de Asgard de Thor",
    color: "#8B5CF6",
    colorBg: "#F5F3FF",
    icono: "⚡",
    mentor: "Thor (Dios del Trueno)",
    mentorRol: "Protector de los Nueve Reinos",
    avatarImg: "IMAGEN/avatar_thor.svg",
    objeto: "relámpagos de Mjolnir",
    emojiObjeto: "⚡",
    unidad: "rayos",
    universo: "Marvel Asgard",
    poder: "Tormenta de Asgard x7",
    sonido: "playThunderClap",
    patron: "Los resultados alternan impar y par: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.",
    truco: "💡 Hechizo de Odín: Descompón el 7 en 5 + 2. Para 7 × 8 calcula (5 × 8) + (2 × 8) = 40 + 16 = 56. ¡Y recuerda la racha mágica 5, 6, 7, 8 (56 = 7 × 8)!",
    pistas: [
      "¡Acuérdate de 7 × 7 = 49 (número de poder divino)!",
      "Por conmutatividad: 7 × 4 es igual a 4 × 7 = 28."
    ]
  },
  8: {
    numero: 8,
    nombre: "Tabla del 8",
    subtitulo: "Flechas Encantadas y Arañas de Alex",
    color: "#6366F1",
    colorBg: "#EEF2FF",
    icono: "🏹",
    mentor: "Alex Exploradora Experta",
    mentorRol: "Arquera Maestra de Minecraft",
    avatarImg: "IMAGEN/avatar_alex.svg",
    objeto: "flechas de diamante encantadas",
    emojiObjeto: "🏹",
    unidad: "flechas",
    universo: "Minecraft Aventuras",
    poder: "Disparo Óctuple Místico",
    sonido: "playMinecraftXp",
    patron: "Todos sus resultados son pares y sus unidades bajan de 2 en 2: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.",
    truco: "💡 Puntería de Alex: ¡Doble del doble del doble! Para 8 × 5: doble de 5 es 10, doble de 10 es 20, doble de 20 es 40.",
    pistas: [
      "Una araña de Minecraft tiene 8 patas: 3 arañas tienen 24 patas.",
      "Si sabes 4 × 6 = 24, la tabla del 8 es el doble exacto: 48."
    ]
  },
  9: {
    numero: 9,
    nombre: "Tabla del 9",
    subtitulo: "Las Garras de Vibranium de Pantera Negra",
    color: "#A855F7",
    colorBg: "#FAF5FF",
    icono: "🐾",
    mentor: "Black Panther (Rey de Wakanda)",
    mentorRol: "Guardián de Wakanda",
    avatarImg: "IMAGEN/avatar_pantera.svg",
    objeto: "garras de vibranium",
    emojiObjeto: "🐾",
    unidad: "marcas",
    universo: "Marvel Wakanda",
    poder: "Descarga Cinética Nónupla",
    sonido: "playWakandaCry",
    patron: "Las decenas suben de 0 a 9 y las unidades bajan de 9 a 0. ¡La suma de los dos dígitos SIEMPRE da 9!",
    truco: "💡 Sabiduría de Wakanda (Multiplicar por 10 y restar): Para calcular 9 × 7, haz (10 × 7) - 7 = 70 - 7 = 63. ¡Súper veloz y letal!",
    pistas: [
      "El truco de las garras: para 9 × 4 baja el 4° dedo. Quedan 3 a la izquierda y 6 a la derecha: ¡36!",
      "La primera cifra siempre es una unidad menor al número que multiplicas."
    ]
  },
  10: {
    numero: 10,
    nombre: "Tabla del 10",
    subtitulo: "Poder Cósmico de Capitana Marvel & Netherite",
    color: "#059669",
    colorBg: "#ECFDF5",
    icono: "⭐",
    mentor: "Capitana Marvel (Carol Danvers)",
    mentorRol: "Vengadora Cósmica",
    avatarImg: "IMAGEN/avatar_capitanamarvel.svg",
    objeto: "estrellas binarias de netherite",
    emojiObjeto: "⭐",
    unidad: "orbes",
    universo: "Marvel Cósmico & Nether",
    poder: "Rayo Binario Décuplo",
    sonido: "playMarvelLaser",
    patron: "¡Todos los resultados terminan en 0! Avanzas en decenas estelares: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
    truco: "💡 Salto Hiperespacial: Solo escribe el número original y agrégale un cero al final. Ejemplo: 10 × 8 = 80; 10 × 6 = 60.",
    pistas: [
      "Multiplicar por 10 transforma las unidades en decenas completas al instante.",
      "Es el multiplicador base de la energía cósmica de los Vengadores."
    ]
  }
};

// BANCO DE PREGUNTAS TIPO SIMCE 4° BÁSICO - MARVEL & MINECRAFT
const SIMCE_BANCO_COMPLETO = [
  {
    id: 1,
    contexto: "⛏️ Misión Minecraft: Crafteo de Manzanas Doradas",
    enunciado: "En la aldea de Minecraft, Steve y Alex guardan provisiones para resistir la noche. Tienen 4 cofres de madera noble y en cada cofre guardan exactamente 6 manzanas doradas encantadas. ¿Cuántas manzanas doradas guardaron en total?",
    svgType: "cofres_manzanas_doradas",
    opciones: [
      { id: "A", texto: "10 manzanas doradas", explicacionDistractor: "Cuidado: sumaste 4 + 6 en vez de multiplicar los 4 cofres por las 6 manzanas que hay en cada uno." },
      { id: "B", texto: "20 manzanas doradas", explicacionDistractor: "Cuidado: 4 × 5 = 20, pero en cada cofre colocaron 6 manzanas doradas." },
      { id: "C", texto: "24 manzanas doradas", explicacionDistractor: "¡Correcto! 4 cofres × 6 manzanas doradas = 24 manzanas en total." },
      { id: "D", texto: "28 manzanas doradas", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero la cantidad exacta por cofre era 6." }
    ],
    correcta: "C",
    explicacion: "Para calcular el total de manzanas, multiplicamos la cantidad de cofres por las manzanas dentro de cada uno: 4 cofres × 6 manzanas doradas = 24 manzanas doradas. También lo calculamos como suma iterada: 6 + 6 + 6 + 6 = 24."
  },
  {
    id: 2,
    contexto: "🔬 Protocolo Marvel: Hangar de Reactores de Tony Stark",
    enunciado: "En la Torre de los Vengadores, Tony Stark organiza los reactores Arc en el hangar en un arreglo rectangular de 7 filas. En cada fila instaló exactamente 8 reactores Arc de vibranium. ¿Cuántos reactores Arc hay en total en el hangar?",
    svgType: "filas_reactores_arc",
    opciones: [
      { id: "A", texto: "15 reactores Arc", explicacionDistractor: "Error común: sumar 7 + 8 = 15 en vez de multiplicar las 7 filas por 8 reactores." },
      { id: "B", texto: "54 reactores Arc", explicacionDistractor: "Cuidado: 6 × 9 = 54, pero la operación de Stark es 7 × 8." },
      { id: "C", texto: "56 reactores Arc", explicacionDistractor: "¡Correcto! 7 filas × 8 reactores = 56 reactores Arc." },
      { id: "D", texto: "64 reactores Arc", explicacionDistractor: "Cuidado: 8 × 8 = 64, pero eran 7 filas." }
    ],
    correcta: "C",
    explicacion: "En una formación en filas y columnas (arreglo rectangular), multiplicamos las filas por las columnas: 7 filas × 8 reactores Arc = 56 reactores. Recuerda la secuencia mágica: 5, 6, 7, 8 (56 = 7 × 8)."
  },
  {
    id: 3,
    contexto: "⚡ Misión Asgard: Pociones Mágicas de Thor",
    enunciado: "Para preparar a los guerreros de Asgard ante la invasión de monstruos, Thor colocó 5 bandejas de obsidiana. En cada bandeja ordenó exactamente 9 pociones mágicas de curación de Minecraft. ¿Cuántas pociones mágicas preparó Thor en total?",
    svgType: "bandejas_pociones_magicas",
    opciones: [
      { id: "A", texto: "45 pociones mágicas", explicacionDistractor: "¡Correcto! 5 bandejas × 9 pociones = 45 pociones de curación." },
      { id: "B", texto: "14 pociones mágicas", explicacionDistractor: "Error: sumaste 5 + 9 en vez de multiplicar los grupos." },
      { id: "C", texto: "40 pociones mágicas", explicacionDistractor: "Cuidado: 5 × 8 = 40, pero cada bandeja contenía 9 pociones." },
      { id: "D", texto: "50 pociones mágicas", explicacionDistractor: "Cuidado: 5 × 10 = 50, te pasaste por una bandeja." }
    ],
    correcta: "A",
    explicacion: "Multiplicamos el número de bandejas por la cantidad de pociones en cada una: 5 bandejas × 9 pociones = 45 pociones mágicas. Por la regla del 5, al multiplicar por un impar el producto termina en 5."
  },
  {
    id: 4,
    contexto: "🕷️ Patrulla Marvel: Redes Arácnidas y Creepers",
    enunciado: "Spider-Man y Ghost-Spider están protegiendo la ciudad de una oleada de Creepers fugitivos de Minecraft. Lanzaron 6 redes de telaraña electromagnética y en cada red atraparon a 5 Creepers. ¿Cuántos Creepers atraparon en total?",
    svgType: "redes_spiderman_creepers",
    opciones: [
      { id: "A", texto: "11 Creepers", explicacionDistractor: "Error: se sumó 6 + 5 en vez de multiplicar los grupos de captura." },
      { id: "B", texto: "30 Creepers", explicacionDistractor: "¡Correcto! 6 redes × 5 Creepers = 30 Creepers capturados." },
      { id: "C", texto: "35 Creepers", explicacionDistractor: "Cuidado: 7 × 5 = 35, pero los héroes lanzaron 6 redes." },
      { id: "D", texto: "25 Creepers", explicacionDistractor: "Cuidado: 5 × 5 = 25, pero fueron 6 redes." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos las 6 redes por los 5 Creepers atrapados en cada una: 6 redes × 5 Creepers = 30 Creepers en total. Al multiplicar 5 por un par (6), el resultado siempre termina en 0."
  },
  {
    id: 5,
    contexto: "💎 Expedición Minecraft: Galería Profunda de Diamantes",
    enunciado: "Steve descendió a la capa más profunda de una cueva de Minecraft con su pico de hierro. Excavó 8 galerías mineras iguales y en cada galería encontró y extrajo exactamente 6 bloques de mineral de diamante. ¿Cuántos bloques de diamante extrajo en total?",
    svgType: "mina_galerias_diamante",
    opciones: [
      { id: "A", texto: "14 bloques de diamante", explicacionDistractor: "Error: sumaste 8 + 6 = 14 en vez de calcular el producto." },
      { id: "B", texto: "42 bloques de diamante", explicacionDistractor: "Cuidado: 7 × 6 = 42, pero Steve excavó 8 galerías." },
      { id: "C", texto: "48 bloques de diamante", explicacionDistractor: "¡Correcto! 8 galerías × 6 bloques = 48 bloques de diamante." },
      { id: "D", texto: "54 bloques de diamante", explicacionDistractor: "Cuidado: 9 × 6 = 54, pero eran 8 galerías." }
    ],
    correcta: "C",
    explicacion: "Representa un producto de 8 grupos de 6: 8 galerías × 6 bloques de diamante = 48 bloques de diamante. Piensa en 8 × 6 como el doble de 4 × 6 (24 × 2 = 48)."
  },
  {
    id: 6,
    contexto: "🚀 Misión Vengadores: Asientos del Quinjet de S.H.I.E.L.D.",
    enunciado: "El Quinjet blindado de los Vengadores viaja a una misión espacial. Dentro de la nave hay 9 filas de asientos reforzados, y en cada fila hay exactamente 4 asientos para superhéroes. ¿Cuántos superhéroes pueden viajar sentados en esas 9 filas?",
    svgType: "asientos_quinjet_marvel",
    opciones: [
      { id: "A", texto: "13 héroes", explicacionDistractor: "Error: sumaste 9 + 4 = 13 en vez de multiplicar filas por asientos." },
      { id: "B", texto: "36 héroes", explicacionDistractor: "¡Correcto! 9 filas × 4 asientos = 36 héroes sentados." },
      { id: "C", texto: "32 héroes", explicacionDistractor: "Cuidado: 8 × 4 = 32, pero el Quinjet tiene 9 filas." },
      { id: "D", texto: "45 héroes", explicacionDistractor: "Cuidado: 9 × 5 = 45, pero cada fila tiene 4 asientos." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos las 9 filas por los 4 asientos de cada una: 9 × 4 = 36 héroes en el Quinjet. Aplica el truco del 9: 3 + 6 = 9 y las unidades bajan a 6."
  },
  {
    id: 7,
    contexto: "🐾 Bóveda de Wakanda: Ahorro de Lingotes de Vibranium",
    enunciado: "En la bóveda tecnológica de Wakanda, Black Panther y Shuri recolectan lingotes de vibranium para forjar escudos de defensa. Durante 7 semanas consecutivas ahorraron exactamente 300 lingotes de vibranium cada semana. ¿Cuántos lingotes de vibranium ahorraron en total?",
    svgType: "boveda_vibranium_wakanda",
    opciones: [
      { id: "A", texto: "1.800 lingotes", explicacionDistractor: "Cuidado: 6 × 300 = 1.800, pero la misión duró 7 semanas." },
      { id: "B", texto: "2.100 lingotes", explicacionDistractor: "¡Correcto! 7 semanas × 300 lingotes = 2.100 lingotes de vibranium." },
      { id: "C", texto: "2.400 lingotes", explicacionDistractor: "Cuidado: 8 × 300 = 2.400, pero fueron 7 semanas." },
      { id: "D", texto: "1.000 lingotes", explicacionDistractor: "Error en el cálculo y valor posicional de las centenas." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos 7 semanas × 300 lingotes. Multiplicamos primero 7 × 3 = 21 y agregamos los dos ceros de las centenas: 2.100 lingotes de vibranium en total para el reino de Wakanda."
  },
  {
    id: 8,
    contexto: "🏹 Armería Minecraft: Cofres de Flechas Mágicas de Alex",
    enunciado: "Alex necesita defender la fortaleza de Minecraft y llena 8 cajas de hierro en su armería. Si en cada caja guarda exactamente 10 flechas mágicas encantadas con fuego espectral, ¿cuántas flechas mágicas guardó Alex en total?",
    svgType: "cajas_flechas_alex",
    opciones: [
      { id: "A", texto: "18 flechas mágicas", explicacionDistractor: "Error: sumaste 8 + 10 = 18 en vez de multiplicar los 8 grupos de 10." },
      { id: "B", texto: "70 flechas mágicas", explicacionDistractor: "Cuidado: 7 × 10 = 70, pero Alex llenó 8 cajas." },
      { id: "C", texto: "80 flechas mágicas", explicacionDistractor: "¡Correcto! 8 cajas × 10 flechas = 80 flechas mágicas." },
      { id: "D", texto: "800 flechas mágicas", explicacionDistractor: "Cuidado: agregaste dos ceros en vez de uno solo." }
    ],
    correcta: "C",
    explicacion: "Al multiplicar por 10, conservamos el número y le agregamos un cero a la derecha: 8 cajas × 10 flechas = 80 flechas mágicas. ¡El arsenal de Alex está listo!"
  },
  {
    id: 9,
    contexto: "⭐ Vuelo Cósmico: Patrulla del Portal Nether",
    enunciado: "Para evitar que criaturas del Nether crucen el portal, 3 superhéroes (Capitana Marvel, Thor y Hulk) vuelan alrededor del portal. Cada héroe dio exactamente 7 vueltas completas de vigilancia a máxima velocidad. ¿Cuántas vueltas dieron en total entre los 3 superhéroes?",
    svgType: "patrulla_portal_nether",
    opciones: [
      { id: "A", texto: "10 vueltas", explicacionDistractor: "Error: sumaste 3 + 7 = 10 en vez de calcular el producto." },
      { id: "B", texto: "21 vueltas", explicacionDistractor: "¡Correcto! 3 héroes × 7 vueltas = 21 vueltas completas." },
      { id: "C", texto: "24 vueltas", explicacionDistractor: "Cuidado: 3 × 8 = 24, pero dieron 7 vueltas cada uno." },
      { id: "D", texto: "28 vueltas", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero fueron 3 héroes." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos la cantidad de superhéroes por las vueltas de cada uno: 3 héroes × 7 vueltas = 21 vueltas al portal en total. Corresponde a la suma iterada 7 + 7 + 7 = 21."
  },
  {
    id: 10,
    contexto: "📖 Sanctum Sanctorum: Libros de Hechizos del Doctor Strange",
    enunciado: "En la biblioteca mística del Sanctum Sanctorum de los Vengadores, Doctor Strange guarda libros de hechicería y encantamiento de Minecraft en 6 estantes mágicos flotantes. Si en cada estante colocó exactamente 8 libros antiguos, ¿cuántos libros mágicos hay en total?",
    svgType: "estantes_libros_strange",
    opciones: [
      { id: "A", texto: "14 libros mágicos", explicacionDistractor: "Error común: sumar 6 + 8 = 14 en vez de multiplicar los estantes por los libros." },
      { id: "B", texto: "42 libros mágicos", explicacionDistractor: "Cuidado: 6 × 7 = 42, pero en cada estante hay 8 libros." },
      { id: "C", texto: "48 libros mágicos", explicacionDistractor: "¡Correcto! 6 estantes × 8 libros = 48 libros de encantamiento." },
      { id: "D", texto: "56 libros mágicos", explicacionDistractor: "Cuidado: 7 × 8 = 56, pero eran 6 estantes." }
    ],
    correcta: "C",
    explicacion: "Calculamos el producto entre los estantes y los libros por estante: 6 estantes × 8 libros = 48 libros mágicos. Por propiedad conmutativa, es igual a 8 × 6 = 48."
  },
  {
    id: 11,
    contexto: "⛏️ Portal de Obsidiana: Steve y las Gemas del Nether",
    enunciado: "Para activar un portal interdimensional al Nether, Steve necesita organizar bloques de obsidiana pura en 6 pedestales. En cada pedestal debe colocar exactamente 7 bloques de obsidiana. ¿Cuántos bloques de obsidiana se necesitan en total?",
    svgType: "cofres_manzanas_doradas",
    opciones: [
      { id: "A", texto: "13 bloques", explicacionDistractor: "Error: sumaste 6 + 7 = 13 en vez de multiplicar pedestales por bloques." },
      { id: "B", texto: "36 bloques", explicacionDistractor: "Cuidado: 6 × 6 = 36, pero cada pedestal lleva 7 bloques." },
      { id: "C", texto: "42 bloques", explicacionDistractor: "¡Correcto! 6 pedestales × 7 bloques = 42 bloques de obsidiana." },
      { id: "D", texto: "48 bloques", explicacionDistractor: "Cuidado: 6 × 8 = 48, te pasaste por un bloque." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 6 pedestales × 7 bloques = 42 bloques de obsidiana para abrir el portal."
  },
  {
    id: 12,
    contexto: "🦅 Patrulla Aérea: Escuadrones de Drones de Falcon",
    enunciado: "Falcon coordina la vigilancia de la aldea con 4 escuadrones de drones de alta tecnología Stark. Si cada escuadrón tiene exactamente 9 drones de reconocimiento, ¿cuántos drones están patrullando en total?",
    svgType: "filas_quinjet_vengadores",
    opciones: [
      { id: "A", texto: "36 drones", explicacionDistractor: "¡Correcto! 4 escuadrones × 9 drones = 36 drones de reconocimiento." },
      { id: "B", texto: "13 drones", explicacionDistractor: "Error: sumaste 4 + 9 en vez de multiplicar los grupos." },
      { id: "C", texto: "32 drones", explicacionDistractor: "Cuidado: 4 × 8 = 32, pero eran 9 drones." },
      { id: "D", texto: "45 drones", explicacionDistractor: "Cuidado: 5 × 9 = 45, pero eran 4 escuadrones." }
    ],
    correcta: "A",
    explicacion: "Multiplicamos 4 escuadrones × 9 drones = 36 drones. ¡El cielo de la aldea está protegido!"
  },
  {
    id: 13,
    contexto: "💎 Bóveda del Ender: Perlas Mágicas de Alex",
    enunciado: "En su refugio subterráneo, Alex guarda perlas de teletransporte del Ender en 5 cofres especiales de netherite. En cada cofre colocó exactamente 8 perlas relucientes. ¿Cuántas perlas del Ender guardó en total?",
    svgType: "bandejas_pociones_magicas",
    opciones: [
      { id: "A", texto: "40 perlas", explicacionDistractor: "¡Correcto! 5 cofres × 8 perlas = 40 perlas del Ender." },
      { id: "B", texto: "13 perlas", explicacionDistractor: "Error: sumaste 5 + 8 en lugar de multiplicar." },
      { id: "C", texto: "35 perlas", explicacionDistractor: "Cuidado: 5 × 7 = 35, pero cada cofre tiene 8 perlas." },
      { id: "D", texto: "45 perlas", explicacionDistractor: "Cuidado: 5 × 9 = 45, pero eran 8 por cofre." }
    ],
    correcta: "A",
    explicacion: "Multiplicamos 5 cofres × 8 perlas = 40 perlas. Al multiplicar un par por 5 el resultado termina en cero: 40."
  },
  {
    id: 14,
    contexto: "🛡️ Generadores de Wakanda: Celdas de Poder",
    enunciado: "Shuri y Pantera Negra protegen la frontera de Wakanda con 9 generadores sónicos. Cada generador funciona con 6 celdas de poder de vibranium. ¿Cuántas celdas de poder se utilizan en total?",
    svgType: "boveda_vibranium_wakanda",
    opciones: [
      { id: "A", texto: "15 celdas", explicacionDistractor: "Error: sumaste 9 + 6 = 15 en vez de multiplicar." },
      { id: "B", texto: "54 celdas", explicacionDistractor: "¡Correcto! 9 generadores × 6 celdas = 54 celdas de vibranium." },
      { id: "C", texto: "63 celdas", explicacionDistractor: "Cuidado: 9 × 7 = 63, pero eran 6 celdas." },
      { id: "D", texto: "48 celdas", explicacionDistractor: "Cuidado: 8 × 6 = 48, pero eran 9 generadores." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos 9 generadores × 6 celdas = 54 celdas. Truco del 9: 5 + 4 = 9."
  },
  {
    id: 15,
    contexto: "🥕 Huertos de la Aldea: Zanahorias Doradas",
    enunciado: "Los aldeanos agricultores cultivan zanahorias doradas para comerciar con Steve. Tienen 8 huertos rectangulares y en cada huerto cosechan exactamente 9 zanahorias doradas al día. ¿Cuántas zanahorias cosechan al día?",
    svgType: "cajas_flechas_alex",
    opciones: [
      { id: "A", texto: "17 zanahorias", explicacionDistractor: "Error: sumaste 8 + 9 = 17 en vez del producto." },
      { id: "B", texto: "64 zanahorias", explicacionDistractor: "Cuidado: 8 × 8 = 64, pero eran 9 zanahorias por huerto." },
      { id: "C", texto: "72 zanahorias", explicacionDistractor: "¡Correcto! 8 huertos × 9 zanahorias = 72 zanahorias doradas." },
      { id: "D", texto: "81 zanahorias", explicacionDistractor: "Cuidado: 9 × 9 = 81, pero eran 8 huertos." }
    ],
    correcta: "C",
    explicacion: "8 huertos × 9 zanahorias = 72 zanahorias. Suma de dígitos: 7 + 2 = 9."
  },
  {
    id: 16,
    contexto: "🕸️ Trampas de Spider-Gwen: Redes Antimonstruos",
    enunciado: "Spider-Gwen instala trampas de telaraña en 7 callejones oscuros de la ciudad. En cada callejón coloca exactamente 7 redes elásticas. ¿Cuántas redes de telaraña instaló Spider-Gwen en total?",
    svgType: "redes_spiderman_creepers",
    opciones: [
      { id: "A", texto: "14 redes", explicacionDistractor: "Error común: sumar 7 + 7 = 14 en lugar de calcular 7 × 7." },
      { id: "B", texto: "42 redes", explicacionDistractor: "Cuidado: 6 × 7 = 42, pero instaló 7 redes en 7 callejones." },
      { id: "C", texto: "49 redes", explicacionDistractor: "¡Correcto! 7 callejones × 7 redes = 49 redes elásticas." },
      { id: "D", texto: "56 redes", explicacionDistractor: "Cuidado: 7 × 8 = 56, pero eran 7 × 7." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 7 × 7 = 49 redes. Es el cuadrado perfecto emblemático de la tabla del 7."
  },
  {
    id: 17,
    contexto: "🏹 Carcajes de Ojo de Halcón: Flechas de Choque",
    enunciado: "Ojo de Halcón prepara 3 carcajes tácticos antes de subir al Quinjet. En cada carcaj acomoda exactamente 8 flechas de choque eléctrico de Minecraft. ¿Cuántas flechas lleva en total?",
    svgType: "cajas_flechas_alex",
    opciones: [
      { id: "A", texto: "24 flechas", explicacionDistractor: "¡Correcto! 3 carcajes × 8 flechas = 24 flechas de choque." },
      { id: "B", texto: "11 flechas", explicacionDistractor: "Error: sumaste 3 + 8 en vez de multiplicar." },
      { id: "C", texto: "21 flechas", explicacionDistractor: "Cuidado: 3 × 7 = 21, pero lleva 8 por carcaj." },
      { id: "D", texto: "27 flechas", explicacionDistractor: "Cuidado: 3 × 9 = 27, pero eran 8." }
    ],
    correcta: "A",
    explicacion: "Multiplicamos 3 carcajes × 8 flechas = 24 flechas de choque eléctrico."
  },
  {
    id: 18,
    contexto: "🔥 Armería Netherite: Lingotes para Armaduras",
    enunciado: "En la forja de Netherite, Steve funde lingotes en 4 yunques de hierro. En cada yunque forja exactamente 8 lingotes de Netherite puro. ¿Cuántos lingotes forjó en total?",
    svgType: "filas_reactores_arc",
    opciones: [
      { id: "A", texto: "12 lingotes", explicacionDistractor: "Error: sumaste 4 + 8 en lugar del producto." },
      { id: "B", texto: "28 lingotes", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero forjó 8 lingotes por yunque." },
      { id: "C", texto: "32 lingotes", explicacionDistractor: "¡Correcto! 4 yunques × 8 lingotes = 32 lingotes de Netherite." },
      { id: "D", texto: "36 lingotes", explicacionDistractor: "Cuidado: 4 × 9 = 36, pero eran 8 lingotes." }
    ],
    correcta: "C",
    explicacion: "4 yunques × 8 lingotes = 32 lingotes de Netherite puro."
  },
  {
    id: 19,
    contexto: "⚡ Relámpagos de Mjolnir: Tormenta sobre Asgard",
    enunciado: "Thor desata el poder del trueno en 6 tormentas consecutivas para ahuyentar a los esqueletos de Minecraft. En cada tormenta caen exactamente 9 relámpagos certeros. ¿Cuántos relámpagos cayeron en total?",
    svgType: "bandejas_pociones_magicas",
    opciones: [
      { id: "A", texto: "15 relámpagos", explicacionDistractor: "Error: sumaste 6 + 9 en vez de multiplicar." },
      { id: "B", texto: "48 relámpagos", explicacionDistractor: "Cuidado: 6 × 8 = 48, pero cayeron 9 relámpagos por tormenta." },
      { id: "C", texto: "54 relámpagos", explicacionDistractor: "¡Correcto! 6 tormentas × 9 relámpagos = 54 relámpagos." },
      { id: "D", texto: "63 relámpagos", explicacionDistractor: "Cuidado: 7 × 9 = 63, pero fueron 6 tormentas." }
    ],
    correcta: "C",
    explicacion: "6 tormentas × 9 relámpagos = 54 relámpagos de Thor."
  },
  {
    id: 20,
    contexto: "🕯️ Minas Profundas: Antorchas de Redstone",
    enunciado: "Alex ilumina 7 túneles de una mina abandonada para encontrar diamantes. Si en cada túnel coloca exactamente 6 antorchas de redstone, ¿cuántas antorchas usó en total?",
    svgType: "estantes_libros_strange",
    opciones: [
      { id: "A", texto: "13 antorchas", explicacionDistractor: "Error: sumaste 7 + 6 en vez del producto." },
      { id: "B", texto: "35 antorchas", explicacionDistractor: "Cuidado: 7 × 5 = 35, pero colocó 6 por túnel." },
      { id: "C", texto: "42 antorchas", explicacionDistractor: "¡Correcto! 7 túneles × 6 antorchas = 42 antorchas de redstone." },
      { id: "D", texto: "49 antorchas", explicacionDistractor: "Cuidado: 7 × 7 = 49, pero eran 6 antorchas." }
    ],
    correcta: "C",
    explicacion: "7 túneles × 6 antorchas = 42 antorchas de redstone."
  },
  {
    id: 21,
    contexto: "🏹 Defensa de la Aldea: Flechas Espectrales de Steve",
    enunciado: "Steve construye 3 torres de vigilancia alrededor de la aldea de Minecraft. En cada torre coloca exactamente 9 flechas espectrales encantadas para repeler zombis en la noche. ¿Cuántas flechas espectrales colocó Steve en total?",
    svgType: "cajas_flechas_alex",
    opciones: [
      { id: "A", texto: "12 flechas espectrales", explicacionDistractor: "Error: sumaste 3 + 9 = 12 en vez de multiplicar torres por flechas." },
      { id: "B", texto: "24 flechas espectrales", explicacionDistractor: "Cuidado: 3 × 8 = 24, pero Steve colocó 9 flechas por torre." },
      { id: "C", texto: "27 flechas espectrales", explicacionDistractor: "¡Correcto! 3 torres × 9 flechas = 27 flechas espectrales." },
      { id: "D", texto: "30 flechas espectrales", explicacionDistractor: "Cuidado: 3 × 10 = 30, te pasaste por una torre." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 3 torres × 9 flechas = 27 flechas espectrales. Suma iterada: 9 + 9 + 9 = 27."
  },
  {
    id: 22,
    contexto: "⚡ Martillo Mjolnir: Rayos de Tormenta de Thor",
    enunciado: "En la batalla contra los invasores oscuros, Thor lanza 7 ráfagas de truenos con el Mjolnir. En cada ráfaga caen exactamente 4 relámpagos que destruyen portales enemigos. ¿Cuántos relámpagos cayeron en total?",
    svgType: "bandejas_pociones_magicas",
    opciones: [
      { id: "A", texto: "11 relámpagos", explicacionDistractor: "Error: sumaste 7 + 4 en vez de calcular el producto." },
      { id: "B", texto: "24 relámpagos", explicacionDistractor: "Cuidado: 6 × 4 = 24, pero fueron 7 ráfagas." },
      { id: "C", texto: "28 relámpagos", explicacionDistractor: "¡Correcto! 7 ráfagas × 4 relámpagos = 28 relámpagos destructores." },
      { id: "D", texto: "32 relámpagos", explicacionDistractor: "Cuidado: 8 × 4 = 32, pero eran 7 ráfagas." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 7 ráfagas × 4 relámpagos = 28 relámpagos. Recuerda que el doble de 7 es 14, y el doble de 14 es 28."
  },
  {
    id: 23,
    contexto: "💎 Forja de Netherite: Espadas Legendarias de Alex",
    enunciado: "Alex craftea armamento de diamante en 4 mesas de trabajo. En cada mesa de trabajo necesita 6 diamantes pulidos para forjar una espada legendaria. ¿Cuántos diamantes utilizó Alex en total en las 4 mesas?",
    svgType: "mina_galerias_diamante",
    opciones: [
      { id: "A", texto: "10 diamantes pulidos", explicacionDistractor: "Error: sumaste 4 + 6 en vez de multiplicar 4 mesas por 6 diamantes." },
      { id: "B", texto: "20 diamantes pulidos", explicacionDistractor: "Cuidado: 4 × 5 = 20, pero usó 6 diamantes por mesa." },
      { id: "C", texto: "24 diamantes pulidos", explicacionDistractor: "¡Correcto! 4 mesas × 6 diamantes = 24 diamantes pulidos." },
      { id: "D", texto: "28 diamantes pulidos", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero eran 6 por mesa." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 4 mesas × 6 diamantes = 24 diamantes pulidos. 6 + 6 + 6 + 6 = 24."
  },
  {
    id: 24,
    contexto: "🛡️ Hangar de Escudos: Vibranium del Capitán América",
    enunciado: "En la base secreta de los Vengadores, el Capitán América organiza escudos de reserva en 8 repisas de titanio. En cada repisa coloca exactamente 5 escudos redondos de vibranium. ¿Cuántos escudos guardó en total?",
    svgType: "boveda_vibranium_wakanda",
    opciones: [
      { id: "A", texto: "13 escudos", explicacionDistractor: "Error: sumaste 8 + 5 = 13 en vez de multiplicar las repisas por los escudos." },
      { id: "B", texto: "35 escudos", explicacionDistractor: "Cuidado: 7 × 5 = 35, pero son 8 repisas." },
      { id: "C", texto: "40 escudos", explicacionDistractor: "¡Correcto! 8 repisas × 5 escudos = 40 escudos de vibranium." },
      { id: "D", texto: "45 escudos", explicacionDistractor: "Cuidado: 9 × 5 = 45, pero eran 8 repisas." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 8 repisas × 5 escudos = 40 escudos. Toda multiplicación de 5 por un número par termina en cero (40)."
  },
  {
    id: 25,
    contexto: "📦 Cajas de Shulker: Bloques de Obsidiana",
    enunciado: "En su base de Minecraft, Steve guarda bloques de obsidiana en 9 cajas de Shulker moradas. Si en cada caja almacena exactamente 8 bloques de obsidiana, ¿cuántos bloques de obsidiana guardó en total?",
    svgType: "cofres_manzanas_doradas",
    opciones: [
      { id: "A", texto: "17 bloques de obsidiana", explicacionDistractor: "Error: sumaste 9 + 8 en vez de multiplicar las cajas por bloques." },
      { id: "B", texto: "64 bloques de obsidiana", explicacionDistractor: "Cuidado: 8 × 8 = 64, pero eran 9 cajas." },
      { id: "C", texto: "72 bloques de obsidiana", explicacionDistractor: "¡Correcto! 9 cajas × 8 bloques = 72 bloques de obsidiana." },
      { id: "D", texto: "81 bloques de obsidiana", explicacionDistractor: "Cuidado: 9 × 9 = 81, pero eran 8 bloques por caja." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 9 cajas × 8 bloques = 72 bloques. Truco del 9: 7 + 2 = 9."
  },
  {
    id: 26,
    contexto: "🦾 Armaduras Stark: Nanorobots de Iron Man",
    enunciado: "Tony Stark programa 5 unidades de nanorobots para reparar el traje de Iron Man. Cada unidad contiene exactamente 7 cápsulas de energía de plasma. ¿Cuántas cápsulas de energía de plasma hay en total en las 5 unidades?",
    svgType: "filas_reactores_arc",
    opciones: [
      { id: "A", texto: "12 cápsulas de plasma", explicacionDistractor: "Error: sumaste 5 + 7 en vez de calcular el producto." },
      { id: "B", texto: "30 cápsulas de plasma", explicacionDistractor: "Cuidado: 5 × 6 = 30, pero cada unidad tiene 7 cápsulas." },
      { id: "C", texto: "35 cápsulas de plasma", explicacionDistractor: "¡Correcto! 5 unidades × 7 cápsulas = 35 cápsulas de plasma." },
      { id: "D", texto: "40 cápsulas de plasma", explicacionDistractor: "Cuidado: 5 × 8 = 40, te pasaste por una unidad." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 5 unidades × 7 cápsulas = 35 cápsulas de energía de plasma. 5 × impar termina en 5."
  },
  {
    id: 27,
    contexto: "🕷️ Patrulla Arácnida: Drones de Spider-Man",
    enunciado: "Spider-Man despliega 8 mini-drones araña en los rascacielos de la ciudad. Si cada mini-dron vigila exactamente 8 ventanas de seguridad al mismo tiempo, ¿cuántas ventanas están bajo vigilancia en total?",
    svgType: "redes_spiderman_creepers",
    opciones: [
      { id: "A", texto: "16 ventanas", explicacionDistractor: "Error común: sumaste 8 + 8 = 16 en vez de multiplicar 8 × 8." },
      { id: "B", texto: "56 ventanas", explicacionDistractor: "Cuidado: 7 × 8 = 56, pero eran 8 drones por 8 ventanas." },
      { id: "C", texto: "64 ventanas", explicacionDistractor: "¡Correcto! 8 mini-drones × 8 ventanas = 64 ventanas vigiladas." },
      { id: "D", texto: "72 ventanas", explicacionDistractor: "Cuidado: 8 × 9 = 72, pero eran 8 × 8." }
    ],
    correcta: "C",
    explicacion: "8 mini-drones × 8 ventanas = 64 ventanas protegidas. Es el cuadrado perfecto de la tabla del 8."
  },
  {
    id: 28,
    contexto: "🌟 Cristales del End: Orbes de Experiencia",
    enunciado: "Al purificar la dimensión del Fin de Minecraft, Alex y Steve recolectan orbes de energía en 6 pilares de obsidiana. Si en cada pilar consiguen exactamente 10 orbes brillantes de experiencia, ¿cuántos orbes de experiencia consiguieron en total?",
    svgType: "patrulla_portal_nether",
    opciones: [
      { id: "A", texto: "16 orbes", explicacionDistractor: "Error: sumaste 6 + 10 = 16 en vez de multiplicar." },
      { id: "B", texto: "50 orbes", explicacionDistractor: "Cuidado: 5 × 10 = 50, pero eran 6 pilares." },
      { id: "C", texto: "60 orbes", explicacionDistractor: "¡Correcto! 6 pilares × 10 orbes = 60 orbes brillantes de experiencia." },
      { id: "D", texto: "600 orbes", explicacionDistractor: "Cuidado: agregaste dos ceros en vez de uno." }
    ],
    correcta: "C",
    explicacion: "Multiplicamos 6 pilares × 10 orbes = 60 orbes de experiencia para subir de nivel."
  }
];

// Función para obtener 10 preguntas aleatorias y variadas para cada intento del SIMCE
// Permite excluir los IDs del intento anterior para garantizar preguntas 100% distintas al reintentar
function obtenerDiezPreguntasSimceAleatorias(excluirIds = []) {
  let pool = SIMCE_BANCO_COMPLETO;
  
  if (Array.isArray(excluirIds) && excluirIds.length > 0) {
    const filtradas = pool.filter(q => !excluirIds.includes(q.id));
    if (filtradas.length >= 10) {
      pool = filtradas;
    } else {
      // Si quedaran menos de 10 disponibles, mezclar con las restantes barajadas al final
      const restantes = pool.filter(q => excluirIds.includes(q.id));
      for (let i = restantes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [restantes[i], restantes[j]] = [restantes[j], restantes[i]];
      }
      pool = [...filtradas, ...restantes];
    }
  }

  const copia = [...pool];
  // Barajado Fisher-Yates
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia.slice(0, 10).map((q, idx) => ({ ...q, indiceActual: idx + 1 }));
}

// Preguntas activas del ensayo SIMCE (se regeneran dinámicamente)
let SIMCE_PREGUNTAS = obtenerDiezPreguntasSimceAleatorias();

// Casos para el minijuego "Detective Matemático"
const CASOS_DETECTIVE = [
  {
    id: 1,
    pistas: [
      "Soy un número PAR mayor que 20 y menor que 30.",
      "Si me buscas en la tabla del 4, ¡ahí estoy!",
      "Si me buscas en la tabla del 6, ¡también estoy!",
      "La suma de mis dígitos es 6 (2 + 4)."
    ],
    opciones: [20, 24, 28, 32],
    respuestaCorrecta: 24,
    explicacion: "¡Elemental, detective! El número 24 está en la tabla del 4 (4 × 6 = 24) y en la tabla del 6 (6 × 4 = 24)."
  },
  {
    id: 2,
    pistas: [
      "Soy un número de dos cifras entre 30 y 40.",
      "Termino en número par.",
      "Soy el resultado de multiplicar un número por sí mismo (cuadrado perfecto).",
      "Estoy en la tabla del 9 y la suma de mis dígitos da 9."
    ],
    opciones: [32, 36, 40, 45],
    respuestaCorrecta: 36,
    explicacion: "¡Muy bien! 6 × 6 = 36 y además 9 × 4 = 36. La suma de sus dígitos 3 + 6 = 9."
  },
  {
    id: 3,
    pistas: [
      "Soy un número mayor que 40 y menor que 50.",
      "Termino en 5.",
      "Estoy en la tabla del 5 y también en la tabla del 9.",
      "Si me divides por 5, obtienes 9."
    ],
    opciones: [35, 40, 45, 50],
    respuestaCorrecta: 45,
    explicacion: "¡Excelente deducción! 5 × 9 = 45 y 9 × 5 = 45."
  },
  {
    id: 4,
    pistas: [
      "Mis dígitos son números seguidos: 5 y 6.",
      "Soy el producto de multiplicar dos números seguidos: 7 y 8.",
      "Soy mayor que 50.",
      "Estoy en la tabla del 7 y del 8."
    ],
    opciones: [48, 54, 56, 63],
    respuestaCorrecta: 56,
    explicacion: "¡Brillante! El famoso truco: 5, 6, 7, 8 -> 56 = 7 × 8."
  },
  {
    id: 5,
    pistas: [
      "Soy un número de dos cifras iguales (ejemplo: 11, 22, 33...).",
      "Estoy en la tabla del 7.",
      "Soy el resultado de 7 × 7.",
      "Soy menor que 50."
    ],
    opciones: [42, 49, 56, 63],
    respuestaCorrecta: 49,
    explicacion: "7 × 7 = 49. Aunque sus cifras son 4 y 9, es el producto impar clave del 7."
  }
];

// Lista de Logros e Insignias del sistema
const LISTA_LOGROS = [
  {
    id: "primer_paso",
    titulo: "Primer Paso Matemático",
    descripcion: "Ingresaste con éxito a la plataforma Mis Tablas.",
    icono: "🚀",
    desbloqueado: true
  },
  {
    id: "memoria_genio",
    titulo: "Mente Brillante",
    descripcion: "Completaste una partida de Memoria Matemática.",
    icono: "🧠",
    desbloqueado: false
  },
  {
    id: "atrapa_burbujas",
    titulo: "Cazador de Respuestas",
    descripcion: "Acertaste 5 multiplicaciones seguidas en Atrapa el Resultado.",
    icono: "🎈",
    desbloqueado: false
  },
  {
    id: "gran_arquitecto",
    titulo: "Constructor Numérico",
    descripcion: "Construiste correctamente una multiplicación visual.",
    icono: "🧱",
    desbloqueado: false
  },
  {
    id: "super_detective",
    titulo: "Sherlock de los Números",
    descripcion: "Resolviste un misterio en Detective Matemático.",
    icono: "🕵️",
    desbloqueado: false
  },
  {
    id: "reloj_veloz",
    titulo: "Rayo Veloz",
    descripcion: "Superaste el Desafío Contra el Reloj con racha de aciertos.",
    icono: "⚡",
    desbloqueado: false
  },
  {
    id: "maestro_tablas",
    titulo: "Explorador de Tablas",
    descripcion: "Practicaste y exploraste 3 o más tablas de multiplicar.",
    icono: "📘",
    desbloqueado: false
  },
  {
    id: "simce_campeon",
    titulo: "Héroe del SIMCE",
    descripcion: "Rendiste el Ensayo SIMCE y obtuviste nivel Adecuado o Elemental.",
    icono: "🎓",
    desbloqueado: false
  }
];
