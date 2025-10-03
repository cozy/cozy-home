const lessonFormats = [
  {
    label: 'accompagnementperso',
    pretty: 'Accompagnement personnalisé',
    formats: {
      default: ['accompagnement personnalise', 'accompagnemt perso']
    },
    emoji: '🤝'
  },
  {
    label: 'atprofessionnalis',
    pretty: 'Atelier de professionnalisation',
    formats: {
      default: ['atelier de professionnalisation', 'at professionnalis']
    },
    emoji: '🔧'
  },
  {
    label: 'artsplastiques',
    pretty: 'Arts plastiques',
    formats: {
      default: ['arts plastiques', 'artsplastiques']
    },
    emoji: '🎨'
  },
  {
    label: 'bloc1smdsi',
    pretty: 'Bloc 1 : Support et mise a disposition des services informatiques',
    formats: {
      default: [
        'bloc 1 support et mise a disposition des services informatiques',
        'bloc 1 smdsi'
      ]
    },
    emoji: '💻'
  },
  {
    label: 'bloc2sisr',
    pretty: 'Bloc 2 : Solutions d’infrastructure systemes et réseaux',
    formats: {
      default: [
        'bloc 2 solutions d’infrastructure systemes et reseaux',
        'bloc 2 sisr'
      ]
    },
    emoji: '🔌'
  },
  {
    label: 'bloc2slam',
    pretty: 'Bloc 2 : Solutions logicielles et applications métiers',
    formats: {
      default: [
        'bloc 2 solutions logicielles et applications metiers',
        'bloc 2 slam'
      ]
    },
    emoji: '📱'
  },
  {
    label: 'bloc3tp',
    pretty: 'Bloc 3 : Travaux pratiques',
    formats: {
      default: ['bloc 3 travaux pratiques', 'bloc 3 tp']
    },
    emoji: '🛠️'
  },
  {
    label: 'culecojurmanapp',
    pretty: 'Culture économique, juridique et managériale appliquée',
    formats: {
      default: [
        'culture economique juridique et manageriale appliquee',
        'cul eco jur man app'
      ]
    },
    emoji: '💼'
  },
  {
    label: 'culturegeneetexpr',
    pretty: 'Culture génerale et expression',
    formats: {
      default: ['culture generale et expression', 'culture gene et expr']
    },
    emoji: '📚'
  },
  {
    label: 'cultecojurmanag',
    pretty: 'Culture économique, juridique et managériale',
    formats: {
      default: [
        'culture economique juridique et manageriale',
        'cult eco jur manag'
      ]
    },
    emoji: '💼'
  },
  {
    label: 'dnlsesanglais',
    pretty: 'DNL : Sciences économiques et sociales en anglais',
    formats: {
      default: ['dnl ses anglais']
    },
    emoji: '🇬🇧'
  },
  {
    label: 'educationcivique',
    pretty: 'Éducation civique',
    formats: {
      default: ['education civique', 'education civique']
    },
    emoji: '🗳️'
  },
  {
    label: 'enseignscientifique',
    pretty: 'Enseignement scientifique',
    formats: {
      default: ['enseignement scientifique', 'enseign scientifique']
    },
    emoji: '🔬'
  },
  {
    label: 'edphysiquesport',
    pretty: 'Éducation physique & sportive',
    formats: {
      default: [
        'education physique et sportive',
        'ed physique sport',
        'education physique et sportive',
        'eps'
      ]
    },
    emoji: '🏃'
  },
  {
    label: 'educationmusicale',
    pretty: 'Éducation musicale',
    formats: {
      default: ['education musicale', 'education musicale']
    },
    emoji: '🎵'
  },
  {
    label: 'francais',
    pretty: 'Français',
    formats: {
      default: ['français', 'francais']
    },
    emoji: '📝'
  },
  {
    label: 'histoiregeo',
    pretty: 'Histoire-Géographie',
    formats: {
      default: [
        'histoire geographie',
        'histoire geo',
        'histoire geograph',
        'histoire-geographie',
        'histoire-geographie'
      ]
    },
    emoji: '🌍'
  },
  {
    label: 'humanlitterphilo',
    pretty: 'Humanites, Littérature & Philosophie',
    formats: {
      default: ['humanites litterature philosophie', 'human litter philo']
    },
    emoji: '📖'
  },
  {
    label: 'llcanglmondcont',
    pretty: 'LLCER Anglais Monde Contemporain',
    formats: {
      default: ['llcer anglais monde contemporain', 'llc angl mond cont']
    },
    emoji: '🇬🇧'
  },
  {
    label: 'mathspourinformatq',
    pretty: 'Mathématiques pour l’Informatique',
    formats: {
      default: ['mathematiques pour l’informatique', 'maths pour informatq']
    },
    emoji: '🧮'
  },
  {
    label: 'mathematiques',
    pretty: 'Mathématiques',
    formats: {
      default: [
        'mathematiques',
        'mathematiques',
        'mathematiques 1ere',
        'math 1ere'
      ]
    },
    emoji: '📐'
  },
  {
    label: 'numeriquescinform',
    pretty: 'Numérique & Sciences Informatiques',
    formats: {
      default: ['numerique et sciences informatiques', 'numerique sc inform']
    },
    emoji: '💻'
  },
  {
    label: 'physiquechimie',
    pretty: 'Physique-Chimie',
    formats: {
      default: ['physique chimie', 'phys chim']
    },
    emoji: '⚛️'
  },
  {
    label: 'sceconosociales',
    pretty: 'Sciences Économiques & Sociales',
    formats: {
      default: [
        'sciences economiques et sociales',
        'sc econo sociales',
        'sciences economiques et sociales'
      ]
    },
    emoji: '💰'
  },
  {
    label: 'sciencesvieterre',
    pretty: 'Sciences de la Vie & de la Terre',
    formats: {
      default: [
        'sciences de la vie et de la terre',
        'sciences de la vie et de la terre',
        'sciences vie terre'
      ]
    },
    emoji: '🌿'
  },
  {
    label: 'scnumeriqtechnol',
    pretty: 'Sciences Numériques & Technologie',
    formats: {
      default: ['sciences numeriques et technologie', 'sc numeriq technol']
    },
    emoji: '💻'
  },
  {
    label: 'viedeclasse',
    pretty: 'Vie de classe',
    formats: {
      default: ['vie de classe', 'vie de classe']
    },
    emoji: '👥'
  },
  {
    label: 'spephysiquechimie',
    pretty: 'Spé. Physique-Chimie',
    formats: {
      default: ['spephysiquechimie', 'spe physique chimie']
    },
    emoji: '🧪'
  }
]

const CapitalizeFirstLetter = string => {
  // if less than 4 characters, capitalize all
  if (string.length < 4) return string.toUpperCase()

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getSubjectName = subjectId => {
  const specMap = {
    expressionecrite: 'expression écrite',
    expressionorale: 'expression orale',
    comprehensionorale: 'compréhension orale',
    comprehensionecrite: 'compréhension écrite',
    ecrit: 'écrit',
    oral: 'oral'
  }

  const newSubjectId = subjectId
    .toLowerCase()
    .split(new RegExp(Object.keys(specMap).join('|')))[0]
    .replace('ensscientifique', '')
  const subject = lessonFormats.find(lesson => lesson.label === newSubjectId)
  const speciality =
    Object.entries(specMap).find(([key]) => subjectId.includes(key))?.[1] || ''

  return subject
    ? { ...subject, speciality }
    : {
        label: subjectId,
        pretty: CapitalizeFirstLetter(newSubjectId),
        formats: { default: [subjectId] },
        speciality
      }
}
