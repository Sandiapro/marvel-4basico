/**
 * BASE DE DATOS EDUCATIVA Y PEDAGÓGICA - MIS TABLAS
 * Contenido adaptado a las Bases Curriculares de 4° Básico (Chile / SIMCE)
 */

// Información didáctica de las Tablas de Multiplicar del 2 al 10
const TABLAS_INFO = {
  2: {
    numero: 2,
    nombre: "Tabla del 2",
    subtitulo: "El reino de los pares y el doble",
    color: "#3B82F6",
    colorBg: "#EFF6FF",
    icono: "👟",
    objeto: "zapatillas",
    emojiObjeto: "👟",
    unidad: "pares",
    patron: "Todos los resultados terminan en número par: 0, 2, 4, 6 u 8. ¡Multiplicar por 2 es exactamente calcular el DOBLE de un número!",
    truco: "💡 Truco Mágico: Para multiplicar cualquier número por 2, solo súmalo consigo mismo. Por ejemplo, 2 × 7 es igual a 7 + 7 = 14.",
    pistas: [
      "Cuenta de 2 en 2 como al saltar la cuerda: 2, 4, 6, 8, 10...",
      "Todo número multiplicado por 2 siempre es un número PAR."
    ]
  },
  3: {
    numero: 3,
    nombre: "Tabla del 3",
    subtitulo: "El triple y los tríos musicales",
    color: "#10B981",
    colorBg: "#ECFDF5",
    icono: "🍀",
    objeto: "tréboles",
    emojiObjeto: "🍀",
    unidad: "hojas",
    patron: "La suma de los dígitos de cualquier resultado siempre da un múltiplo de 3 (3, 6 o 9). Por ejemplo: 3 × 7 = 21, y si sumas 2 + 1 = 3.",
    truco: "💡 Truco Mágico: Multiplicar por 3 es calcular el TRIPLE. Puedes calcular el doble (×2) y sumarle una vez más el número. Ejemplo: 3 × 6 = (2 × 6) + 6 = 12 + 6 = 18.",
    pistas: [
      "Avanza dando saltos de 3 en 3: 3, 6, 9, 12, 15, 18...",
      "Comprueba sumando las cifras del resultado: ¡siempre suman 3, 6 o 9!"
    ]
  },
  4: {
    numero: 4,
    nombre: "Tabla del 4",
    subtitulo: "El doble del doble",
    color: "#8B5CF6",
    colorBg: "#F5F3FF",
    icono: "🚗",
    objeto: "autos",
    emojiObjeto: "🚗",
    unidad: "ruedas",
    patron: "Todos los resultados terminan en números pares: 0, 4, 8, 2, 6. ¡Es exactamente el doble de los resultados de la tabla del 2!",
    truco: "💡 Truco Mágico: ¡Haz el doble dos veces! Si quieres calcular 4 × 7, primero saca el doble de 7 (14) y luego el doble de 14 (28). ¡Listo!",
    pistas: [
      "Un auto tiene 4 ruedas, una mesa tiene 4 patas.",
      "Si ya sabes la tabla del 2, ¡solo duplica el resultado!"
    ]
  },
  5: {
    numero: 5,
    nombre: "Tabla del 5",
    subtitulo: "El reloj y las manos",
    color: "#F59E0B",
    colorBg: "#FFFBEB",
    icono: "🖐️",
    objeto: "manos",
    emojiObjeto: "⭐",
    unidad: "dedos",
    patron: "¡Los resultados SIEMPRE terminan en 0 o en 5, de forma intercalada! (5, 10, 15, 20, 25, 30...)",
    truco: "💡 Truco Mágico: ¡Es igual a leer los minutos en el reloj! Además, si multiplicas por un número par termina en 0 (5 × 6 = 30). Si es impar, termina en 5 (5 × 7 = 35).",
    pistas: [
      "Cada mano tiene 5 dedos. 3 manos tienen 5 + 5 + 5 = 15 dedos.",
      "Nunca terminará en 1, 2, 3, 4, 6, 7, 8 o 9. ¡Solo en 0 o 5!"
    ]
  },
  6: {
    numero: 6,
    nombre: "Tabla del 6",
    subtitulo: "El doble de la tabla del 3",
    color: "#06B6D4",
    colorBg: "#ECFEFF",
    icono: "🎲",
    objeto: "dados",
    emojiObjeto: "🎲",
    unidad: "caras",
    patron: "Todos sus resultados son pares. Si multiplicas 6 por un número par, el resultado termina en ese mismo número: 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48.",
    truco: "💡 Truco Mágico: ¡Es el doble de la tabla del 3! O puedes multiplicar por 5 y sumarle una vez el número: 6 × 7 = (5 × 7) + 7 = 35 + 7 = 42.",
    pistas: [
      "Piensa en los paquetes de 6 lápices o una caja de 6 huevos.",
      "Avanza sumando 6 cada vez: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60."
    ]
  },
  7: {
    numero: 7,
    nombre: "Tabla del 7",
    subtitulo: "Los días de la semana",
    color: "#EC4899",
    colorBg: "#FDF2F8",
    icono: "📅",
    objeto: "semanas",
    emojiObjeto: "🌟",
    unidad: "días",
    patron: "Cada semana completa tiene 7 días. Los resultados alternan impar, par, impar, par: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.",
    truco: "💡 Truco Mágico: ¡Descompón el 7 en 5 + 2! Para 7 × 8, calcula (5 × 8) + (2 × 8) = 40 + 16 = 56. ¡Mucho más fácil y rápido!",
    pistas: [
      "¡Acuérdate de 7 × 7 = 49 (un número muy especial)! Y 7 × 8 = 56 (5, 6, 7, 8 seguidos).",
      "Usa la propiedad conmutativa: 7 × 4 es lo mismo que 4 × 7 = 28."
    ]
  },
  8: {
    numero: 8,
    nombre: "Tabla del 8",
    subtitulo: "El triple doble o los tentáculos del pulpo",
    color: "#6366F1",
    colorBg: "#EEF2FF",
    icono: "🐙",
    objeto: "pulpos",
    emojiObjeto: "🐙",
    unidad: "tentáculos",
    patron: "Todos los resultados son pares y sus unidades bajan de 2 en 2: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 (8, 6, 4, 2, 0).",
    truco: "💡 Truco Mágico: ¡Doble del doble del doble! Para 8 × 5: doble de 5 es 10, doble de 10 es 20, doble de 20 es 40. ¡O es el doble de la tabla del 4!",
    pistas: [
      "Si sabes 4 × 6 = 24, entonces 8 × 6 es el doble: 48.",
      "Un pulpo tiene 8 tentáculos: 3 pulpos tienen 3 × 8 = 24 tentáculos."
    ]
  },
  9: {
    numero: 9,
    nombre: "Tabla del 9",
    subtitulo: "El truco de los dedos y los nueves mágicos",
    color: "#F97316",
    colorBg: "#FFF7ED",
    icono: "✨",
    objeto: "estrellas mágicas",
    emojiObjeto: "✨",
    unidad: "destellos",
    patron: "¡Las decenas suben de 0 a 9 mientras las unidades bajan de 9 a 0! Además, la suma de las dos cifras del resultado SIEMPRE da 9 (1+8=9, 2+7=9, 3+6=9...).",
    truco: "💡 Truco Mágico de multiplicar por 10 y restar: Para calcular 9 × 7, haz (10 × 7) - 7 = 70 - 7 = 63. ¡Súper rápido y no falla nunca!",
    pistas: [
      "El truco de las manos: Pon tus 10 dedos. Para 9 × 4, baja el 4° dedo. Quedan 3 dedos a la izquierda y 6 a la derecha: ¡36!",
      "La primera cifra siempre es uno menos que el número por el que multiplicas."
    ]
  },
  10: {
    numero: 10,
    nombre: "Tabla del 10",
    subtitulo: "La reina de los ceros y las decenas",
    color: "#059669",
    colorBg: "#ECFDF5",
    icono: "🔟",
    objeto: "decenas",
    emojiObjeto: "🪙",
    unidad: "unidades",
    patron: "¡Todos los resultados terminan en 0! Avanzas de decena en decena: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
    truco: "💡 Truco Mágico: Solo escribe el número original y agrégale un cero al final. Ejemplo: 10 × 8 = 80; 10 × 4 = 40.",
    pistas: [
      "Es contar monedas de \$10: una moneda son 10, dos son 20, tres son 30...",
      "Multiplicar por 10 transforma las unidades en decenas completas."
    ]
  }
};

// 10 Preguntas contextualizadas tipo SIMCE de 4° Básico
const SIMCE_PREGUNTAS = [
  {
    id: 1,
    contexto: "Compras y Precios en la Feria Escolar",
    enunciado: "En la feria de la escuela, Matías compró 4 bolsas de manzanas para compartir con sus amigos. Si cada bolsa contiene 6 manzanas, ¿cuántas manzanas compró Matías en total?",
    svgType: "bolsas_manzanas",
    opciones: [
      { id: "A", texto: "10 manzanas", explicacionDistractor: "Cuidado: aquí se sumaron los números 4 + 6 en vez de multiplicar las 4 bolsas por sus 6 manzanas." },
      { id: "B", texto: "20 manzanas", explicacionDistractor: "Cuidado: 4 × 5 = 20, pero cada bolsa tenía 6 manzanas." },
      { id: "C", texto: "24 manzanas", explicacionDistractor: "¡Correcto!" },
      { id: "D", texto: "28 manzanas", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero las manzanas por bolsa eran 6." }
    ],
    correcta: "C",
    explicacion: "Para encontrar el total, debemos multiplicar la cantidad de bolsas por la cantidad de manzanas que hay en cada una: 4 bolsas × 6 manzanas = 24 manzanas. También podemos calcularlo como suma repetida: 6 + 6 + 6 + 6 = 24."
  },
  {
    id: 2,
    contexto: "Organización de Filas en el Gimnasio",
    enunciado: "Para el acto del Día del Libro, el profesor de educación física ordenó las sillas del gimnasio en 7 filas. En cada fila colocó exactamente 8 sillas. ¿Cuántas sillas colocó en total?",
    svgType: "filas_sillas",
    opciones: [
      { id: "A", texto: "15 sillas", explicacionDistractor: "Error común: sumar 7 + 8 = 15 en vez de multiplicar los grupos." },
      { id: "B", texto: "54 sillas", explicacionDistractor: "Cuidado: 6 × 9 = 54, pero la operación es 7 × 8." },
      { id: "C", texto: "56 sillas", explicacionDistractor: "¡Correcto!" },
      { id: "D", texto: "64 sillas", explicacionDistractor: "Cuidado: 8 × 8 = 64, pero eran 7 filas." }
    ],
    correcta: "C",
    explicacion: "Cuando tenemos una distribución en filas y columnas (arreglo rectangular), multiplicamos las filas por las columnas: 7 filas × 8 sillas = 56 sillas. Un truco para recordar 7 × 8 es la secuencia 5, 6, 7, 8 (56 = 7 × 8)."
  },
  {
    id: 3,
    contexto: "Repostería y Convivencia Escolar",
    enunciado: "La tía Carmen horneó queques para la convivencia del 4° básico. Llenó 5 bandejas y en cada bandeja colocó 9 quequitos. ¿Cuántos quequitos horneó en total?",
    svgType: "bandejas_queques",
    opciones: [
      { id: "A", texto: "45 quequitos", explicacionDistractor: "¡Correcto!" },
      { id: "B", texto: "14 quequitos", explicacionDistractor: "Error: sumaste 5 + 9 en lugar de multiplicar." },
      { id: "C", texto: "40 quequitos", explicacionDistractor: "Cuidado: 5 × 8 = 40, pero eran 9 quequitos por bandeja." },
      { id: "D", texto: "50 quequitos", explicacionDistractor: "Cuidado: 5 × 10 = 50, se pasó por una bandeja." }
    ],
    correcta: "A",
    explicacion: "Multiplicamos el número de bandejas por la cantidad de quequitos en cada una: 5 bandejas × 9 quequitos = 45 quequitos. Con la tabla del 5, sabemos que al multiplicar por un número impar termina en 5."
  },
  {
    id: 4,
    contexto: "Colección y Álbum de Láminas",
    enunciado: "Sofía está completando su álbum de animales chilenos. Su abuelita le regaló 6 sobres de láminas. Si cada sobre trae 5 láminas, ¿cuántas láminas nuevas recibió Sofía?",
    svgType: "sobres_laminas",
    opciones: [
      { id: "A", texto: "11 láminas", explicacionDistractor: "Error: se sumó 6 + 5 en vez de multiplicar." },
      { id: "B", texto: "30 láminas", explicacionDistractor: "¡Correcto!" },
      { id: "C", texto: "35 láminas", explicacionDistractor: "Cuidado: 7 × 5 = 35, pero eran 6 sobres." },
      { id: "D", texto: "25 láminas", explicacionDistractor: "Cuidado: 5 × 5 = 25, pero eran 6 sobres." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos los 6 sobres por las 5 láminas de cada sobre: 6 × 5 = 30 láminas. Como 6 es un número par, el producto con 5 termina en 0."
  },
  {
    id: 5,
    contexto: "Huerta Escolar Ecológica",
    enunciado: "En la huerta del colegio, los estudiantes de 4° básico plantaron lechugas en 8 hileras iguales. Si en cada hilera plantaron 6 lechugas, ¿cuántas lechugas plantaron en total?",
    svgType: "huerta_lechugas",
    opciones: [
      { id: "A", texto: "14 lechugas", explicacionDistractor: "Error: se sumaron las hileras con las plantas (8 + 6 = 14)." },
      { id: "B", texto: "42 lechugas", explicacionDistractor: "Cuidado: 7 × 6 = 42, pero eran 8 hileras." },
      { id: "C", texto: "48 lechugas", explicacionDistractor: "¡Correcto!" },
      { id: "D", texto: "54 lechugas", explicacionDistractor: "Cuidado: 9 × 6 = 54, pero eran 8 hileras." }
    ],
    correcta: "C",
    explicacion: "Representa un arreglo rectangular: 8 hileras × 6 lechugas = 48 lechugas. Podemos pensar en 8 × 6 como el doble de 4 × 6 (24 × 2 = 48)."
  },
  {
    id: 6,
    contexto: "Transporte Escolar y Excursión",
    enunciado: "Para ir de paseo al Museo Interactivo Mirador (MIM), los alumnos subieron a un bus que tiene 9 filas de asientos dobles a cada lado (4 asientos por fila en total). ¿Cuántos pasajeros sentados pueden viajar en esas 9 filas?",
    svgType: "bus_escolar",
    opciones: [
      { id: "A", texto: "13 pasajeros", explicacionDistractor: "Error: se sumaron 9 + 4 = 13 en vez de multiplicar." },
      { id: "B", texto: "36 pasajeros", explicacionDistractor: "¡Correcto!" },
      { id: "C", texto: "32 pasajeros", explicacionDistractor: "Cuidado: 8 × 4 = 32, pero eran 9 filas." },
      { id: "D", texto: "45 pasajeros", explicacionDistractor: "Cuidado: 9 × 5 = 45, pero eran 4 asientos por fila." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos las 9 filas por los 4 asientos de cada fila: 9 × 4 = 36 pasajeros. Recuerda el truco de la tabla del 9: 3 + 6 = 9."
  },
  {
    id: 7,
    contexto: "Ahorro y Metas Personales",
    enunciado: "Joaquín está ahorrando para comprar un libro de acertijos matemáticos. Durante 7 semanas consecutivas ahorró exactamente \$300 cada semana. ¿Cuánto dinero ahorró en total?",
    svgType: "ahorro_alcancia",
    opciones: [
      { id: "A", texto: "\$1.800", explicacionDistractor: "Cuidado: 6 × 300 = 1.800, pero ahorró durante 7 semanas." },
      { id: "B", texto: "\$2.100", explicacionDistractor: "¡Correcto!" },
      { id: "C", texto: "\$2.400", explicacionDistractor: "Cuidado: 8 × 300 = 2.400, pero fueron 7 semanas." },
      { id: "D", texto: "\$1.000", explicacionDistractor: "Error en el cálculo de las centenas." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos 7 semanas × \$300. Multiplicamos primero 7 × 3 = 21 y agregamos los dos ceros: \$2.100 en total. ¡Una excelente meta de ahorro!"
  },
  {
    id: 8,
    contexto: "Materiales para la Clase de Artes",
    enunciado: "La profesora de artes visuales tiene 8 cajas de lápices de colores para repartir en las mesas de trabajo. Si cada caja contiene 10 lápices, ¿cuántos lápices de colores tiene en total?",
    svgType: "cajas_lapices",
    opciones: [
      { id: "A", texto: "18 lápices", explicacionDistractor: "Error: se sumó 8 + 10 = 18 en lugar de multiplicar." },
      { id: "B", texto: "70 lápices", explicacionDistractor: "Cuidado: 7 × 10 = 70, pero había 8 cajas." },
      { id: "C", texto: "80 lápices", explicacionDistractor: "¡Correcto!" },
      { id: "D", texto: "800 lápices", explicacionDistractor: "Cuidado: se agregaron dos ceros en lugar de uno." }
    ],
    correcta: "C",
    explicacion: "Al multiplicar por 10, conservamos el número y le agregamos un cero a la derecha: 8 cajas × 10 lápices = 80 lápices en total."
  },
  {
    id: 9,
    contexto: "Educación Física y Vueltas a la Pista",
    enunciado: "En la clase de educación física, 3 estudiantes corrieron alrededor de la cancha. Cada uno dio 7 vueltas completas. ¿Cuántas vueltas dieron entre los 3 estudiantes?",
    svgType: "pista_atletica",
    opciones: [
      { id: "A", texto: "10 vueltas", explicacionDistractor: "Error: se sumaron 3 + 7 = 10 en lugar de multiplicar." },
      { id: "B", texto: "21 vueltas", explicacionDistractor: "¡Correcto!" },
      { id: "C", texto: "24 vueltas", explicacionDistractor: "Cuidado: 3 × 8 = 24, pero eran 7 vueltas." },
      { id: "D", texto: "28 vueltas", explicacionDistractor: "Cuidado: 4 × 7 = 28, pero eran 3 estudiantes." }
    ],
    correcta: "B",
    explicacion: "Multiplicamos la cantidad de estudiantes por las vueltas de cada uno: 3 × 7 = 21 vueltas en total. Corresponde a la suma 7 + 7 + 7 = 21."
  },
  {
    id: 10,
    contexto: "Organización de Materiales en Biblioteca",
    enunciado: "En la biblioteca del colegio hay 6 repisas con libros de historietas. Si en cada repisa hay exactamente 8 libros, ¿cuántos libros de historietas hay en total?",
    svgType: "repisa_libros",
    opciones: [
      { id: "A", texto: "14 libros", explicacionDistractor: "Error común: sumar 6 + 8 = 14." },
      { id: "B", texto: "42 libros", explicacionDistractor: "Cuidado: 6 × 7 = 42, pero había 8 libros por repisa." },
      { id: "C", texto: "48 libros", explicacionDistractor: "¡Correcto!" },
      { id: "D", texto: "56 libros", explicacionDistractor: "Cuidado: 7 × 8 = 56, pero eran 6 repisas." }
    ],
    correcta: "C",
    explicacion: "Calculamos el producto entre las repisas y los libros por repisa: 6 repisas × 8 libros = 48 libros. Por conmutatividad, es igual a 8 × 6 = 48."
  }
];

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
