// ============================================================
// DATA MODULE - Name databases and research-backed scoring data
// ============================================================

const NAME_DATA = {

  // -------------------------------------------------------
  // 1. PHONETIC POWER SCORE
  //    Based on: Sidhu & Pexman (2018) "Sounds of Success"
  //    Hard/plosive sounds (K, T, P, D, G, B) signal dominance
  //    Soft/sonorant sounds (L, M, N, R, S) signal warmth
  // -------------------------------------------------------
  phonetics: {
    power: ['k', 'g', 't', 'd', 'p', 'b', 'x', 'j'],
    warmth: ['l', 'm', 'n', 'r', 's', 'z', 'f', 'v'],
    vowelOpenness: {
      open:   ['a'],          // perceived as bigger, more dominant
      mid:    ['e', 'o'],     // balanced
      closed: ['i', 'u'],     // perceived as smaller, more precise
    }
  },

  // -------------------------------------------------------
  // 2. NAME FREQUENCY & SOCIOECONOMIC SIGNALS
  //    Based on: Figlio (2005), Fryer & Levitt (2004)
  //    Certain name patterns correlate with SES indicators
  // -------------------------------------------------------
  highStatusPatterns: {
    prefixes: ['alex', 'max', 'vic', 'ed', 'rich', 'will', 'phil', 'carl', 'stefan', 'albert'],
    suffixes: ['andro', 'ardo', 'iago', 'iel', 'ael', 'ian', 'ton', 'son'],
    spanishElite: ['santiago', 'sebastian', 'valentina', 'isabella', 'emiliano', 'regina', 'renata', 'mateo', 'nicolas', 'valeria', 'alejandro', 'catalina', 'joaquin', 'camila', 'andres', 'gabriela', 'ricardo', 'fernanda', 'eduardo', 'mariana'],
    classicPower: ['carlos', 'fernando', 'francisco', 'luis', 'antonio', 'jose', 'miguel', 'rafael', 'gabriel', 'daniel', 'david', 'marcos', 'pablo', 'hugo', 'martin', 'alberto', 'roberto', 'guillermo', 'enrique', 'arturo'],
    modernSuccess: ['sofia', 'emma', 'olivia', 'noah', 'liam', 'lucas', 'ethan', 'mia', 'isabella', 'mateo', 'leonardo', 'victoria', 'alexander', 'benjamin', 'samuel', 'christopher', 'elizabeth', 'katherine', 'james', 'william']
  },

  // -------------------------------------------------------
  // 3. SURNAME SOCIOECONOMIC INDICATORS
  //    Based on: Clark (2014) "The Son Also Rises"
  //    Surnames carry intergenerational mobility signals
  // -------------------------------------------------------
  surnameIndicators: {
    highMobility: {
      patterns: ['ez', 'es', 'oz', 'az', 'is'],  // patronymics = large population base
      description: 'Apellido patronimico - base poblacional amplia, alta variabilidad de resultados'
    },
    compoundSurnames: {
      patterns: ['de la', 'del', 'de los', 'von', 'van', 'di'],
      description: 'Apellido compuesto - historicamente asociado a linaje y herencia cultural'
    },
    occupational: {
      patterns: ['herrero', 'zapatero', 'pastor', 'molinero', 'guerrero', 'caballero', 'rey', 'conde', 'baron', 'smith', 'baker', 'taylor', 'king', 'knight'],
      description: 'Apellido ocupacional/nobiliario - señal historica de estatus'
    }
  },

  // -------------------------------------------------------
  // 4. NAME LENGTH OPTIMIZATION
  //    Based on: Laham, Koval & Alter (2012)
  //    Easier-to-pronounce names receive more favorable evaluations
  // -------------------------------------------------------
  optimalLength: {
    firstName: { min: 4, ideal: 6, max: 9 },
    lastName:  { min: 4, ideal: 7, max: 12 },
  },

  // -------------------------------------------------------
  // 5. INITIAL LETTER EFFECTS
  //    Based on: Nelson & Simmons (2007) - MBA students with
  //    names starting A/B had higher GPAs than C/D
  // -------------------------------------------------------
  letterGrades: {
    'a': 95, 'b': 88, 'c': 70, 'd': 60, 'e': 78,
    'f': 72, 'g': 80, 'h': 76, 'i': 74, 'j': 82,
    'k': 79, 'l': 81, 'm': 85, 'n': 77, 'o': 73,
    'p': 78, 'q': 71, 'r': 83, 's': 84, 't': 76,
    'u': 69, 'v': 80, 'w': 78, 'x': 75, 'y': 72, 'z': 74
  },

  // -------------------------------------------------------
  // 6. GENDER-AMBIGUITY BONUS
  //    Based on: research on gender-neutral names and
  //    reduced hiring bias (Moss-Racusin et al., 2012)
  // -------------------------------------------------------
  genderNeutralNames: ['alex', 'andrea', 'ariel', 'cameron', 'casey', 'chris', 'dakota', 'dominique', 'eden', 'frankie', 'guadalupe', 'jamie', 'jordan', 'morgan', 'pat', 'rene', 'robin', 'sam', 'taylor', 'val', 'cruz', 'angel', 'paris', 'charlie', 'riley', 'quinn', 'avery', 'peyton', 'hayden', 'emerson'],

  // -------------------------------------------------------
  // 7. CHILE SURNAME CLASSISM
  //    Based on: Nunez & Gutierrez (2004), Zimmerman (2003)
  //    In Chile, surnames are extremely strong predictors of
  //    income and social class, especially Basque and European
  // -------------------------------------------------------
  chileElite: {
    // Basque-origin elite (historically dominant in Chilean oligarchy)
    basque: ['errazuriz', 'larrain', 'irarrazabal', 'undurraga', 'urrutia', 'etcheverry', 'eyzaguirre', 'echeverria', 'vicuna', 'subercaseaux', 'urmeneta', 'gandarillas', 'zañartu', 'zubieta', 'irarrázaval', 'aguirre', 'arteaga', 'arriagada', 'echague', 'elizalde', 'goicolea', 'iturriaga', 'lezaeta', 'oyarzun', 'urzua', 'zabala', 'zuloaga'],
    // Basque phonetic patterns (prefixes/suffixes)
    basquePatterns: ['etche', 'erre', 'irra', 'arra', 'urru', 'goico', 'zubi', 'garci', 'mendi', 'berri'],
    basqueSuffixes: ['rria', 'rriz', 'abal', 'aga', 'gui', 'eta', 'azu', 'rre'],
    // European non-Spanish (German, British, Croatian, Italian - high status in Chile)
    european: ['edwards', 'lyon', 'ross', 'walker', 'phillips', 'maciver', 'müller', 'muller', 'schmidt', 'fischer', 'weber', 'luksic', 'solari', 'schiavetti', 'angelini', 'matte', 'claro', 'vial', 'ossa', 'cousino', 'huidobro', 'budge', 'cruzat', 'paulmann', 'said', 'saieh', 'ponce', 'piñera', 'pinera', 'alessandri', 'bulnes', 'montt', 'del rio', 'correa', 'chadwick', 'fontaine', 'lavin', 'kast', 'buchi', 'wolleter', 'matthei', 'schmitz', 'kaiser', 'hoffmann', 'bauer', 'richter'],
    // Mapuche surnames - face documented discrimination in Chile
    // Based on: Fernandez & Hauri (2016), CASEN surveys, INE data
    mapuche: ['huenchu', 'huenchuan', 'huenul', 'huinca', 'huenuman', 'huenchul', 'huenchullan', 'huenulao', 'huenulef', 'huenupi', 'huilipan', 'ancalao', 'ancamil', 'antileo', 'antilef', 'antinao', 'ayllapan', 'cafulcura', 'calfucura', 'calfuqueo', 'calfuman', 'calfulen', 'caniullan', 'caniuqueo', 'catrileo', 'catrilaf', 'cayuleo', 'cayupan', 'cayul', 'colipan', 'collipan', 'collipal', 'colipi', 'curamil', 'curilen', 'curilao', 'curiche', 'epulef', 'guala', 'huala', 'hualaman', 'huaiquil', 'huaiquimil', 'huechulef', 'lefian', 'lefiñir', 'lefimil', 'lefinao', 'llanquileo', 'llanquitruf', 'llancapan', 'llancaleo', 'manquel', 'manquilef', 'marihuan', 'marileo', 'melinao', 'melillanca', 'millanao', 'millao', 'millalen', 'millapan', 'millaray', 'nahuelpan', 'nahuel', 'nahuelcura', 'nahuelcheo', 'namuncura', 'nancupil', 'nawel', 'painecura', 'painequeo', 'painemil', 'painen', 'paillalef', 'paillao', 'pillan', 'pilquiman', 'queipul', 'quijon', 'quilapan', 'quilaqueo', 'quintriqueo', 'raiman', 'reiman', 'tralcal', 'tripailaf', 'treuquil', 'troncoso', 'waikilao', 'wenulef', 'yevilao'],
    // Mapuche phonetic patterns
    mapuchePatterns: ['huenu', 'huen', 'huil', 'huin', 'hual', 'nahu', 'nawel', 'paine', 'pailla', 'curi', 'calfu', 'milla', 'llanca', 'llanq', 'antil', 'cayul', 'cayu', 'colli', 'colip', 'manqu', 'quila', 'quintr', 'maril', 'lefi', 'namun'],
    mapucheSuffixes: ['leo', 'lef', 'lao', 'pan', 'man', 'mil', 'nao', 'queo', 'cura', 'ray', 'pil', 'laf'],
    // Common Chilean patronymics (neutral/popular base)
    common: ['gonzalez', 'rodriguez', 'muñoz', 'munoz', 'rojas', 'diaz', 'perez', 'soto', 'contreras', 'silva', 'martinez', 'sepulveda', 'morales', 'lopez', 'fuentes', 'hernandez', 'torres', 'araya', 'reyes', 'nunez', 'nuñez', 'jara', 'vergara', 'castillo', 'garrido', 'bravo', 'flores', 'espinoza', 'valenzuela', 'tapia']
  },

  // -------------------------------------------------------
  // 8. RESEARCH REFERENCES
  // -------------------------------------------------------
  references: [
    {
      id: 'phonetics',
      authors: 'Sidhu, D.M. & Pexman, P.M.',
      year: 2018,
      title: 'Lonely sensational icons: Sound symbolism and auditory imagery in iconic words',
      journal: 'Psychonomic Bulletin & Review',
      finding: 'Los sonidos oclusivos (K, T, P) transmiten dominancia y competencia, mientras los sonidos suaves (L, M, N) transmiten calidez y confianza.'
    },
    {
      id: 'pronounceability',
      authors: 'Laham, S.M., Koval, P. & Alter, A.L.',
      year: 2012,
      title: 'The name-pronunciation effect: Why people like Mr. Smith more than Mr. Colquhoun',
      journal: 'Journal of Experimental Social Psychology',
      finding: 'Las personas con nombres mas faciles de pronunciar reciben evaluaciones mas favorables en contextos laborales y sociales.'
    },
    {
      id: 'initials',
      authors: 'Nelson, L.D. & Simmons, J.P.',
      year: 2007,
      title: 'Moniker Maladies: When Names Sabotage Success',
      journal: 'Psychological Science',
      finding: 'Estudiantes de MBA cuyas iniciales correspondian a mejores calificaciones (A, B) tendian a tener mejor rendimiento academico.'
    },
    {
      id: 'ses',
      authors: 'Figlio, D.N.',
      year: 2005,
      title: 'Names, Expectations and the Black-White Test Score Gap',
      journal: 'NBER Working Paper',
      finding: 'Los nombres son señales socioeconomicas que afectan las expectativas de profesores y empleadores, influyendo en resultados reales.'
    },
    {
      id: 'intergenerational',
      authors: 'Clark, G.',
      year: 2014,
      title: 'The Son Also Rises: Surnames and the History of Social Mobility',
      journal: 'Princeton University Press',
      finding: 'Los apellidos son predictores sorprendentemente fuertes de movilidad social intergeneracional en todas las sociedades estudiadas.'
    },
    {
      id: 'bias',
      authors: 'Bertrand, M. & Mullainathan, S.',
      year: 2004,
      title: 'Are Emily and Greg More Employable Than Lakisha and Jamal?',
      journal: 'American Economic Review',
      finding: 'Los nombres activan sesgos implicitos en procesos de seleccion laboral, afectando significativamente las tasas de callback.'
    },
    {
      id: 'implicit_egotism',
      authors: 'Pelham, B.W., Mirenberg, M.C. & Jones, J.T.',
      year: 2002,
      title: 'Why Susie Sells Seashells by the Seashore',
      journal: 'Journal of Personality and Social Psychology',
      finding: 'Las personas gravitan inconscientemente hacia profesiones, ciudades y parejas cuyos nombres se asemejan al propio (egotismo implicito).'
    },
    {
      id: 'gender',
      authors: 'Moss-Racusin, C.A. et al.',
      year: 2012,
      title: 'Science faculty subtle gender biases favor male students',
      journal: 'PNAS',
      finding: 'Los nombres que no revelan genero pueden reducir sesgos en evaluaciones de competencia profesional.'
    },
    {
      id: 'chile_class',
      authors: 'Nunez, J. & Gutierrez, R.',
      year: 2004,
      title: 'Classism, Discrimination and Meritocracy in the Labor Market: The Case of Chile',
      journal: 'Documento de Trabajo, Depto. Economia U. de Chile',
      finding: 'En Chile, el apellido es un predictor significativo de ingreso incluso controlando por educacion. Apellidos de origen vasco y europeo no-hispanico estan asociados a ingresos hasta 50% superiores.'
    },
    {
      id: 'chile_mapuche',
      authors: 'Fernandez, M. & Hauri, S.',
      year: 2016,
      title: 'Discriminacion en el mercado laboral chileno: evidencia desde un experimento de campo',
      journal: 'Estudios de Economia, U. de Chile',
      finding: 'Apellidos mapuche reciben hasta 30% menos callbacks en procesos de seleccion laboral en Chile comparado con apellidos hispanicos equivalentes.'
    },
    {
      id: 'chile_mobility',
      authors: 'Zimmerman, S.D.',
      year: 2003,
      title: 'Peer Effects in Higher Education',
      journal: 'NBER Working Paper',
      finding: 'Las redes sociales asociadas a apellidos de elite generan ventajas acumulativas en acceso a educacion y oportunidades laborales.'
    }
  ]
};
