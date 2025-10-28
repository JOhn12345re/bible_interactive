// Service pour la frise chronologique biblique complète
// Inclut toutes les périodes historiques avec dates approximatives

export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  book: string;
  year_bc?: number; // Année avant J.-C.
  year_ad?: number; // Année après J.-C.
  available: boolean;
  summary?: string;
  key_verses?: string[];
  historical_context?: string; // Contexte historique détaillé
  spiritual_lessons?: string[]; // Leçons spirituelles à retenir
  geographical_info?: string; // Informations géographiques
  cultural_context?: string; // Contexte culturel de l'époque
  key_figures?: string[]; // Personnages principaux
  related_events?: string[]; // Événements liés
  educational_notes?: string; // Notes éducatives pour enfants
}

export interface HistoricalPeriod {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  period_range: string;
  start_year_bc?: number;
  end_year_bc?: number;
  start_year_ad?: number;
  end_year_ad?: number;
  events: HistoricalEvent[];
  period_summary?: string; // Résumé de la période
  key_themes?: string[]; // Thèmes principaux de la période
  historical_background?: string; // Contexte historique général
  theological_significance?: string; // Signification théologique
}

export interface CompleteTimelineData {
  timeline: {
    title: string;
    description: string;
    periods: HistoricalPeriod[];
  };
  educational_goals: string[];
}

const COMPLETE_TIMELINE_DATA: HistoricalPeriod[] = [
  {
    id: 'fondements',
    title: 'Fondements',
    icon: '🌟',
    color: '#10b981',
    description: 'Les origines et les patriarches',
    period_range: '2000-1250 av. J.-C.',
    start_year_bc: 2000,
    end_year_bc: 1250,
    period_summary: 'Cette période couvre les origines du monde selon la Bible, depuis la création jusqu\'à l\'installation des Hébreux en Égypte. Elle établit les fondements de la foi monothéiste et présente les premiers pas de l\'alliance entre Dieu et l\'humanité.',
    key_themes: [
      'Création divine et dignité humaine',
      'Conséquences du péché et miséricorde divine', 
      'Alliance et promesses de Dieu',
      'Foi et obéissance des patriarches',
      'Providence divine dans l\'histoire'
    ],
    historical_background: 'Cette période correspond aux débuts de l\'âge du bronze et aux grandes civilisations mésopotamiennes. Les patriarches évoluent dans un contexte de migrations tribales et d\'échanges commerciaux entre la Mésopotamie, Canaan et l\'Égypte.',
    theological_significance: 'Les récits des origines établissent les bases théologiques du judaïsme et du christianisme : création par un Dieu unique, chute et promesse de rédemption, élection d\'un peuple pour bénir toutes les nations.',
    events: [
      {
        id: 'creation_01',
        title: 'La Création du monde',
        description: 'Au commencement, Dieu créa les cieux et la terre en six jours.',
        book: 'Genèse 1-2',
        available: true,
        summary: 'Dieu crée l\'univers, la terre, les animaux et l\'homme à son image.',
        key_verses: [
          'Genèse 1:1 - Au commencement, Dieu créa les cieux et la terre.',
          'Genèse 1:27 - Dieu créa l\'homme à son image.',
          'Genèse 2:7 - L\'Éternel Dieu forma l\'homme de la poussière de la terre.'
        ],
        historical_context: 'Le récit de la création se distingue des mythologies anciennes par son monothéisme radical et sa vision ordonnée du cosmos. Contrairement aux récits babyloniens ou égyptiens, la création biblique est l\'œuvre d\'un Dieu unique et bienveillant.',
        spiritual_lessons: [
          'Dieu est le créateur souverain de toutes choses',
          'L\'humanité est créée à l\'image de Dieu avec une dignité particulière',
          'La création est bonne et ordonnée selon la volonté divine',
          'Le sabbat est institué comme jour de repos et de communion avec Dieu'
        ],
        geographical_info: 'Le jardin d\'Éden est situé entre quatre fleuves, probablement en Mésopotamie, région berceau des civilisations anciennes.',
        cultural_context: 'Dans l\'Antiquité, les récits de création servaient à expliquer l\'origine du monde. Le récit biblique se distingue par son éthique et sa théologie monothéiste.',
        key_figures: ['Dieu créateur', 'Adam', 'Ève'],
        educational_notes: 'Cette histoire enseigne aux enfants que Dieu a tout créé avec amour et que chaque personne est précieuse à ses yeux. Elle montre l\'importance de prendre soin de la création.'
      },
      {
        id: 'adam_eve_01',
        title: 'Adam et Ève',
        description: 'L\'Éternel Dieu forma l\'homme de la poussière de la terre.',
        book: 'Genèse 2-3',
        available: true,
        summary: 'Création de l\'homme et de la femme, la chute et l\'expulsion du jardin d\'Éden.',
        key_verses: [
          'Genèse 2:7 - L\'Éternel Dieu forma l\'homme de la poussière de la terre.',
          'Genèse 2:18 - Il n\'est pas bon que l\'homme soit seul.',
          'Genèse 3:15 - Je mettrai inimitié entre ta postérité et sa postérité.'
        ],
        historical_context: 'Ce récit explique l\'origine du mal et de la souffrance dans le monde, thème universel des traditions religieuses anciennes. Il présente une anthropologie optimiste : l\'homme est bon par nature mais corrompu par le péché.',
        spiritual_lessons: [
          'L\'humanité est créée pour la communion avec Dieu',
          'La désobéissance brise la relation avec Dieu et entraîne la mort',
          'Dieu promet une rédemption future malgré la chute',
          'Le libre arbitre implique la responsabilité morale'
        ],
        geographical_info: 'L\'Éden représente un lieu de perfection primordiale, souvent localisé en Mésopotamie entre les fleuves Tigre et Euphrate.',
        cultural_context: 'Les arbres sacrés et les jardins divins sont des motifs récurrents dans l\'iconographie du Proche-Orient ancien.',
        key_figures: ['Adam (l\'homme)', 'Ève (la vivante)', 'Le serpent tentateur'],
        related_events: ['creation_01', 'cain_abel_01'],
        educational_notes: 'Cette histoire enseigne aux enfants l\'importance de l\'obéissance et que Dieu nous aime même quand nous faisons des erreurs. Elle montre que nos choix ont des conséquences.'
      },
      {
        id: 'cain_abel_01',
        title: 'Caïn et Abel',
        description: 'Le premier meurtre de l\'humanité par jalousie.',
        book: 'Genèse 4',
        available: true,
        summary: 'Histoire du premier meurtre et des conséquences du péché.',
        key_verses: ['Genèse 4:9 - L\'Éternel dit à Caïn: Où est ton frère Abel?']
      },
      {
        id: 'noe_01',
        title: 'Noé et le Déluge',
        description: 'L\'Éternel dit à Noé: Entre dans l\'arche, toi et toute ta maison.',
        book: 'Genèse 6-9',
        available: true,
        summary: 'Dieu sauve Noé et sa famille du déluge universel.',
        key_verses: [
          'Genèse 7:1 - L\'Éternel dit à Noé: Entre dans l\'arche.',
          'Genèse 9:13 - J\'ai placé mon arc dans la nue.',
          'Genèse 6:19 - De tout ce qui vit, tu feras entrer dans l\'arche deux de chaque espèce.'
        ],
        historical_context: 'Les récits de déluge universel sont présents dans de nombreuses cultures anciennes (Épopée de Gilgamesh, traditions sumériennes). Le récit biblique se distingue par ses dimensions morales et théologiques.',
        spiritual_lessons: [
          'Dieu juge le péché mais sauve les justes',
          'La foi et l\'obéissance de Noé le sauvent du jugement',
          'Dieu fait alliance avec l\'humanité après le déluge',
          'L\'arc-en-ciel symbolise la fidélité divine'
        ],
        geographical_info: 'L\'arche se pose sur les montagnes d\'Ararat, dans l\'actuelle Turquie orientale, région montagneuse du Proche-Orient.',
        cultural_context: 'La construction navale était une technologie avancée dans l\'Antiquité. L\'arche représente une prouesse technique guidée par Dieu.',
        key_figures: ['Noé le juste', 'Sa femme et ses trois fils', 'Les animaux sauvés'],
        related_events: ['adam_eve_01', 'babel_01'],
        educational_notes: 'Cette histoire montre aux enfants l\'importance d\'obéir à Dieu même quand c\'est difficile. Elle enseigne que Dieu protège ceux qui lui font confiance et tient ses promesses.'
      },
      {
        id: 'babel_01',
        title: 'La Tour de Babel',
        description: 'Dieu confond le langage des hommes orgueilleux.',
        book: 'Genèse 11',
        available: true,
        summary: 'Châtiment de l\'orgueil humain par la confusion des langues.',
        key_verses: ['Genèse 11:7 - Allons! descendons, et là confondons leur langage.']
      },
      {
        id: 'abraham_01',
        title: 'L\'Appel d\'Abraham',
        description: 'L\'Éternel dit à Abram: Va-t-en de ton pays.',
        book: 'Genèse 12',
        year_bc: 1800,
        available: true,
        summary: 'Dieu appelle Abraham et lui promet une grande nation.',
        key_verses: [
          'Genèse 12:1 - L\'Éternel dit à Abram: Va-t-en de ton pays.',
          'Genèse 12:2 - Je ferai de toi une grande nation.',
          'Genèse 15:6 - Abram crut à l\'Éternel, qui le lui imputa à justice.'
        ],
        historical_context: 'Abraham vit à l\'époque des grandes migrations sémitiques (vers 2000-1800 av. J.-C.). Il quitte Ur, grande cité sumérienne, pour s\'installer en Canaan, carrefour commercial du Proche-Orient.',
        spiritual_lessons: [
          'La foi implique parfois de quitter sa zone de confort',
          'Dieu tient ses promesses même quand elles semblent impossibles',
          'L\'obéissance à Dieu ouvre la voie aux bénédictions',
          'Abraham devient le père de tous les croyants'
        ],
        geographical_info: 'Voyage d\'Ur en Chaldée vers Canaan, en passant par Charan. Canaan devient la Terre Promise, située entre l\'Égypte et la Mésopotamie.',
        cultural_context: 'Abraham évolue dans un monde polythéiste. Son monothéisme révolutionnaire influence toute l\'histoire religieuse ultérieure.',
        key_figures: ['Abraham (Abram)', 'Sarah (Saraï)', 'Lot son neveu'],
        related_events: ['isaac_sacrifice_01', 'isaac_mariage_01'],
        educational_notes: 'Abraham nous apprend à faire confiance à Dieu même quand nous ne comprenons pas ses plans. Sa foi nous montre que Dieu nous guide toujours vers ce qui est bon pour nous.'
      },
      {
        id: 'isaac_sacrifice_01',
        title: 'Le Sacrifice d\'Isaac',
        description: 'Abraham est prêt à sacrifier son fils par obéissance à Dieu.',
        book: 'Genèse 22',
        year_bc: 1750,
        available: true,
        summary: 'Test suprême de la foi d\'Abraham et provision divine.',
        key_verses: ['Genèse 22:12 - N\'avance pas ta main sur l\'enfant.']
      },
      {
        id: 'isaac_mariage_01',
        title: 'Le Mariage d\'Isaac',
        description: 'Isaac épouse Rebecca, choisie par Dieu.',
        book: 'Genèse 24',
        year_bc: 1720,
        available: true,
        summary: 'Dieu guide le choix d\'une épouse pour Isaac.',
        key_verses: [
          'Genèse 24:50 - La chose vient de l\'Éternel.',
          'Genèse 24:67 - Isaac l\'aima, et il se consola de la mort de sa mère.'
        ],
        historical_context: 'Les mariages arrangés étaient la norme dans l\'Antiquité proche-orientale. La recherche d\'une épouse dans la famille d\'origine assure la continuité des traditions et de la foi.',
        spiritual_lessons: [
          'Dieu guide nos choix dans la prière et la recherche de sa volonté',
          'L\'obéissance aux parents dans les décisions importantes',
          'L\'amour véritable grandit dans le respect mutuel et la foi partagée'
        ],
        geographical_info: 'Voyage du serviteur d\'Abraham de Canaan vers Aram-Naharaïm (Mésopotamie) pour trouver Rebecca dans la famille de Nahor.',
        cultural_context: 'Le mariage par procuration avec dot et contrat familial était courant. Les puits étaient des lieux de rencontre sociale importants.',
        key_figures: ['Isaac', 'Rebecca', 'Le serviteur d\'Abraham', 'Laban'],
        related_events: ['abraham_01', 'jacob_esau_01'],
        educational_notes: 'Cette histoire montre aux enfants que Dieu nous aide à prendre les bonnes décisions quand nous lui faisons confiance. Elle enseigne aussi l\'importance de la famille et de l\'amour respectueux.'
      },
      {
        id: 'jacob_esau_01',
        title: 'Jacob et Ésaü',
        description: 'L\'histoire des jumeaux et du droit d\'aînesse.',
        book: 'Genèse 25-27',
        year_bc: 1700,
        available: true,
        summary: 'Jacob obtient le droit d\'aînesse et la bénédiction paternelle.',
        key_verses: [
          'Genèse 25:23 - L\'aîné sera assujetti au cadet.',
          'Genèse 25:34 - Ainsi Ésaü méprisa le droit d\'aînesse.',
          'Genèse 27:36 - On l\'a justement appelé Jacob (usurpateur).'
        ],
        historical_context: 'Le droit d\'aînesse incluait une double portion d\'héritage et le leadership familial. Les bénédictions paternelles étaient considérées comme prophétiques et irrévocables.',
        spiritual_lessons: [
          'Les conséquences de nos choix impulsifs peuvent être durables',
          'Dieu accomplit ses plans même à travers nos erreurs',
          'La rivalité fraternelle peut être surmontée par le pardon',
          'L\'importance de valoriser les choses spirituelles'
        ],
        geographical_info: 'Événements se déroulant en Canaan, dans les campements d\'Isaac près de Beer-Schéba et Gerar.',
        cultural_context: 'Dans la société patriarcale, l\'aîné héritait du leadership familial et de la responsabilité religieuse. Les repas avaient une valeur sacrée.',
        key_figures: ['Jacob (le supplanteur)', 'Ésaü (l\'homme des champs)', 'Isaac', 'Rebecca'],
        related_events: ['isaac_mariage_01', 'jacob_songe_01'],
        educational_notes: 'Cette histoire enseigne aux enfants l\'importance de faire de bons choix et de ne pas agir sur un coup de colère. Elle montre aussi que Dieu peut transformer nos erreurs en bénédictions.'
      },
      {
        id: 'jacob_songe_01',
        title: 'Le Songe de Jacob',
        description: 'Jacob voit une échelle qui monte vers le ciel.',
        book: 'Genèse 28',
        year_bc: 1680,
        available: true,
        summary: 'Vision de Jacob et promesse divine de protection.',
        key_verses: [
          'Genèse 28:12 - Il eut un songe avec une échelle.',
          'Genèse 28:15 - Je suis avec toi, je te garderai partout où tu iras.',
          'Genèse 28:17 - Cette maison de Dieu, cette porte des cieux!'
        ],
        historical_context: 'Jacob fuit la colère d\'Ésaü et se rend chez Laban en Mésopotamie. Béthel était déjà un lieu de culte cananéen, que Jacob transforme en sanctuaire à l\'Éternel.',
        spiritual_lessons: [
          'Dieu nous rencontre même dans nos moments les plus sombres',
          'La prière transforme les lieux ordinaires en lieux sacrés',
          'Dieu tient ses promesses malgré nos imperfections',
          'Le ciel et la terre sont connectés par la présence divine'
        ],
        geographical_info: 'Béthel (maison de Dieu), à environ 20 km au nord de Jérusalem, carrefour important entre Canaan et la Mésopotamie.',
        cultural_context: 'Les rêves étaient considérés comme des moyens de révélation divine. Les pierres dressées marquaient les lieux de théophanie.',
        key_figures: ['Jacob en fuite', 'L\'Éternel', 'Les anges messagers'],
        related_events: ['jacob_esau_01', 'joseph_01'],
        educational_notes: 'Cette histoire rassure les enfants que Dieu est toujours avec eux, même quand ils ont peur ou font des erreurs. Elle montre que Dieu peut parler à travers les rêves et dans tous les lieux.'
      },
      {
        id: 'joseph_01',
        title: 'Joseph en Égypte',
        description: 'Joseph fut vendu en Égypte et devint gouverneur.',
        book: 'Genèse 37-50',
        year_bc: 1650,
        available: true,
        summary: 'Joseph sauve sa famille de la famine et les installe en Égypte.',
        key_verses: [
          'Genèse 45:5 - Dieu m\'a envoyé devant vous pour vous conserver la vie.',
          'Genèse 50:20 - Vous aviez médité de me faire du mal; Dieu l\'a changé en bien.',
          'Genèse 41:16 - Ce n\'est pas moi! c\'est Dieu qui donnera une réponse.'
        ],
        historical_context: 'L\'Égypte du Moyen Empire accueille des populations sémitiques. Les famines cycliques nécessitaient une gestion centralisée des réserves. Joseph gouverne probablement sous un pharaon hyksos.',
        spiritual_lessons: [
          'Dieu peut transformer le mal en bien selon ses desseins',
          'La fidélité dans les petites choses prépare aux grandes responsabilités',
          'Le pardon libère et restaure les relations brisées',
          'Dieu utilise nos épreuves pour accomplir ses plans de salut'
        ],
        geographical_info: 'Voyage de Canaan vers l\'Égypte, installation en Goshên (delta du Nil), région fertile adaptée à l\'élevage.',
        cultural_context: 'L\'interprétation des rêves était une science respectée en Égypte. Les famines septennales étaient connues dans l\'Antiquité.',
        key_figures: ['Joseph le visionnaire', 'Ses frères', 'Pharaon', 'Jacob/Israël', 'Potiphar'],
        related_events: ['jacob_songe_01', 'moise_buisson_01'],
        educational_notes: 'Joseph montre aux enfants qu\'il faut pardonner même quand on nous fait du mal. Il enseigne aussi que Dieu a un plan, même dans les moments difficiles.'
      }
    ]
  },
  {
    id: 'liberation',
    title: 'Libération',
    icon: '🔥',
    color: '#dc2626',
    description: 'Sortie d\'Égypte et formation du peuple',
    period_range: '1250-1200 av. J.-C.',
    start_year_bc: 1250,
    end_year_bc: 1200,
    period_summary: 'Cette période cruciale voit la transformation des descendants de Jacob en un peuple organisé. L\'Exode d\'Égypte, sous la conduite de Moïse, constitue l\'événement fondateur d\'Israël. La révélation au Sinaï établit les bases religieuses, morales et sociales du peuple élu.',
    key_themes: [
      'Libération divine de l\'oppression',
      'Formation de l\'identité nationale israélite',
      'Alliance sinaïtique et loi mosaïque',
      'Présence divine au milieu du peuple',
      'Épreuve et purification dans le désert'
    ],
    historical_background: 'Cette période correspond au règne de Ramsès II en Égypte (1279-1213 av. J.-C.) et aux invasions des Peuples de la Mer qui bouleversent le Proche-Orient. L\'Exode s\'inscrit dans un contexte de migrations importantes.',
    theological_significance: 'L\'Exode révèle Dieu comme libérateur des opprimés. Le Sinaï établit une théocratie où Dieu règne directement sur son peuple par la Loi. Cette période fonde la religion israélite et préfigure toute l\'histoire du salut.',
    events: [
      {
        id: 'moise_buisson_01',
        title: 'Moïse et le buisson ardent',
        description: 'L\'Éternel lui apparut dans une flamme de feu au milieu d\'un buisson qui ne se consumait point.',
        book: 'Exode 3',
        year_bc: 1250,
        available: true,
        summary: 'Dieu appelle Moïse pour libérer son peuple d\'Égypte depuis un buisson en feu mais non consumé.',
        key_verses: [
          'Exode 3:2 - L\'ange de l\'Éternel lui apparut dans une flamme de feu, au milieu d\'un buisson.',
          'Exode 3:10 - Viens, je t\'enverrai vers Pharaon, et tu feras sortir d\'Égypte mon peuple, les enfants d\'Israël.',
          'Exode 3:14 - Dieu dit à Moïse: Je suis celui qui suis. Et il ajouta: C\'est ainsi que tu répondras aux enfants d\'Israël: Celui qui s\'appelle "je suis" m\'a envoyé vers vous.'
        ],
        historical_context: 'Moïse garde les troupeaux de son beau-père Jéthro dans le désert de Madian, près du mont Horeb (Sinaï). Il a fui l\'Égypte 40 ans plus tôt après avoir tué un Égyptien.',
        spiritual_lessons: [
          'Dieu choisit ses serviteurs dans l\'humilité du quotidien',
          'Le buisson ardent révèle la sainteté de Dieu qui purifie sans détruire',
          'La mission divine dépasse nos capacités humaines',
          'Dieu se révèle comme "JE SUIS" - l\'Éternel, celui qui existe par lui-même'
        ],
        geographical_info: 'Désert de Madian, à l\'est de l\'Égypte près du mont Horeb (Sinaï). Région aride où Moïse vit en berger depuis 40 ans.',
        cultural_context: 'Les théophanies par le feu étaient reconnues dans l\'Orient ancien. Enlever ses sandales marque le respect devant le sacré.',
        key_figures: ['Moïse berger de 80 ans', 'L\'Ange de l\'Éternel', 'Jéthro son beau-père'],
        related_events: ['Naissance de Moïse', 'Fuite de Moïse', 'Plaies d\'Égypte'],
        educational_notes: 'Le buisson ardent enseigne que Dieu peut utiliser n\'importe qui pour ses grands plans, même quelqu\'un qui se sent incapable.'
      },
      {
        id: 'plaies_egypte_01',
        title: 'Les dix plaies d\'Égypte',
        description: 'Dieu frappa l\'Égypte de dix plaies pour libérer son peuple et montrer sa puissance.',
        book: 'Exode 7-12',
        year_bc: 1250,
        available: true,
        summary: 'Dieu contraint Pharaon à libérer le peuple hébreu par des châtiments progressifs démontrant sa souveraineté.',
        key_verses: [
          'Exode 7:5 - Les Égyptiens sauront que je suis l\'Éternel, quand j\'étendrai ma main sur l\'Égypte.',
          'Exode 12:31 - Pharaon appela Moïse et Aaron et dit : Levez-vous, sortez du milieu de mon peuple.',
          'Exode 12:12 - Cette nuit-là, je passerai dans le pays d\'Égypte, et je frapperai tous les premiers-nés du pays d\'Égypte.'
        ],
        historical_context: 'Les dix plaies s\'attaquent systématiquement aux divinités égyptiennes : le Nil (dieu Hapi), les grenouilles (déesse Héket), etc. Démonstration de la supériorité du Dieu d\'Israël.',
        spiritual_lessons: [
          'Dieu défend les opprimés contre leurs oppresseurs',
          'Les châtiments divins visent la repentance, pas la destruction',
          'L\'endurcissement du cœur mène à des conséquences toujours plus graves',
          'La puissance de Dieu dépasse celle de tous les faux dieux'
        ],
        geographical_info: 'Toute l\'Égypte frappée par les plaies, de Memphis à Thèbes. Seule la région de Goshen (où vivent les Hébreux) épargnée.',
        cultural_context: 'Chaque plaie ridiculise une divinité égyptienne spécifique, montrant l\'impuissance des dieux de l\'Égypte face au Dieu d\'Israël.',
        key_figures: ['Moïse et Aaron', 'Pharaon obstiné', 'Les magiciens égyptiens', 'Le peuple hébreu'],
        related_events: ['Buisson ardent', 'Passage de la mer Rouge', 'Institution de la Pâque'],
        educational_notes: 'Les plaies enseignent que Dieu peut transformer n\'importe quelle situation pour libérer ceux qui lui appartiennent.'
      },
      {
        id: 'mer_rouge_01',
        title: 'Passage de la mer Rouge',
        description: 'Miracle spectaculaire où Dieu divise les eaux pour faire traverser Israël et engloutir l\'armée égyptienne.',
        book: 'Exode 14',
        year_bc: 1250,
        available: true,
        summary: 'Délivrance miraculeuse d\'Israël poursuivi par l\'armée égyptienne, démonstration ultime de la puissance divine.',
        key_verses: [
          'Exode 14:21 - L\'Éternel refoula la mer par un vent d\'orient qui souffla avec impétuosité toute la nuit.',
          'Exode 14:22 - Les enfants d\'Israël entrèrent au milieu de la mer à sec, et les eaux formaient comme une muraille.',
          'Exode 14:30 - En ce jour, l\'Éternel délivra Israël de la main des Égyptiens.'
        ],
        historical_context: 'Pharaon regrette d\'avoir libéré les Hébreux et les poursuit avec 600 chars d\'élite. Le passage s\'effectue probablement au niveau des lacs Amers ou du golfe de Suez.',
        spiritual_lessons: [
          'Dieu fait des miracles pour sauver son peuple',
          'Il faut parfois avancer par la foi même sans voir le chemin',
          'Les ennemis de Dieu périssent par leur propre méchanceté',
          'La délivrance divine mérite louange et reconnaissance'
        ],
        geographical_info: 'Traversée probable au niveau du golfe de Suez ou des lacs Amers, entre l\'Égypte et la péninsule du Sinaï.',
        cultural_context: 'Les chars égyptiens représentent la technologie militaire la plus avancée de l\'époque, rendant la victoire d\'Israël d\'autant plus miraculeuse.',
        key_figures: ['Moïse dirigeant la traversée', 'Aaron', 'Miriam chantre de la victoire', 'Pharaon et son armée engloutie'],
        related_events: ['Dix plaies d\'Égypte', 'Cantique de Moïse', 'Arrivée au Sinaï'],
        educational_notes: 'Ce miracle devient le paradigme de toutes les délivrances futures dans l\'histoire d\'Israël et préfigure le baptisme chrétien.'
      },
      {
        id: 'commandements_01',
        title: 'Les Dix Commandements',
        description: 'Dieu donne à Moïse les dix paroles fondamentales de l\'Alliance sur des tables de pierre.',
        book: 'Exode 20',
        year_bc: 1249,
        available: true,
        summary: 'Dieu établit les principes moraux et spirituels fondamentaux de son alliance avec Israël au Sinaï.',
        key_verses: [
          'Exode 20:3 - Tu n\'auras pas d\'autres dieux devant ma face.',
          'Exode 20:12 - Honore ton père et ta mère, afin que tes jours se prolongent dans le pays.',
          'Exode 20:13-17 - Tu ne tueras point. Tu ne commettras point d\'adultère. Tu ne déroberas point.'
        ],
        historical_context: 'Au mont Sinaï, 50 jours après l\'Exode, devant tout le peuple rassemblé. Les commandements établissent la base juridique et morale de la théocratie israélite.',
        spiritual_lessons: [
          'L\'amour de Dieu précède ses commandements (4 premiers)',
          'L\'amour du prochain découle de l\'amour de Dieu (6 derniers)',
          'La loi révèle la sainteté de Dieu et la nécessité de la grâce',
          'Les commandements protègent la dignité humaine et la société'
        ],
        geographical_info: 'Mont Sinaï (Horeb), dans la péninsule du Sinaï. Montagne sacrée où Dieu manifeste sa présence dans le feu, la fumée et le tonnerre.',
        cultural_context: 'Les codes de lois étaient courants au Proche-Orient ancien (Code de Hammurabi), mais les Dix Commandements se distinguent par leur caractère théocentrique.',
        key_figures: ['Moïse médiateur', 'Aaron grand prêtre', 'Le peuple d\'Israël témoin', 'L\'Éternel législateur'],
        related_events: ['Alliance sinaïtique', 'Construction du Tabernacle', 'Veau d\'or'],
        educational_notes: 'Les Dix Commandements constituent le fondement moral de la civilisation judéo-chrétienne et résument tous les devoirs de l\'homme.'
      },
      {
        id: 'tabernacle_01',
        title: 'Le Tabernacle',
        description: 'Construction du sanctuaire portable où Dieu habite au milieu de son peuple pendant le voyage dans le désert.',
        book: 'Exode 25-40',
        year_bc: 1248,
        available: true,
        summary: 'Édification du lieu saint mobile selon les instructions divines précises, permettant la présence de Dieu au centre du campement.',
        key_verses: [
          'Exode 25:8 - Ils me feront un sanctuaire, et j\'habiterai au milieu d\'eux.',
          'Exode 40:34 - La nuée couvrit la tente d\'assignation, et la gloire de l\'Éternel remplit le tabernacle.',
          'Exode 26:33 - Le voile vous servira de séparation entre le lieu saint et le lieu très saint.'
        ],
        historical_context: 'Construction minutieuse selon les plans divins pendant l\'année au Sinaï. Le tabernacle utilise les richesses emportées d\'Égypte et l\'artisanat des ouvriers habiles comme Betsaleel.',
        spiritual_lessons: [
          'Dieu désire habiter au milieu de son peuple',
          'Le culte exige ordre, beauté et sainteté',
          'L\'accès à Dieu nécessite médiation et sacrifice',
          'Chaque détail du service divin a sa signification spirituelle'
        ],
        geographical_info: 'Construit au pied du mont Sinaï, puis transporté dans toutes les étapes du voyage vers la Terre promise.',
        cultural_context: 'S\'inspire des sanctuaires mobiles du Proche-Orient mais avec une théologie unique : un seul Dieu, pas d\'idoles, système sacrificiel complexe.',
        key_figures: ['Moïse architecte divin', 'Betsaleel et Oholiab artisans', 'Aaron et ses fils prêtres', 'Les Lévites servants'],
        related_events: ['Consécration d\'Aaron', 'Première Pâque', 'Organisation des tribus'],
        educational_notes: 'Le tabernacle préfigure l\'incarnation : Dieu venant habiter parmi les hommes. Chaque élément symbolise une vérité spirituelle profonde.'
      },
      {
        id: 'veau_or_01',
        title: 'Le Veau d\'or',
        description: 'Pendant que Moïse reçoit les Tables de la Loi, le peuple se fabrique une idole d\'or et l\'adore.',
        book: 'Exode 32',
        year_bc: 1249,
        available: true,
        summary: 'Péché grave d\'idolâtrie suivi de la colère divine, de l\'intercession de Moïse et de la repentance du peuple.',
        key_verses: [
          'Exode 32:4 - Israël! voici ton dieu qui t\'a fait sortir du pays d\'Égypte.',
          'Exode 32:14 - Et l\'Éternel se repentit du mal qu\'il avait déclaré vouloir faire à son peuple.',
          'Exode 32:32 - Pardonne maintenant leur péché! Sinon, efface-moi de ton livre que tu as écrit.'
        ],
        historical_context: 'Le culte du taureau (Apis en Égypte, Baal en Canaan) était répandu au Proche-Orient. Aaron cède à la pression populaire en l\'absence de Moïse.',
        spiritual_lessons: [
          'L\'impatience et l\'absence de foi mènent à l\'idolâtrie',
          'L\'intercession des justes peut détourner la colère divine',
          'Le péché a des conséquences mais le pardon reste possible',
          'Les leaders spirituels doivent résister à la pression populaire'
        ],
        geographical_info: 'Au pied du mont Sinaï pendant que Moïse est sur la montagne depuis 40 jours pour recevoir la Loi.',
        cultural_context: 'Les bijoux d\'or proviennent du butin égyptien. Le veau représente la force et la fertilité dans les religions cananéennes.',
        key_figures: ['Aaron fabricant l\'idole', 'Moïse intercesseur', 'Les Lévites fidèles', 'Le peuple idolâtre'],
        related_events: ['Réception des Dix Commandements', 'Bris des Tables', 'Consécration des Lévites'],
        educational_notes: 'Cet épisode montre la tendance humaine à créer des dieux visibles et l\'importance de la patience dans la foi.'
      },
      {
        id: 'serpent_airain_01',
        title: 'Le Serpent d\'airain',
        description: 'Dieu ordonne à Moïse de fabriquer un serpent de bronze pour guérir ceux qui le regardent avec foi.',
        book: 'Nombres 21',
        year_bc: 1210,
        available: true,
        summary: 'Miracle de guérison par le regard de la foi vers le serpent d\'airain élevé sur une perche.',
        key_verses: [
          'Nombres 21:9 - Quiconque avait été mordu regardait le serpent d\'airain, et il conservait la vie.',
          'Nombres 21:6 - L\'Éternel envoya contre le peuple des serpents brûlants; ils mordirent le peuple.',
          'Jean 3:14 - Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l\'homme soit élevé.'
        ],
        historical_context: 'Pendant la marche dans le désert, le peuple murmure contre Dieu et Moïse à cause des difficultés du voyage. Dieu envoie des serpents venimeux comme châtiment.',
        spiritual_lessons: [
          'Le salut vient par un simple regard de foi, pas par les œuvres',
          'Dieu peut utiliser des symboles pour enseigner des vérités spirituelles profondes',
          'Le remède divin est souvent paradoxal (regarder ce qui nous a blessés)',
          'La guérison divine requiert obéissance et foi'
        ],
        geographical_info: 'Dans le désert, probablement dans la région d\'Édom, au sud de la Terre promise, pendant les 40 années d\'errance.',
        cultural_context: 'Le serpent était symbole de guérison dans l\'Antiquité (bâton d\'Asclépios). Ici, Dieu retourne le symbole du mal en instrument de salut.',
        key_figures: ['Moïse obéissant à l\'ordre divin', 'Le peuple murmurant puis repentant', 'Les serpents brûlants envoyés par Dieu'],
        related_events: ['Murmures dans le désert', 'Crucifixion du Christ', 'Guérisons miraculeuses'],
        educational_notes: 'Jésus lui-même utilise cet événement pour expliquer sa mission : être élevé sur la croix pour que quiconque croit en lui soit sauvé.'
      },
      {
        id: 'terre_promise_01',
        title: 'La Terre Promise - Vision de Moïse',
        description: 'Depuis le mont Nebo, Dieu montre à Moïse toute la Terre promise avant sa mort, accomplissant sa promesse de la lui faire voir.',
        book: 'Deutéronome 34',
        year_bc: 1200,
        available: true,
        summary: 'Ultime vision prophétique de Moïse contemplant l\'héritage des tribus d\'Israël depuis la montagne sainte.',
        key_verses: [
          'Deutéronome 34:1 - Moïse monta des plaines de Moab sur le mont Nebo, au sommet du Pisga.',
          'Deutéronome 34:4 - C\'est là le pays que j\'ai juré de donner à Abraham, à Isaac et à Jacob.',
          'Deutéronome 34:10 - Il n\'a plus paru en Israël de prophète semblable à Moïse.'
        ],
        historical_context: 'Moïse meurt à 120 ans sans pouvoir entrer en Terre Promise à cause de sa désobéissance aux eaux de Meriba. Josué prend le relais.',
        spiritual_lessons: [
          'Dieu tient ses promesses même si nous n\'en voyons pas l\'accomplissement complet',
          'Chaque génération a son rôle spécifique dans le plan divin',
          'La vision prophétique console dans l\'attente de l\'accomplissement',
          'Les conséquences du péché peuvent limiter nos privilèges tout en préservant l\'œuvre de Dieu'
        ],
        geographical_info: 'Mont Nebo dans les montagnes de Moab, à l\'est du Jourdain, offrant une vue panoramique sur toute la Terre promise depuis Dan jusqu\'à Béer-Shéba.',
        cultural_context: 'Dans l\'Antiquité, mourir en contemplant sa terre natale était considéré comme une bénédiction. Moïse meurt en vue de l\'accomplissement des promesses divines.',
        key_figures: ['Moïse le grand législateur', 'Josué son successeur désigné', 'L\'Éternel fidèle à ses promesses'],
        related_events: ['Transmission du leadership à Josué', 'Conquête sous Josué', 'Promesses aux patriarches'],
        educational_notes: 'Cette vision enseigne que Dieu nous fait voir ses promesses même si nous n\'en voyons pas l\'accomplissement complet de notre vivant.'
      }
    ]
  },
  {
    id: 'conquete',
    title: 'Conquête',
    icon: '⚔️',
    color: '#f59e0b',
    description: 'Installation en Terre Promise',
    period_range: '1200-1050 av. J.-C.',
    start_year_bc: 1200,
    end_year_bc: 1050,
    period_summary: 'Période cruciale de l\'installation des tribus israélites en Canaan sous Josué, puis sous les Juges. Alternance entre fidélité et apostasie, victoires divines et oppression étrangère. Les héros charismatiques (Juges) libèrent le peuple jusqu\'à l\'établissement de la monarchie.',
    key_themes: [
      'Conquête progressive de la Terre Promise',
      'Fidélité à l\'alliance et ses conséquences',
      'Leadership charismatique des Juges',
      'Cycles de péché, oppression, repentance et délivrance',
      'Transition vers la monarchie'
    ],
    historical_background: 'Effondrement des empires du Bronze récent, invasions des Peuples de la Mer, établissement des Philistins sur la côte. Période de décentralisation politique au Proche-Orient.',
    theological_significance: 'Accomplissement des promesses faites aux patriarches. Dieu donne la terre mais exige la fidélité. Les échecs humains ne font pas échouer les plans divins.',
    events: [
      {
        id: 'traversee_jourdain',
        title: 'Traversée du Jourdain',
        year_bc: 1200,
        description: 'Josué mène Israël à travers le Jourdain en crue',
        book: 'Josué 3-4',
        available: true,
        summary: 'Miracle de la traversée du Jourdain et érection du mémorial de Guilgal.',
        key_verses: [
          'Josué 3:14-17 - Les eaux du Jourdain s\'arrêtent',
          'Josué 4:20-24 - Mémorial des douze pierres'
        ],
        historical_context: 'Traversée miraculeuse pendant la crue printanière du Jourdain. Écho à la traversée de la Mer Rouge par Moïse. Première étape de la conquête de Canaan.',
        spiritual_lessons: [
          'Dieu ouvre toujours un chemin pour son peuple',
          'L\'importance de se souvenir des miracles de Dieu',
          'La continuité du leadership divin de Moïse à Josué',
          'La foi collective surmonte les obstacles impossibles'
        ],
        geographical_info: 'Le Jourdain près de Jéricho, région de Guilgal. Rivière en crue au printemps, normalement infranchissable avec tout le peuple et l\'arche.',
        cultural_context: 'Les mémoriaux de pierres étaient courants au Proche-Orient ancien pour commémorer les événements significatifs. Transmission orale des récits aux générations futures.',
        key_figures: ['Josué', 'Les prêtres portant l\'arche', 'Les douze tribus d\'Israël'],
        related_events: ['Traversée de la Mer Rouge', 'Consécration de Josué', 'Prise de Jéricho'],
        educational_notes: 'Ce miracle établit l\'autorité de Josué et prépare psychologiquement le peuple à la conquête. Les douze pierres servent de catéchisme visuel.'
      },
      {
        id: 'josue_01',
        title: 'Prise de Jéricho',
        description: 'Les murailles s\'écroulèrent, et le peuple monta dans la ville.',
        book: 'Josué 6',
        year_bc: 1200,
        available: true,
        summary: 'Première victoire en Terre Promise par l\'obéissance à Dieu.',
        key_verses: [
          'Josué 6:20 - Le peuple cria, et les sacrificateurs soufflèrent des trompettes.',
          'Josué 6:2 - Vois, je livre entre tes mains Jéricho'
        ],
        historical_context: 'Jéricho était une ville-forteresse cananéenne fortifiée contrôlant l\'accès à la région montagneuse centrale. Sa chute ouvre la voie à la conquête.',
        spiritual_lessons: [
          'L\'obéissance exacte aux instructions divines apporte la victoire',
          'Les méthodes de Dieu dépassent la logique humaine',
          'La foi active transforme l\'impossible en possible',
          'L\'unité du peuple dans l\'obéissance collective'
        ],
        geographical_info: 'Jéricho, oasis dans la vallée du Jourdain, ville la plus ancienne du monde. Position stratégique pour contrôler les routes commerciales.',
        cultural_context: 'Les villes fortifiées cananéennes avec leurs doubles murailles étaient considérées imprenables. Les trompettes étaient des instruments rituels et militaires.',
        key_figures: ['Josué', 'Rahab la prostituée', 'Les prêtres', 'Les espions'],
        related_events: ['Mission des espions', 'Traversée du Jourdain', 'Bataille d\'Aï'],
        educational_notes: 'Modèle de guerre sainte où Dieu combat pour son peuple. Rahab préfigure l\'inclusion des non-Juifs dans le plan divin.'
      },
      {
        id: 'bataille_ai',
        title: 'Bataille d\'Aï',
        year_bc: 1199,
        description: 'Défaite puis victoire à Aï après le péché d\'Acan',
        book: 'Josué 7-8',
        available: true,
        summary: 'Leçon sur les conséquences du péché et la restauration par l\'obéissance.',
        key_verses: [
          'Josué 7:11 - Israël a péché, ils ont violé mon alliance',
          'Josué 8:1 - Ne crains point et ne t\'effraie point'
        ],
        historical_context: 'Aï était une petite ville fortifiée gardant l\'accès aux montagnes centrales. L\'échec initial révèle l\'importance de la pureté rituelle en guerre sainte.',
        spiritual_lessons: [
          'Le péché d\'un seul affecte toute la communauté',
          'La confession et la purification restaurent la bénédiction divine',
          'L\'échec peut être un moyen d\'enseignement divin',
          'La justice divine exige la sanctification du peuple'
        ],
        geographical_info: 'Aï, petite ville au nord de Jérusalem, contrôlant la route vers Béthel. Terrain montagneux favorable aux embuscades.',
        cultural_context: 'L\'anathème (herem) exigeait la consécration totale du butin à Dieu. La lapidation était le châtiment prescrit pour la violation de l\'alliance.',
        key_figures: ['Josué', 'Acan', 'Le roi d\'Aï', 'Les anciens d\'Israël'],
        related_events: ['Prise de Jéricho', 'Alliance avec les Gabaonites', 'Assemblée de Sichem'],
        educational_notes: 'Contraste entre l\'obéissance (Jéricho) et la désobéissance (Aï). Importance de l\'intégrité collective dans l\'alliance.'
      },
      {
        id: 'alliance_gabaonites',
        title: 'Alliance avec les Gabaonites',
        year_bc: 1198,
        description: 'Traité de paix avec Gabaon par ruse',
        book: 'Josué 9',
        available: true,
        summary: 'Leçon sur la prudence et les conséquences des décisions hâtives.',
        key_verses: [
          'Josué 9:14 - Les hommes d\'Israël prirent de leurs provisions, et ils ne consultèrent point l\'Éternel',
          'Josué 9:19 - Nous leur avons juré par l\'Éternel'
        ],
        historical_context: 'Gabaon était une grande ville royale cananéenne. Sa ruse révèle l\'intelligence diplomatique face à la réputation militaire d\'Israël.',
        spiritual_lessons: [
          'L\'importance de consulter Dieu avant les décisions importantes',
          'La fidélité aux serments même pris par erreur',
          'Les conséquences durables des choix précipités',
          'La miséricorde divine même dans nos erreurs'
        ],
        geographical_info: 'Gabaon, ville située au nord-ouest de Jérusalem, contrôlant une région stratégique des montagnes centrales.',
        cultural_context: 'Les traités de paix étaient sacrés au Proche-Orient ancien. La violation d\'un serment au nom de Dieu était considérée comme un sacrilège.',
        key_figures: ['Josué', 'Les anciens d\'Israël', 'Les ambassadeurs gabaonites'],
        related_events: ['Bataille d\'Aï', 'Coalition des cinq rois', 'Assemblée de Sichem'],
        educational_notes: 'Premier exemple d\'intégration de populations non-israélites. Préfigure l\'universalité du plan divin.'
      },
      {
        id: 'coalition_cinq_rois',
        title: 'Victoire sur la Coalition des Cinq Rois',
        year_bc: 1197,
        description: 'Bataille de Gabaon et miracle du soleil arrêté',
        book: 'Josué 10',
        available: false,
        summary: 'Grande victoire divine avec le miracle cosmique du soleil arrêté.',
        key_verses: [
          'Josué 10:12-13 - Soleil, arrête-toi sur Gabaon',
          'Josué 10:14 - Il n\'y a point eu de jour comme celui-là'
        ],
        historical_context: 'Coalition des rois amoréens contre Gabaon alliée d\'Israël. Première grande bataille rangée de la conquête contre une alliance organisée.',
        spiritual_lessons: [
          'Dieu combat pour ceux qui lui font confiance',
          'L\'aide aux alliés fidèles est un devoir sacré',
          'Les miracles divins dépassent les lois naturelles',
          'La victoire complète nécessite la persévérance'
        ],
        geographical_info: 'Bataille à Gabaon, poursuite vers Azéka et Makkéda. Contrôle de la Shéphélah (piémont occidental).',
        cultural_context: 'Les coalitions militaires étaient courantes face aux menaces extérieures. Les météorites (grêlons) étaient vues comme des armes divines.',
        key_figures: ['Josué', 'Les cinq rois amoréens', 'L\'armée d\'Israël'],
        related_events: ['Alliance avec Gabaon', 'Conquête du Sud', 'Assemblée de Sichem'],
        educational_notes: 'Demonstration de la supériorité du Dieu d\'Israël sur les forces de la nature et les dieux cananéens.'
      },
      {
        id: 'conquete_sud',
        title: 'Conquête du Sud',
        year_bc: 1196,
        description: 'Campagne militaire dans le Néguev',
        book: 'Josué 10:28-43',
        available: false,
        summary: 'Prise des villes fortifiées du sud de Canaan.',
        key_verses: [
          'Josué 10:40 - Josué battit tout le pays, la montagne, le midi, la plaine',
          'Josué 10:42 - Josué prit tous ces rois et leur pays en une seule fois'
        ],
        historical_context: 'Campagne systématique pour contrôler les routes commerciales vers l\'Égypte et sécuriser les arrières d\'Israël.',
        spiritual_lessons: [
          'La persévérance dans l\'accomplissement de la mission divine',
          'L\'importance de sécuriser les acquis spirituels',
          'La stratégie divine dépasse la force brute',
          'Chaque victoire prépare la suivante'
        ],
        geographical_info: 'Région de la Shéphélah et du Néguev, incluant Lakish, Églon, Hébron, Débir. Contrôle des voies commerciales.',
        cultural_context: 'Les villes fortifiées cananéennes formaient un réseau défensif. Leur prise séquentielle isolait les survivants.',
        key_figures: ['Josué', 'Caleb', 'Les chefs militaires d\'Israël'],
        related_events: ['Coalition des cinq rois', 'Conquête du Nord', 'Partage de la terre'],
        educational_notes: 'Modèle de guerre méthodique et complète. Importance de ne pas laisser d\'ennemis dans les arrières.'
      },
      {
        id: 'conquete_nord',
        title: 'Conquête du Nord',
        year_bc: 1195,
        description: 'Victoire sur la coalition de Hatsor',
        book: 'Josué 11',
        available: false,
        summary: 'Défaite de la plus grande coalition cananéenne menée par Jabin roi de Hatsor.',
        key_verses: [
          'Josué 11:6 - Ne les crains point, car demain, à cette heure, je les livrerai tous',
          'Josué 11:20 - Car c\'était l\'Éternel qui endurcissait leur cœur'
        ],
        historical_context: 'Hatsor était la plus grande ville cananéenne, capitale d\'un royaume puissant. Sa chute marque la fin de la résistance organisée.',
        spiritual_lessons: [
          'Dieu donne la victoire face aux forces supérieures en nombre',
          'L\'endurcissement du cœur comme jugement divin',
          'La destruction complète des influences négatives',
          'La fidélité divine dans l\'accomplissement des promesses'
        ],
        geographical_info: 'Hatsor en Galilée, contrôlant les routes vers la Syrie. Bataille aux eaux de Mérom dans la haute Galilée.',
        cultural_context: 'Hatsor était un centre commercial et militaire majeur. Sa destruction marque la fin d\'une époque au Proche-Orient.',
        key_figures: ['Josué', 'Jabin roi de Hatsor', 'La coalition du Nord'],
        related_events: ['Conquête du Sud', 'Partage de la terre', 'Assemblée de Sichem'],
        educational_notes: 'Culmination de la conquête militaire. Importance de détruire complètement les centres d\'idolâtrie.'
      },
      {
        id: 'partage_terre',
        title: 'Partage de la Terre Promise',
        description: 'Josué partagea le pays entre les douze tribus.',
        book: 'Josué 13-21',
        year_bc: 1190,
        available: false,
        summary: 'Distribution des territoires aux tribus d\'Israël selon les promesses divines.',
        key_verses: [
          'Josué 21:43 - L\'Éternel donna à Israël tout le pays qu\'il avait juré de donner',
          'Josué 14:1 - Voici ce que les enfants d\'Israël reçurent en héritage'
        ],
        historical_context: 'Organisation territoriale d\'Israël en douze portions tribales. Établissement d\'un système fédéral décentralisé unique au Proche-Orient ancien.',
        spiritual_lessons: [
          'Dieu accomplit toujours ses promesses faites aux patriarches',
          'L\'importance de l\'héritage spirituel et matériel',
          'La responsabilité collective et individuelle dans la possession',
          'L\'équité dans la distribution selon les besoins divins'
        ],
        geographical_info: 'Division de Canaan selon les frontières naturelles : montagnes, vallées, cours d\'eau. Attribution tenant compte des ressources et positions stratégiques.',
        cultural_context: 'Le tirage au sort était considéré comme révélant la volonté divine. L\'héritage tribal établissait l\'identité et les responsabilités familiales.',
        key_figures: ['Josué', 'Éléazar le sacrificateur', 'Les chefs de familles', 'Caleb'],
        related_events: ['Conquêtes militaires', 'Villes de refuge', 'Assemblée de Sichem'],
        educational_notes: 'Modèle de justice distributive divine. Chaque tribu reçoit selon le plan divin, non selon la force humaine.'
      },
      {
        id: 'villes_refuge',
        title: 'Établissement des Villes de Refuge',
        year_bc: 1189,
        description: 'Six villes désignées pour protéger les meurtriers involontaires',
        book: 'Josué 20',
        available: false,
        summary: 'Système judiciaire de protection pour les homicides involontaires.',
        key_verses: [
          'Josué 20:2 - Établissez-vous les villes de refuge',
          'Nombres 35:11 - Ces villes vous serviront de refuge'
        ],
        historical_context: 'Institution unique combinant justice et miséricorde. Prévention de la vendetta familiale tout en maintenant la responsabilité personnelle.',
        spiritual_lessons: [
          'L\'équilibre entre justice et miséricorde',
          'La protection divine pour les innocents',
          'L\'importance de systèmes justes de jugement',
          'Le refuge spirituel en Dieu pour tous'
        ],
        geographical_info: 'Six villes réparties stratégiquement : Kedesh, Sichem, Hébron à l\'ouest du Jourdain ; Betser, Ramoth, Golan à l\'est.',
        cultural_context: 'La loi du talion exigeait réparation, mais distinguait l\'intention malveillante de l\'accident. Les villes lévitiques assuraient l\'impartialité.',
        key_figures: ['Josué', 'Les Lévites', 'Les anciens des villes'],
        related_events: ['Partage de la terre', 'Organisation lévitique', 'Assemblée de Sichem'],
        educational_notes: 'Préfigure le refuge spirituel en Christ. Importance de structures sociales protégeant les vulnérables.'
      },
      {
        id: 'assemblee_sichem',
        title: 'Assemblée de Sichem',
        year_bc: 1188,
        description: 'Renouvellement de l\'alliance avant la mort de Josué',
        book: 'Josué 24',
        available: false,
        summary: 'Dernière exhortation de Josué et engagement du peuple à servir l\'Éternel.',
        key_verses: [
          'Josué 24:15 - Choisissez aujourd\'hui qui vous voulez servir',
          'Josué 24:24 - C\'est l\'Éternel, notre Dieu, que nous servirons'
        ],
        historical_context: 'Testament spirituel de Josué. Sichem, lieu chargé d\'histoire patriarcale, choisi pour renouveler l\'alliance mosaïque.',
        spiritual_lessons: [
          'La nécessité du choix personnel dans la foi',
          'L\'importance du témoignage des générations précédentes',
          'L\'engagement public dans l\'alliance',
          'La responsabilité de chaque génération de choisir Dieu'
        ],
        geographical_info: 'Sichem, entre les monts Ébal et Garizim, lieu de la première promesse à Abraham. Centre géographique et spirituel de la terre.',
        cultural_context: 'Les assemblées tribales pour renouveler les alliances étaient courantes. L\'érection de pierres commémoratives perpétuait le souvenir.',
        key_figures: ['Josué', 'Les anciens d\'Israël', 'Toutes les tribus'],
        related_events: ['Promesses à Abraham', 'Alliance du Sinaï', 'Période des Juges'],
        educational_notes: 'Modèle de transmission générationnelle de la foi. Importance de l\'engagement conscient et libre.'
      },
      {
        id: 'periode_juges',
        title: 'Période des Juges',
        description: 'En ce temps-là, il n\'y avait point de roi en Israël.',
        book: 'Juges',
        year_bc: 1150,
        available: false,
        summary: 'Cycle répétitif de rébellion, oppression et délivrance par des héros charismatiques.',
        key_verses: [
          'Juges 21:25 - Chacun faisait ce qui lui semblait bon',
          'Juges 2:16 - L\'Éternel suscita des juges qui les délivrèrent'
        ],
        historical_context: 'Période de transition entre la conquête et la monarchie. Système tribal décentralisé face aux menaces philistines, moabites et autres.',
        spiritual_lessons: [
          'Les conséquences de l\'abandon de Dieu',
          'La fidélité divine malgré l\'infidélité humaine',
          'L\'importance du leadership spirituel',
          'Le cycle destructeur du péché et ses conséquences'
        ],
        geographical_info: 'Conflit pour le contrôle des terres fertiles et des routes commerciales. Pression des Philistins sur la côte et des nomades à l\'est.',
        cultural_context: 'Époque d\'assimilation culturelle dangereuse avec les Cananéens. Syncrétisme religieux et abandon des valeurs de l\'alliance.',
        key_figures: ['Les quinze juges majeurs et mineurs', 'Déborah', 'Gédéon', 'Jephthé', 'Samson'],
        related_events: ['Mort de Josué', 'Oppression étrangère', 'Monarchie de Saül'],
        educational_notes: 'Illustration du besoin humain de leadership divin. Préparation providentielle à la monarchie davidique.'
      },
      {
        id: 'deborah_barak',
        title: 'Déborah et Barak',
        year_bc: 1125,
        description: 'Victoire sur Sisera et l\'armée cananéenne',
        book: 'Juges 4-5',
        available: false,
        summary: 'Leadership féminin prophétique et victoire militaire divine.',
        key_verses: [
          'Juges 4:14 - Lève-toi, car c\'est aujourd\'hui que l\'Éternel livre Sisera',
          'Juges 5:31 - Que tous tes ennemis périssent ainsi, ô Éternel!'
        ],
        historical_context: 'Oppression cananéenne sous Jabin roi de Hatsor. Déborah, femme juge et prophétesse, unique dans l\'ancien Israël.',
        spiritual_lessons: [
          'Dieu utilise qui il veut pour accomplir ses plans',
          'Le courage féminin dans le leadership spirituel',
          'L\'importance de l\'obéissance immédiate aux ordres divins',
          'La célébration des victoires divines par la louange'
        ],
        geographical_info: 'Bataille dans la plaine de Jizreel près du torrent de Kison. Terrain stratégique contrôlant les routes commerciales.',
        cultural_context: 'Société patriarcale où le leadership féminin était exceptionnel. Les chars de fer donnaient l\'avantage militaire aux Cananéens.',
        key_figures: ['Déborah la prophétesse', 'Barak', 'Jaël', 'Sisera'],
        related_events: ['Oppression cananéenne', 'Gédéon contre Madian', 'Samuel le prophète'],
        educational_notes: 'Modèle de leadership spirituel féminin. Importance de la collaboration entre les sexes dans l\'œuvre divine.'
      },
      {
        id: 'gedeon_madian',
        title: 'Gédéon contre Madian',
        year_bc: 1100,
        description: 'Victoire miraculeuse avec 300 hommes',
        book: 'Juges 6-8',
        available: false,
        summary: 'Délivrance d\'Israël de l\'oppression madianite par un héros improbable.',
        key_verses: [
          'Juges 6:12 - L\'Éternel est avec toi, vaillant héros!',
          'Juges 7:7 - C\'est par les trois cents hommes qui ont lapé'
        ],
        historical_context: 'Sept ans d\'oppression madianite avec leurs chameaux, première mention de cette innovation militaire. Gédéon, de la plus petite famille de Manassé.',
        spiritual_lessons: [
          'Dieu choisit les faibles pour confondre les forts',
          'L\'importance de s\'assurer de la volonté divine',
          'La victoire appartient à Dieu, non au nombre',
          'Le danger de l\'idolâtrie même après la délivrance'
        ],
        geographical_info: 'Bataille près de la source de Harod. Les Madianites campaient dans la vallée de Jizreel avec leurs alliés amalécites.',
        cultural_context: 'Les Madianites introduisent l\'usage militaire du chameau. Gédéon refuse la royauté héréditaire, maintenant la théocratie.',
        key_figures: ['Gédéon (Jerubbaal)', 'L\'ange de l\'Éternel', 'Les 300 soldats d\'élite'],
        related_events: ['Déborah et Barak', 'Abimélec roi de Sichem', 'Jephthé et les Ammonites'],
        educational_notes: 'Prototype du héros improbable choisi par Dieu. Importance de la purification spirituelle avant l\'action.'
      },
      {
        id: 'jephte_ammonites',
        title: 'Jephthé et les Ammonites',
        year_bc: 1075,
        description: 'Victoire de Jephthé et le vœu tragique',
        book: 'Juges 11-12',
        available: false,
        summary: 'Délivrance d\'Israël des Ammonites par un chef rejeté devenu libérateur.',
        key_verses: [
          'Juges 11:29 - L\'esprit de l\'Éternel fut sur Jephthé',
          'Juges 11:35 - Ah! ma fille, tu me jettes dans l\'abattement'
        ],
        historical_context: 'Jephthé, fils d\'une prostituée, exclu par ses frères mais rappelé pour sa valeur militaire. Oppression ammonite de 18 ans.',
        spiritual_lessons: [
          'Dieu peut utiliser ceux que la société rejette',
          'Les conséquences des vœux imprudents',
          'La fidélité divine envers les marginaux',
          'L\'importance de réfléchir avant de s\'engager'
        ],
        geographical_info: 'Conflit en Galaad, région trans-jordanienne. Jephthé argumente sur les droits territoriaux historiques d\'Israël.',
        cultural_context: 'Les vœux religieux étaient sacrés et irrévocables. Le sacrifice humain était pratiqué par les peuples environnants mais interdit en Israël.',
        key_figures: ['Jephthé', 'Sa fille unique', 'Les anciens de Galaad', 'Le roi des Ammonites'],
        related_events: ['Gédéon contre Madian', 'Guerre civile contre Éphraïm', 'Samson et les Philistins'],
        educational_notes: 'Tragédie du leadership sans sagesse spirituelle complète. Importance de la prudence dans les engagements sacrés.'
      },
      {
        id: 'samson_philistins',
        title: 'Samson et les Philistins',
        year_bc: 1060,
        description: 'Le juge nazir et sa lutte contre les Philistins',
        book: 'Juges 13-16',
        available: false,
        summary: 'Histoire tragique du juge le plus fort mais le plus faible spirituellement.',
        key_verses: [
          'Juges 13:5 - Il sera nazir de Dieu dès le ventre de sa mère',
          'Juges 16:28 - Éternel Dieu, souviens-toi de moi'
        ],
        historical_context: 'Domination philistine sur Israël pendant 40 ans. Les Philistins maîtrisent la technologie du fer et contrôlent les plaines côtières.',
        spiritual_lessons: [
          'La force physique sans discipline spirituelle mène à l\'échec',
          'Les conséquences de la désobéissance aux vœux sacrés',
          'La miséricorde divine même dans l\'échec humain',
          'L\'importance de la consécration personnelle'
        ],
        geographical_info: 'Région frontalière entre la montagne judaïte et la plaine philistine. Gaza, ville fortifiée philistine sur la côte.',
        cultural_context: 'Le naziréat était un vœu de consécration totale. Les Philistins, "Peuples de la Mer", apportent une culture différente au Proche-Orient.',
        key_figures: ['Samson', 'Dalila', 'Manoach ses parents', 'Les princes philistins'],
        related_events: ['Jephthé et les Ammonites', 'Samuel le dernier juge', 'Saül premier roi'],
        educational_notes: 'Parabole de la consécration gâchée. Même dans l\'échec, Dieu peut encore utiliser une vie pour sa gloire.'
      },
      {
        id: 'samuel_dernier_juge',
        title: 'Samuel, le Dernier Juge',
        year_bc: 1050,
        description: 'Transition vers la monarchie sous Samuel',
        book: '1 Samuel 1-8',
        available: false,
        summary: 'Samuel prophète et juge prépare la transition vers la royauté en Israël.',
        key_verses: [
          '1 Samuel 3:9 - Parle, Éternel, car ton serviteur écoute',
          '1 Samuel 8:7 - C\'est moi qu\'ils rejettent, pour que je ne règne plus sur eux'
        ],
        historical_context: 'Fin de l\'époque des juges. Pression philistine croissante et demande populaire pour un roi "comme les autres nations".',
        spiritual_lessons: [
          'L\'importance de l\'écoute de la voix divine dès le jeune âge',
          'Le leadership spirituel authentique',
          'La résistance au changement des institutions humaines',
          'La souveraineté divine sur les transitions historiques'
        ],
        geographical_info: 'Circuit de jugement entre Béthel, Guilgal, Mitspa et Rama. Sanctuaire de Silo détruit par les Philistins.',
        cultural_context: 'Transition d\'une société tribale vers une monarchie centralisée. Influence de l\'école prophétique naissante.',
        key_figures: ['Samuel', 'Anne sa mère', 'Éli le sacrificateur', 'Les fils corrompus d\'Éli'],
        related_events: ['Samson et les Philistins', 'Prise de l\'arche', 'Onction de Saül'],
        educational_notes: 'Modèle de vocation prophétique précoce. Importance de la formation spirituelle dans la jeunesse.'
      },
      {
        id: 'gedeon_01',
        title: 'Gédéon et les 300 hommes',
        description: 'Avec 300 hommes, Gédéon vainquit une immense armée.',
        book: 'Juges 7',
        year_bc: 1100,
        available: false,
        summary: 'Victoire miraculeuse par la force de Dieu, non par le nombre.',
        key_verses: ['Juges 7:7 - C\'est par les trois cents hommes que je vous sauverai.']
      },
      {
        id: 'samson_01',
        title: 'Samson et sa force',
        description: 'Samson dit à Dalila: Si on me rasait, ma force m\'abandonnerait.',
        book: 'Juges 16',
        year_bc: 1075,
        available: false,
        summary: 'L\'histoire de Samson, juge d\'Israël doté d\'une force surhumaine.',
        key_verses: ['Juges 16:17 - Le rasoir n\'a point passé sur ma tête.']
      }
    ]
  },
  {
    id: 'royaute',
    title: 'Royauté Unie',
    icon: '👑',
    color: '#8b5cf6',
    description: 'Les rois Saül, David et Salomon',
    period_range: '1050-930 av. J.-C.',
    start_year_bc: 1050,
    end_year_bc: 930,
    period_summary: 'Apogée d\'Israël sous trois rois qui établissent et consolident la monarchie. Saül organise la résistance aux Philistins, David unifie et étend le royaume, Salomon apporte prospérité et sagesse. Période d\'expansion maximale et de rayonnement international.',
    key_themes: [
      'Transition de la théocratie à la monarchie',
      'Unification des douze tribus sous un royaume centralisé',
      'Établissement de Jérusalem comme capitale politique et religieuse',
      'Âge d\'or de la littérature et de la sagesse bibliques',
      'Relations diplomatiques avec les puissances voisines'
    ],
    historical_background: 'Émergence d\'Israël comme puissance régionale entre l\'affaiblissement de l\'Égypte et la montée de l\'Assyrie. Contrôle des routes commerciales entre l\'Afrique et l\'Asie.',
    theological_significance: 'Accomplissement des promesses davidiques. Préfiguration du royaume messianique. Tension entre souveraineté divine et leadership humain.',
    events: [
      {
        id: 'saul_roi',
        title: 'Saül, premier roi',
        description: 'Samuel oignit Saül comme premier roi d\'Israël.',
        book: '1 Samuel 10',
        year_bc: 1050,
        available: false,
        summary: 'Établissement de la monarchie israélite avec Saül, répondant à la demande du peuple.',
        key_verses: [
          '1 Samuel 10:1 - Samuel prit une fiole d\'huile, qu\'il répandit sur la tête de Saül',
          '1 Samuel 9:17 - Voici l\'homme qui régnera sur mon peuple'
        ],
        historical_context: 'Première monarchie en Israël, établie sous la pression philistine. Saül, de la tribu de Benjamin, choisi pour sa stature impressionnante et ses qualités militaires.',
        spiritual_lessons: [
          'Dieu répond aux demandes humaines même quand elles ne sont pas idéales',
          'L\'importance de l\'obéissance à Dieu dans le leadership',
          'Les dangers de la jalousie et de la désobéissance',
          'La souveraineté divine dans le choix des leaders'
        ],
        geographical_info: 'Royaume centré à Guibéa de Saül, dans le territoire de Benjamin. Contrôle progressif du plateau central de Canaan.',
        cultural_context: 'Transition d\'une confédération tribale vers une monarchie centralisée. Influence des modèles royaux des nations environnantes.',
        key_figures: ['Saül', 'Samuel le prophète', 'Jonathan son fils', 'Les Philistins'],
        related_events: ['Demande d\'un roi par le peuple', 'Victoires contre les Ammonites', 'Conflit avec David'],
        educational_notes: 'Premier modèle de royauté en Israël. Illustration des défis du leadership sous la souveraineté divine.'
      },
      {
        id: 'david_goliath',
        title: 'David et Goliath',
        description: 'Un jeune berger fait confiance à Dieu pour vaincre un géant.',
        book: '1 Samuel 17',
        year_bc: 1025,
        available: false,
        summary: 'Victoire emblématique de David sur le géant philistin, démonstration de la puissance divine.',
        key_verses: [
          '1 Samuel 17:45 - Tu marches contre moi avec l\'épée; moi, je marche au nom de l\'Éternel',
          '1 Samuel 17:47 - L\'Éternel ne sauve ni par l\'épée ni par la lance'
        ],
        historical_context: 'Conflit dans la vallée d\'Éla entre Israélites et Philistins. Goliath de Gath, guerrier d\'élite de près de 3 mètres, défie l\'armée d\'Israël.',
        spiritual_lessons: [
          'La foi en Dieu surmonte les obstacles apparemment impossibles',
          'Dieu choisit les petits pour confondre les grands',
          'L\'importance du courage face à l\'adversité',
          'La victoire appartient à l\'Éternel, non aux armes humaines'
        ],
        geographical_info: 'Vallée d\'Éla, région frontalière entre Juda et les territoires philistins. Position stratégique pour contrôler l\'accès aux montagnes.',
        cultural_context: 'Combats singuliers entre champions pour éviter les batailles rangées coûteuses. Les Philistins maîtrisent la technologie du fer.',
        key_figures: ['David le berger', 'Goliath de Gath', 'Saül', 'Les frères de David'],
        related_events: ['Onction de David par Samuel', 'Fuite de David', 'David roi de Juda'],
        educational_notes: 'Archétype de la victoire de la foi sur la force brute. David préfigure le Messie vainqueur.'
      },
      {
        id: 'onction_david',
        title: 'Onction de David par Samuel',
        year_bc: 1030,
        description: 'Samuel oint secrètement David comme futur roi d\'Israël',
        book: '1 Samuel 16',
        available: false,
        summary: 'Choix divin de David parmi les fils de Jessé, malgré son jeune âge.',
        key_verses: [
          '1 Samuel 16:7 - L\'Éternel regarde au cœur',
          '1 Samuel 16:13 - L\'esprit de l\'Éternel saisit David'
        ],
        historical_context: 'Rejet de Saül par Dieu à cause de sa désobéissance. Samuel cherche le successeur selon le cœur de Dieu à Bethléhem.',
        spiritual_lessons: [
          'Dieu regarde au cœur, non à l\'apparence extérieure',
          'L\'importance de l\'obéissance sur les sacrifices',
          'Dieu prépare ses serviteurs dans l\'obscurité avant la gloire',
          'L\'onction divine précède et accompagne le service'
        ],
        geographical_info: 'Bethléhem de Juda, petite ville de la tribu de Juda, future ville natale du Messie.',
        cultural_context: 'L\'onction était le rite de consécration des rois, prêtres et prophètes. Le choix du plus jeune était inhabituel.',
        key_figures: ['Samuel', 'David', 'Jessé', 'Les frères de David'],
        related_events: ['Rejet de Saül', 'David et Goliath', 'Fuite de David'],
        educational_notes: 'Modèle de l\'élection divine souveraine. L\'onction confère l\'autorité spirituelle avant l\'autorité politique.'
      },
      {
        id: 'david_fugitif',
        title: 'David fugitif',
        year_bc: 1020,
        description: 'David fuit la jalousie de Saül et vit dans le désert',
        book: '1 Samuel 18-31',
        available: false,
        summary: 'Période d\'épreuve où David apprend à faire confiance à Dieu dans l\'adversité.',
        key_verses: [
          '1 Samuel 24:7 - Que l\'Éternel me garde de porter la main sur mon seigneur',
          'Psaume 23:1 - L\'Éternel est mon berger'
        ],
        historical_context: 'Jalousie de Saül face à la popularité croissante de David. Formation de la bande de David avec 600 hommes désespérés.',
        spiritual_lessons: [
          'L\'école de la souffrance prépare au leadership',
          'Le respect de l\'autorité établie même injuste',
          'Dieu protège et forme ses élus dans le désert',
          'La patience dans l\'attente des promesses divines'
        ],
        geographical_info: 'Désert de Juda, grottes d\'Adullam, En-Guédi. Région hostile mais offrant des refuges naturels.',
        cultural_context: 'Formation d\'une troupe de guerriers loyaux. David épargne Saül malgré les occasions de le tuer.',
        key_figures: ['David', 'Saül', 'Jonathan', 'Abigaïl', 'Les hommes de David'],
        related_events: ['Onction de David', 'Mort de Saül', 'David roi de Juda'],
        educational_notes: 'École de formation divine par l\'épreuve. Importance de l\'intégrité dans les moments difficiles.'
      },
      {
        id: 'mort_saul',
        title: 'Mort de Saül et Jonathan',
        year_bc: 1010,
        description: 'Saül et Jonathan meurent dans la bataille de Guilboa',
        book: '1 Samuel 31',
        available: false,
        summary: 'Fin tragique du premier roi d\'Israël et de son fils dans la bataille contre les Philistins.',
        key_verses: [
          '1 Samuel 31:4 - Saül prit son épée, et se jeta dessus',
          '2 Samuel 1:23 - Saül et Jonathan, aimables et chéris pendant leur vie'
        ],
        historical_context: 'Bataille décisive sur le mont Guilboa. Les Philistins remportent une victoire majeure et contrôlent une grande partie d\'Israël.',
        spiritual_lessons: [
          'Les conséquences tragiques de l\'éloignement de Dieu',
          'La fin des leaders qui abandonnent leur vocation',
          'L\'amour authentique survit aux conflits politiques',
          'Dieu prépare toujours un successeur'
        ],
        geographical_info: 'Mont Guilboa dominant la vallée de Jizreel. Position stratégique contrôlant les routes commerciales du Nord.',
        cultural_context: 'Défaite militaire majeure d\'Israël. Les Philistins exposent les corps pour humilier le peuple.',
        key_figures: ['Saül', 'Jonathan', 'Les Philistins', 'Les hommes de Jabès-Galaad'],
        related_events: ['David fugitif', 'David roi de Juda', 'Guerre civile'],
        educational_notes: 'Fin tragique du premier roi montrant l\'importance de rester fidèle à Dieu. Transition nécessaire vers David.'
      },
      {
        id: 'david_roi',
        title: 'David devient roi sur tout Israël',
        description: 'David fut oint roi sur tout Israël à Jérusalem.',
        book: '2 Samuel 5',
        year_bc: 1000,
        available: false,
        summary: 'Unification définitive du royaume sous David après 7 ans de règne sur Juda seule.',
        key_verses: [
          '2 Samuel 5:3 - Ils oignirent David pour roi sur Israël',
          '2 Samuel 5:7 - David s\'empara de la forteresse de Sion'
        ],
        historical_context: 'Fin de la guerre civile entre la maison de Saül et celle de David. Prise de Jérusalem, ville neutre entre Nord et Sud.',
        spiritual_lessons: [
          'Dieu accomplit ses promesses en son temps',
          'L\'unité du peuple de Dieu sous un seul leader',
          'L\'importance d\'une capitale spirituelle centralisée',
          'La patience divine dans l\'accomplissement des plans'
        ],
        geographical_info: 'Jérusalem (Jébus), ville fortifiée des Jébusiens, position stratégique sur les montagnes de Juda.',
        cultural_context: 'Établissement d\'une capitale politique et religieuse unique. Jérusalem devient "la ville de David".',
        key_figures: ['David', 'Les anciens d\'Israël', 'Les Jébusiens', 'Joab'],
        related_events: ['Mort de Saül', 'Prise de Jérusalem', 'Transport de l\'arche'],
        educational_notes: 'Modèle d\'unification nationale sous leadership divin. Jérusalem préfigure la Jérusalem céleste.'
      },
      {
        id: 'arche_jerusalem',
        title: 'Transport de l\'Arche à Jérusalem',
        year_bc: 999,
        description: 'David ramène l\'arche de l\'alliance à Jérusalem avec grande joie',
        book: '2 Samuel 6',
        available: false,
        summary: 'Centralisation du culte à Jérusalem avec l\'installation de l\'arche dans la ville de David.',
        key_verses: [
          '2 Samuel 6:14 - David dansait de toute sa force devant l\'Éternel',
          '2 Samuel 6:17 - Ils placèrent l\'arche de l\'Éternel à sa place'
        ],
        historical_context: 'L\'arche était restée à Kirjath-Jearim depuis sa restitution par les Philistins. David fait de Jérusalem le centre religieux.',
        spiritual_lessons: [
          'L\'importance de la présence de Dieu au centre de la nation',
          'La joie authentique dans l\'adoration',
          'Le respect des prescriptions divines pour le culte',
          'L\'humilité des leaders dans l\'adoration'
        ],
        geographical_info: 'Transport depuis Kirjath-Jearim jusqu\'à Jérusalem. Installation provisoire dans une tente en attendant le Temple.',
        cultural_context: 'Procession religieuse avec musique, danses et sacrifices. Opposition de Mikal représentant l\'ancien ordre.',
        key_figures: ['David', 'Uzza', 'Mikal', 'Les Lévites'],
        related_events: ['Prise de Jérusalem', 'Alliance davidique', 'Projet du Temple'],
        educational_notes: 'Modèle d\'adoration joyeuse et révérente. Importance de la présence divine au cœur de la communauté.'
      },
      {
        id: 'alliance_davidique',
        title: 'Alliance Davidique',
        year_bc: 997,
        description: 'Dieu promet à David une dynastie éternelle',
        book: '2 Samuel 7',
        available: false,
        summary: 'Promesse divine d\'une descendance royale éternelle à David, fondement messianique.',
        key_verses: [
          '2 Samuel 7:12 - J\'élèverai ta postérité après toi',
          '2 Samuel 7:16 - Ta maison et ton règne subsisteront à toujours'
        ],
        historical_context: 'David désire construire un temple permanent pour l\'Éternel. Dieu lui répond par une promesse de temple spirituel et dynastique.',
        spiritual_lessons: [
          'Les plans de Dieu dépassent nos projets humains',
          'La grâce divine dans les promesses inconditionnelles',
          'L\'importance de la lignée messianique',
          'La reconnaissance humble des bénédictions divines'
        ],
        geographical_info: 'Jérusalem, dans le palais de David. Cette promesse concerne toute la terre d\'Israël et au-delà.',
        cultural_context: 'Alliance royale unique au Proche-Orient par son caractère inconditionnel et éternel.',
        key_figures: ['David', 'Nathan le prophète', 'L\'Éternel'],
        related_events: ['Transport de l\'arche', 'Règne de Salomon', 'Lignée messianique'],
        educational_notes: 'Fondement de l\'espérance messianique. Alliance centrale de l\'Ancien Testament après celle de Moïse.'
      },
      {
        id: 'salomon_sagesse',
        title: 'La sagesse de Salomon',
        description: 'Salomon demanda à Dieu un cœur intelligent pour juger le peuple.',
        book: '1 Rois 3',
        year_bc: 970,
        available: false,
        summary: 'Dieu accorde à Salomon une sagesse incomparable en récompense de sa demande désintéressée.',
        key_verses: [
          '1 Rois 3:9 - Accorde donc à ton serviteur un cœur intelligent',
          '1 Rois 3:12 - Je te donne un cœur sage et intelligent'
        ],
        historical_context: 'Début du règne de Salomon après l\'élimination de ses rivaux. Songe à Gabaon où Dieu offre d\'exaucer sa demande.',
        spiritual_lessons: [
          'Dieu honore les demandes désintéressées',
          'La sagesse est le plus grand trésor pour un leader',
          'Rechercher d\'abord le royaume de Dieu',
          'L\'humilité devant les responsabilités divines'
        ],
        geographical_info: 'Gabaon, haut-lieu de culte avant la construction du Temple. Centre religieux important à l\'époque.',
        cultural_context: 'La sagesse était valorisée au Proche-Orient. Salomon devient le modèle du roi sage dans toute la région.',
        key_figures: ['Salomon', 'L\'Éternel', 'Les deux mères du jugement'],
        related_events: ['Succession de David', 'Construction du Temple', 'Renommée internationale'],
        educational_notes: 'Modèle de la demande spirituelle prioritaire. La sagesse divine dépasse la connaissance humaine.'
      },
      {
        id: 'jugement_salomon',
        title: 'Le Jugement de Salomon',
        year_bc: 969,
        description: 'Salomon révèle la vraie mère par un jugement sage',
        book: '1 Rois 3:16-28',
        available: false,
        summary: 'Premier exemple public de la sagesse de Salomon dans un jugement difficile.',
        key_verses: [
          '1 Rois 3:25 - Partagez en deux l\'enfant qui vit',
          '1 Rois 3:28 - Tout Israël entendit parler du jugement'
        ],
        historical_context: 'Cas juridique complexe sans témoins. Salomon utilise la psychologie maternelle pour révéler la vérité.',
        spiritual_lessons: [
          'La vraie sagesse discerne les cœurs',
          'L\'amour véritable se révèle dans le sacrifice',
          'L\'importance de la justice équitable',
          'La réputation se bâtit sur les actes concrets'
        ],
        geographical_info: 'Jérusalem, dans le palais royal servant de tribunal suprême.',
        cultural_context: 'Ce jugement établit la réputation de Salomon comme juge suprême. Modèle de sagesse judiciaire.',
        key_figures: ['Salomon', 'Les deux mères', 'Le peuple d\'Israël'],
        related_events: ['Sagesse de Salomon', 'Renommée internationale', 'Administration du royaume'],
        educational_notes: 'Illustration parfaite de la sagesse pratique. Modèle de discernement dans les situations complexes.'
      },
      {
        id: 'temple_salomon',
        title: 'Construction du Temple',
        description: 'Salomon bâtit la maison de l\'Éternel à Jérusalem.',
        book: '1 Rois 6-8',
        year_bc: 960,
        available: false,
        summary: 'Édification et consécration du premier Temple de Jérusalem, accomplissement des plans de David.',
        key_verses: [
          '1 Rois 6:1 - Salomon bâtit la maison de l\'Éternel',
          '1 Rois 8:11 - La gloire de l\'Éternel remplissait la maison'
        ],
        historical_context: 'Construction entreprise 480 ans après la sortie d\'Égypte. Collaboration avec Hiram roi de Tyr pour les matériaux et l\'expertise.',
        spiritual_lessons: [
          'L\'importance d\'un lieu central de culte',
          'La beauté et la perfection dans le service divin',
          'L\'accomplissement des promesses divines',
          'La présence de Dieu habitant parmi son peuple'
        ],
        geographical_info: 'Mont Morija à Jérusalem, site de l\'autel de David. Position dominante sur la ville.',
        cultural_context: 'Architecture influencée par les styles phéniciens et égyptiens. Projet de sept ans mobilisant tout le royaume.',
        key_figures: ['Salomon', 'Hiram de Tyr', 'Les artisans spécialisés', 'Le peuple d\'Israël'],
        related_events: ['Plans de David', 'Alliance avec Hiram', 'Consécration du Temple'],
        educational_notes: 'Réalisation du désir de David. Le Temple devient le centre spirituel d\'Israël et symbole de la présence divine.'
      },
      {
        id: 'reine_saba',
        title: 'Visite de la Reine de Saba',
        year_bc: 955,
        description: 'La reine de Saba vient éprouver la sagesse de Salomon',
        book: '1 Rois 10',
        available: false,
        summary: 'Reconnaissance internationale de la sagesse et de la prospérité du royaume de Salomon.',
        key_verses: [
          '1 Rois 10:6 - C\'était la vérité que j\'ai apprise sur tes actions et sur ta sagesse',
          '1 Rois 10:9 - Béni soit l\'Éternel, ton Dieu, qui t\'a accordé sa faveur'
        ],
        historical_context: 'Apogée de la renommée internationale d\'Israël. Relations diplomatiques et commerciales avec l\'Arabie du Sud.',
        spiritual_lessons: [
          'La sagesse divine attire les nations',
          'Témoignage de la bénédiction de Dieu aux païens',
          'L\'importance du témoignage par l\'excellence',
          'La reconnaissance de Dieu par les non-Israélites'
        ],
        geographical_info: 'Voyage de Saba (Yémen actuel) à Jérusalem, parcours de plus de 2000 km à travers le désert.',
        cultural_context: 'Échange de cadeaux somptueux selon les protocoles diplomatiques de l\'époque. Commerce de l\'or, des épices et des pierres précieuses.',
        key_figures: ['Salomon', 'La reine de Saba', 'Les serviteurs royaux'],
        related_events: ['Sagesse de Salomon', 'Prospérité du royaume', 'Relations internationales'],
        educational_notes: 'Illustration de l\'attraction exercée par la sagesse divine. Préfigure l\'attrait universel du royaume messianique.'
      },
      {
        id: 'declin_salomon',
        title: 'Déclin de Salomon',
        year_bc: 940,
        description: 'Les femmes étrangères détournent le cœur de Salomon',
        book: '1 Rois 11',
        available: false,
        summary: 'Apostasie progressive de Salomon influencé par ses épouses païennes, préparant la division du royaume.',
        key_verses: [
          '1 Rois 11:4 - Ses femmes détournèrent son cœur vers d\'autres dieux',
          '1 Rois 11:11 - Je déchirerai le royaume et je le donnerai à ton serviteur'
        ],
        historical_context: 'Mariages politiques multiples avec des princesses étrangères. Introduction de cultes païens en Israël.',
        spiritual_lessons: [
          'Les dangers de la compromission spirituelle',
          'L\'influence négative des alliances impies',
          'Les conséquences de l\'abandon de Dieu',
          'La fidélité divine malgré l\'infidélité humaine'
        ],
        geographical_info: 'Construction de hauts lieux idolâtres sur les montagnes autour de Jérusalem.',
        cultural_context: 'Syncrétisme religieux courant dans les mariages diplomatiques. Tolérance religieuse devenant apostasie.',
        key_figures: ['Salomon vieillissant', 'Ses épouses étrangères', 'Jéroboam', 'Achia le prophète'],
        related_events: ['Mariages diplomatiques', 'Révolte de Jéroboam', 'Division du royaume'],
        educational_notes: 'Leçon sur les dangers du succès sans vigilance spirituelle. Même les plus sages peuvent chuter.'
      }
    ]
  },
  {
    id: 'royaumes_divises',
    title: 'Royaumes Divisés',
    icon: '⚖️',
    color: '#059669',
    description: 'Israël et Juda séparés',
    period_range: '930-587 av. J.-C.',
    start_year_bc: 930,
    end_year_bc: 587,
    period_summary: 'Période tragique de division du peuple de Dieu en deux royaumes rivaux. Israël (Nord) avec 19 rois tous mauvais, détruit par l\'Assyrie en 722. Juda (Sud) avec quelques rois fidèles, détruit par Babylone en 587. Ministère prophétique intense pour appeler à la repentance.',
    key_themes: [
      'Division politique et religieuse du peuple élu',
      'Cycles de réveil et d\'apostasie dans les deux royaumes',
      'Ministère prophétique d\'avertissement et d\'espoir',
      'Jugement divin par les puissances étrangères',
      'Fidélité de Dieu malgré l\'infidélité humaine'
    ],
    historical_background: 'Montée des empires néo-assyrien puis néo-babylonien. Israël et Juda pris entre les superpuissances égyptienne et mésopotamienne. Influence croissante des cultes cananéens et orientaux.',
    theological_significance: 'Demonstration des conséquences de l\'abandon de l\'alliance. Préparation providentielle à l\'exil pour purifier le peuple. Annonce prophétique du Messie et de la restauration finale.',
    events: [
      {
        id: 'schisme_royaume',
        title: 'Division du royaume',
        description: 'Le royaume se divisa : Israël au nord, Juda au sud.',
        book: '1 Rois 12',
        year_bc: 930,
        available: false,
        summary: 'Séparation tragique en deux royaumes rivaux suite à la dureté de Roboam.',
        key_verses: [
          '1 Rois 12:16 - Quelle part avons-nous avec David ?',
          '1 Rois 12:19 - Israël a été rebelle à la maison de David'
        ],
        historical_context: 'Assemblée de Sichem pour confirmer Roboam. Rejet des conseils des anciens au profit des jeunes conseillers. Accomplissement de la prophétie d\'Achia.',
        spiritual_lessons: [
          'Les conséquences de l\'orgueil et de la dureté de cœur',
          'L\'importance d\'écouter les conseils sages',
          'Dieu utilise même les rébellions pour accomplir ses plans',
          'La division affaiblit le peuple de Dieu'
        ],
        geographical_info: 'Sichem, lieu historique des assemblées d\'Israël. Division : 10 tribus au nord (Israël), 2 au sud (Juda et Benjamin).',
        cultural_context: 'Tensions économiques dues aux lourds impôts de Salomon. Antagonisme entre Nord (rural) et Sud (urbain/Jérusalem).',
        key_figures: ['Roboam', 'Jéroboam', 'Les anciens', 'Les jeunes conseillers'],
        related_events: ['Déclin de Salomon', 'Prophétie d\'Achia', 'Veaux d\'or de Jéroboam'],
        educational_notes: 'Illustration des dangers du leadership autocratique. Importance de la sagesse et de l\'humilité dans l\'autorité.'
      },
      {
        id: 'veaux_or_jeroboam',
        title: 'Les Veaux d\'or de Jéroboam',
        year_bc: 928,
        description: 'Jéroboam établit des cultes idolâtres à Dan et Béthel',
        book: '1 Rois 12:25-33',
        available: false,
        summary: 'Installation de centres de culte rivaux pour empêcher le peuple d\'aller à Jérusalem.',
        key_verses: [
          '1 Rois 12:28 - Voici tes dieux, ô Israël, qui t\'ont fait monter du pays d\'Égypte',
          '1 Rois 12:30 - Ce fut là une occasion de péché'
        ],
        historical_context: 'Stratégie politique de Jéroboam pour consolider son royaume en créant une religion d\'État distincte de Juda.',
        spiritual_lessons: [
          'Les compromis religieux pour des gains politiques mènent à l\'apostasie',
          'La facilité apparente cache souvent la rébellion contre Dieu',
          'Les leaders portent la responsabilité des péchés du peuple',
          'L\'idolâtrie commence par des motivations "pratiques"'
        ],
        geographical_info: 'Dan (extrême nord) et Béthel (frontière sud), sanctuaires aux limites du royaume pour intercepter les pèlerins.',
        cultural_context: 'Référence à l\'épisode du veau d\'or au Sinaï. Mélange de yahvisme et de symbolisme taurin cananéen.',
        key_figures: ['Jéroboam I', 'Les prêtres non-lévites', 'Le peuple du Nord'],
        related_events: ['Division du royaume', 'Prophétie contre l\'autel', 'Dynasties instables du Nord'],
        educational_notes: 'Racine de tous les péchés d\'Israël. Démonstration que la religion instrumentalisée corrompt la foi authentique.'
      },
      {
        id: 'achab_jezabel',
        title: 'Règne d\'Achab et Jézabel',
        year_bc: 874,
        description: 'Achab épouse Jézabel et introduit le culte de Baal en Israël',
        book: '1 Rois 16:29-33',
        available: false,
        summary: 'Apogée de l\'apostasie en Israël sous l\'influence de la reine phénicienne Jézabel.',
        key_verses: [
          '1 Rois 16:30 - Achab fit ce qui est mal aux yeux de l\'Éternel, plus que tous ceux qui avaient été avant lui',
          '1 Rois 16:33 - Achab fit encore d\'autres choses qui irritèrent l\'Éternel'
        ],
        historical_context: 'Alliance matrimoniale avec Tyr. Introduction officielle du culte de Baal-Melqart phénicien. Construction d\'un temple à Baal à Samarie.',
        spiritual_lessons: [
          'L\'influence destructrice des alliances impies',
          'Les mariages mixtes peuvent compromettre la foi',
          'L\'apostasie progressive mène au jugement divin',
          'L\'importance de leaders spirituels fidèles'
        ],
        geographical_info: 'Samarie, nouvelle capitale d\'Israël construite par Omri. Influence phénicienne sur l\'architecture et le culte.',
        cultural_context: 'Jézabel impose activement sa religion, persécutant les prophètes de l\'Éternel. Syncrétisme religieux généralisé.',
        key_figures: ['Achab', 'Jézabel de Sidon', 'Les prophètes de Baal', 'Élie le Thishbite'],
        related_events: ['Mariage politique', 'Persécution des prophètes', 'Sécheresse d\'Élie'],
        educational_notes: 'Illustration parfaite de la compromission spirituelle par les alliances politiques. Préparation au ministère d\'Élie.'
      },
      {
        id: 'elie_secheresse',
        title: 'Élie annonce la Sécheresse',
        year_bc: 872,
        description: 'Élie annonce trois ans de sécheresse comme jugement divin',
        book: '1 Rois 17',
        available: false,
        summary: 'Première intervention publique d\'Élie contre Achab, démonstrant la souveraineté de l\'Éternel.',
        key_verses: [
          '1 Rois 17:1 - Il n\'y aura ces années-ci ni rosée ni pluie, sinon à ma parole',
          '1 Rois 17:6 - Les corbeaux lui apportaient du pain et de la viande'
        ],
        historical_context: 'Confrontation directe avec Achab et le système religieux de Baal, dieu supposé de la fertilité et de la pluie.',
        spiritual_lessons: [
          'Dieu contrôle les forces de la nature',
          'La foi prophétique ose défier les puissants',
          'Dieu pourvoit miraculeusement à ses serviteurs',
          'Le jugement divin vise la repentance, non la destruction'
        ],
        geographical_info: 'Torrent de Kerith à l\'est du Jourdain, puis Sarepta en territoire phénicien. Protection divine hors d\'Israël.',
        cultural_context: 'Défiance directe du culte de Baal, réputé maître de la pluie. Miracle chez une veuve païenne souligne l\'universalité divine.',
        key_figures: ['Élie', 'Achab', 'La veuve de Sarepta', 'Son fils ressuscité'],
        related_events: ['Règne d\'Achab', 'Mont Carmel', 'Fuite au mont Horeb'],
        educational_notes: 'Introduction du grand prophète Élie. Démonstration que l\'Éternel, non Baal, contrôle les éléments naturels.'
      },
      {
        id: 'elie_01',
        title: 'Élie au mont Carmel',
        description: 'Le feu de l\'Éternel tomba et consuma l\'holocauste.',
        book: '1 Rois 18',
        year_bc: 870,
        available: false,
        summary: 'Épreuve décisive prouvant que l\'Éternel est le vrai Dieu face aux prophètes de Baal.',
        key_verses: [
          '1 Rois 18:39 - C\'est l\'Éternel qui est Dieu ! C\'est l\'Éternel qui est Dieu !',
          '1 Rois 18:21 - Jusqu\'à quand clocherez-vous des deux côtés ?'
        ],
        historical_context: 'Apogée de la crise religieuse en Israël. Confrontation publique entre Élie et 450 prophètes de Baal sur le mont Carmel.',
        spiritual_lessons: [
          'Dieu répond à la foi authentique par des miracles',
          'Il faut choisir entre le vrai Dieu et les idoles',
          'La patience divine a des limites',
          'Un seul fidèle avec Dieu est plus fort que des multitudes'
        ],
        geographical_info: 'Mont Carmel dominant la mer Méditerranée, frontière entre Israël et la Phénicie. Lieu symbolique du combat spirituel.',
        cultural_context: 'Épreuve publique selon les codes religieux de l\'époque. Le feu divin authentifie le vrai prophète et le vrai Dieu.',
        key_figures: ['Élie', 'Les prophètes de Baal', 'Le peuple d\'Israël', 'Abdias'],
        related_events: ['Sécheresse d\'Élie', 'Massacre des prophètes de Baal', 'Fuite d\'Élie'],
        educational_notes: 'Sommet du ministère d\'Élie. Modèle de confrontation prophétique contre l\'idolâtrie. Retour de la pluie confirme la victoire.'
      },
      {
        id: 'elie_horeb',
        title: 'Élie au mont Horeb',
        year_bc: 869,
        description: 'Élie fuit Jézabel et rencontre Dieu dans un murmure doux et léger',
        book: '1 Rois 19',
        available: false,
        summary: 'Moment de découragement d\'Élie et révélation de Dieu dans la douceur, non dans la violence.',
        key_verses: [
          '1 Rois 19:12 - Après le feu, un murmure doux et léger',
          '1 Rois 19:18 - Je laisserai en Israël sept mille hommes'
        ],
        historical_context: 'Fuite d\'Élie devant les menaces de Jézabel après la victoire du Carmel. Voyage de 40 jours jusqu\'au mont Sinaï.',
        spiritual_lessons: [
          'Dieu se révèle souvent dans la douceur plutôt que dans la force',
          'Même les plus grands prophètes connaissent le découragement',
          'Dieu a toujours un reste fidèle invisible',
          'L\'encouragement divin dans les moments de solitude'
        ],
        geographical_info: 'Mont Horeb (Sinaï), lieu de la révélation de la Loi à Moïse. Pèlerinage prophétique aux sources de la foi.',
        cultural_context: 'Parallèle avec Moïse au Sinaï. La théophanie douce contraste avec les manifestations violentes précédentes.',
        key_figures: ['Élie découragé', 'L\'ange de l\'Éternel', 'Jézabel', 'Les 7000 fidèles cachés'],
        related_events: ['Mont Carmel', 'Onction d\'Élisée', 'Onction de Jéhu'],
        educational_notes: 'Leçon sur la nature de Dieu qui préfère la douceur à la violence. Encouragement pour les serviteurs découragés.'
      },
      {
        id: 'elisee_succession',
        title: 'Élisée succède à Élie',
        year_bc: 848,
        description: 'Élie est enlevé au ciel et Élisée reçoit une double portion de son esprit',
        book: '2 Rois 2',
        available: false,
        summary: 'Transition prophétique spectaculaire avec l\'enlèvement d\'Élie et l\'investiture d\'Élisée.',
        key_verses: [
          '2 Rois 2:9 - Qu\'il y ait sur moi une double portion de ton esprit',
          '2 Rois 2:11 - Élie monta au ciel dans un tourbillon'
        ],
        historical_context: 'Transmission de l\'autorité prophétique. Élie est le second personnage biblique enlevé vivant au ciel après Hénoc.',
        spiritual_lessons: [
          'Dieu prépare la succession de ses serviteurs',
          'L\'enlèvement récompense la fidélité exceptionnelle',
          'L\'héritage spirituel se transmet par la foi',
          'La continuité du ministère prophétique'
        ],
        geographical_info: 'Circuit de Guilgal à Béthel, Jéricho, puis au-delà du Jourdain. Lieux symboliques de l\'histoire sainte.',
        cultural_context: 'Les écoles de prophètes reconnaissent la succession. Le manteau d\'Élie symbolise la transmission d\'autorité.',
        key_figures: ['Élie', 'Élisée', 'Les fils des prophètes', 'Le char de feu'],
        related_events: ['Ministère d\'Élie', 'Miracles d\'Élisée', 'Écoles de prophètes'],
        educational_notes: 'Modèle de succession spirituelle. L\'enlèvement d\'Élie préfigure l\'enlèvement final des fidèles.'
      },
      {
        id: 'elisee_miracle',
        title: 'Élisée et les miracles',
        description: 'Élisée accomplit de nombreux miracles au nom de l\'Éternel.',
        book: '2 Rois 4-6',
        year_bc: 845,
        available: false,
        summary: 'Ministère prophétique d\'Élisée marqué par des miracles de compassion et de provision.',
        key_verses: [
          '2 Rois 4:34 - L\'enfant éternua sept fois, et l\'enfant ouvrit les yeux',
          '2 Rois 5:14 - Sa chair redevint comme la chair d\'un jeune enfant'
        ],
        historical_context: 'Ministère de 50 ans d\'Élisée sous plusieurs rois d\'Israël. Miracles répondant aux besoins humains concrets.',
        spiritual_lessons: [
          'Dieu s\'intéresse aux besoins quotidiens de ses enfants',
          'La foi s\'exprime dans les actes de compassion',
          'Les miracles authentifient le message prophétique',
          'Dieu utilise des moyens simples pour des œuvres extraordinaires'
        ],
        geographical_info: 'Ministère itinérant à travers Israël : Sunem, Dothan, Samarie, Jéricho. Écoles de prophètes dans diverses villes.',
        cultural_context: 'Élisée, plus accessible qu\'Élie, mélange vie publique et miracles personnels. Respect même des ennemis (Naaman).',
        key_figures: ['Élisée', 'La Sunamite', 'Naaman le Syrien', 'Guéhazi', 'Les fils des prophètes'],
        related_events: ['Succession d\'Élie', 'Guérison de Naaman', 'Multiplication des pains'],
        educational_notes: 'Modèle de ministère prophétique compatissant. Les miracles servent l\'amour divin, non la démonstration de force.'
      },
      {
        id: 'jehu_revolution',
        title: 'Révolution de Jéhu',
        year_bc: 841,
        description: 'Jéhu extermine la dynastie d\'Omri et détruit le culte de Baal',
        book: '2 Rois 9-10',
        available: false,
        summary: 'Coup d\'État sanglant ordonné par Dieu pour éliminer l\'idolâtrie de la famille d\'Achab.',
        key_verses: [
          '2 Rois 9:7 - Tu frapperas la maison d\'Achab, ton maître',
          '2 Rois 10:28 - Jéhu fit disparaître Baal du milieu d\'Israël'
        ],
        historical_context: 'Accomplissement des prophéties d\'Élie contre la dynastie d\'Omri. Jéhu, général ambitieux, exécute le jugement divin.',
        spiritual_lessons: [
          'Dieu utilise des instruments imparfaits pour ses jugements',
          'L\'obéissance partielle ne satisfait pas Dieu complètement',
          'Le zèle sans sagesse peut dépasser les intentions divines',
          'Les péchés des leaders ont des conséquences nationales'
        ],
        geographical_info: 'Jizreel, résidence royale d\'Achab. Samarie, capitale d\'Israël où se concentre la purge.',
        cultural_context: 'Révolution brutale selon les standards de l\'époque. Élimination systématique de la famille royale et des prêtres de Baal.',
        key_figures: ['Jéhu', 'Jézabel', 'Joram roi d\'Israël', 'Ochozias roi de Juda'],
        related_events: ['Règne d\'Achab', 'Prophéties d\'Élie', 'Dynastie de Jéhu'],
        educational_notes: 'Jugement divin sur l\'apostasie systémique. Illustration que Dieu honore partiellement l\'obéissance incomplète.'
      },
      {
        id: 'chute_samarie',
        title: 'Chute de Samarie',
        year_bc: 722,
        description: 'L\'Assyrie détruit le royaume d\'Israël et déporte sa population',
        book: '2 Rois 17',
        available: false,
        summary: 'Fin du royaume du Nord après 200 ans d\'apostasie continue malgré les avertissements prophétiques.',
        key_verses: [
          '2 Rois 17:6 - Le roi d\'Assyrie prit Samarie, et emmena Israël captif en Assyrie',
          '2 Rois 17:18 - L\'Éternel s\'irrita violemment contre Israël, et les ôta de devant sa face'
        ],
        historical_context: 'Siège de trois ans par Salmanasar V puis Sargon II d\'Assyrie. Déportation massive et remplacement par des populations étrangères.',
        spiritual_lessons: [
          'Les conséquences ultimes de l\'apostasie persistante',
          'Dieu patiente longtemps mais finit par juger',
          'L\'importance d\'écouter les avertissements prophétiques',
          'La fidélité de Dieu à ses promesses de jugement comme de bénédiction'
        ],
        geographical_info: 'Samarie, capitale d\'Israël, tombe après un siège prolongé. Déportation vers l\'Assyrie et la Médie.',
        cultural_context: 'Politique assyrienne de déportation croisée pour prévenir les révoltes. Fin de l\'identité nationale des dix tribus.',
        key_figures: ['Osée dernier roi d\'Israël', 'Sargon II d\'Assyrie', 'Les déportés', 'Les colons étrangers'],
        related_events: ['Avertissements prophétiques', 'Siège assyrien', 'Naissance des Samaritains'],
        educational_notes: 'Accomplissement des malédictions de l\'alliance (Deutéronome 28). Leçon permanente sur les conséquences de l\'apostasie.'
      },
      {
        id: 'chute_israel',
        title: 'Chute du royaume d\'Israël',
        description: 'L\'Assyrie déporta Israël à cause de ses péchés.',
        book: '2 Rois 17',
        year_bc: 722,
        available: false,
        summary: 'Fin du royaume du Nord par la conquête assyrienne.',
        key_verses: ['2 Rois 17:6 - Le roi d\'Assyrie prit Samarie, et emmena Israël captif.']
      },
      {
        id: 'ezechias_reforme',
        title: 'Réforme d\'Ézéchias',
        description: 'Ézéchias rétablit le culte de l\'Éternel en Juda.',
        book: '2 Rois 18',
        year_bc: 715,
        available: false,
        summary: 'Grand réveil spirituel en Juda avec purification du Temple et célébration de la Pâque.',
        key_verses: [
          '2 Rois 18:5 - Il mit sa confiance en l\'Éternel, le Dieu d\'Israël',
          '2 Chroniques 30:26 - Il y eut une grande joie à Jérusalem'
        ],
        historical_context: 'Réaction contre l\'idolâtrie d\'Achaz. Ézéchias restaure le culte légitime après la fermeture du Temple par son père.',
        spiritual_lessons: [
          'Il n\'est jamais trop tard pour revenir à Dieu',
          'Les réformes spirituelles demandent courage et persévérance',
          'L\'importance de purifier les lieux de culte',
          'Un leader pieux peut transformer une nation'
        ],
        geographical_info: 'Jérusalem et tout Juda. Extension de l\'invitation aux survivants du Nord après la chute de Samarie.',
        cultural_context: 'Première Pâque célébrée selon la Loi depuis l\'époque de Salomon. Participation exceptionnelle de rescapés du Nord.',
        key_figures: ['Ézéchias', 'Les Lévites purificateurs', 'Le peuple de Juda', 'Rescapés d\'Israël'],
        related_events: ['Règne impie d\'Achaz', 'Menace assyrienne', 'Maladie d\'Ézéchias'],
        educational_notes: 'Modèle de réveil spirituel authentique. Importance de la purification avant la célébration.'
      },
      {
        id: 'josias_reforme',
        title: 'Réforme de Josias',
        description: 'Josias détruisit tous les lieux d\'idolâtrie.',
        book: '2 Rois 22-23',
        year_bc: 621,
        available: false,
        summary: 'Dernière grande réforme de Juda avec découverte du Deutéronome et purification complète du pays.',
        key_verses: [
          '2 Rois 23:25 - Il n\'y eut point de roi avant lui qui revînt à l\'Éternel',
          '2 Rois 22:11 - Lorsque le roi eut entendu les paroles du livre de la loi, il déchira ses vêtements'
        ],
        historical_context: 'Découverte du livre de la Loi lors des travaux de restauration du Temple. Josias réagit avec une repentance totale.',
        spiritual_lessons: [
          'La Parole de Dieu a le pouvoir de transformer les cœurs',
          'La vraie repentance mène à l\'action concrète',
          'Il faut détruire complètement les vestiges de l\'idolâtrie',
          'Les réformes sincères touchent tous les aspects de la vie'
        ],
        geographical_info: 'Purification s\'étendant de Guéba à Beer-Shéba, et même jusqu\'aux territoires du Nord (Béthel).',
        cultural_context: 'Réforme la plus radicale de l\'histoire de Juda. Destruction systématique des hauts lieux et objets idolâtres.',
        key_figures: ['Josias', 'Hilkija le sacrificateur', 'Hulda la prophétesse', 'Shaphan le secrétaire'],
        related_events: ['Découverte de la Loi', 'Célébration de la Pâque', 'Mort à Meguiddo'],
        educational_notes: 'Dernière chance de repentance nationale pour Juda. Modèle de réforme basée sur la redécouverte de l\'Écriture.'
      }
    ]
  },
  {
    id: 'exil_retour',
    title: 'Exil et Retour',
    icon: '🏛️',
    color: '#dc2626',
    description: 'Captivité babylonienne et restauration',
    period_range: '587-333 av. J.-C.',
    start_year_bc: 587,
    end_year_bc: 333,
    period_summary: 'Période de purification du peuple élu par l\'exil babylonien de 70 ans, puis retour progressif en trois vagues sous Zorobabel, Esdras et Néhémie. Reconstruction du Temple et des murailles de Jérusalem. Formation du judaïsme post-exilique avec ses institutions.',
    key_themes: [
      'Jugement divin par l\'exil pour purifier le peuple',
      'Fidélité de Dieu qui maintient un reste',
      'Retour graduel et reconstruction progressive',
      'Restauration spirituelle et institutionnelle',
      'Préservation de l\'identité juive en diaspora'
    ],
    historical_background: 'Domination babylonienne puis perse. Édit de Cyrus permettant le retour. Politique perse de tolérance religieuse favorisant la restauration des peuples déportés.',
    theological_significance: 'Accomplissement des prophéties de jugement et de restauration. Préparation à la venue du Messie par la purification du peuple et l\'attente messianique.',
    events: [
      {
        id: 'chute_jerusalem',
        title: 'Chute de Jérusalem',
        description: 'Nabuchodonosor détruisit Jérusalem et le Temple.',
        book: '2 Rois 25',
        year_bc: 587,
        available: false,
        summary: 'Destruction finale du Temple et de Jérusalem après 18 mois de siège, début de l\'exil babylonien.',
        key_verses: [
          '2 Rois 25:9 - Il brûla la maison de l\'Éternel',
          'Lamentations 1:1 - Comment est-elle assise solitaire, cette ville si peuplée!'
        ],
        historical_context: 'Troisième et dernière déportation babylonienne. Révolte de Sédécias contre Nabuchodonosor malgré les avertissements de Jérémie.',
        spiritual_lessons: [
          'Les conséquences ultimes de la rébellion contre Dieu',
          'Accomplissement précis des prophéties divines',
          'Même dans le jugement, Dieu préserve un reste',
          'La destruction temporelle prépare la restauration spirituelle'
        ],
        geographical_info: 'Destruction complète de Jérusalem et du Temple de Salomon. Déportation vers Babylone, la Mésopotamie.',
        cultural_context: 'Fin de l\'indépendance politique de Juda. Début de la diaspora juive et de la formation du judaïsme rabbinique.',
        key_figures: ['Nabuchodonosor II', 'Sédécias dernier roi', 'Jérémie le prophète', 'Les déportés'],
        related_events: ['Prophéties de Jérémie', 'Siège de Jérusalem', 'Début de l\'exil'],
        educational_notes: 'Accomplissement des malédictions de l\'alliance. Point culminant du jugement divin sur l\'apostasie persistante.'
      },
      {
        id: 'daniel_babylone',
        title: 'Daniel à Babylone',
        year_bc: 605,
        description: 'Daniel et ses compagnons restent fidèles à Dieu en terre d\'exil',
        book: 'Daniel 1-6',
        available: false,
        summary: 'Exemple de fidélité juive en exil, témoignage de la puissance divine aux païens.',
        key_verses: [
          'Daniel 1:8 - Daniel résolut de ne pas se souiller',
          'Daniel 6:10 - Daniel se mettait à genoux trois fois le jour'
        ],
        historical_context: 'Formation d\'une élite juive à la cour babylonienne. Daniel et ses compagnons montrent qu\'on peut servir Dieu en terre étrangère.',
        spiritual_lessons: [
          'La fidélité à Dieu est possible même en contexte hostile',
          'Dieu honore ceux qui l\'honorent',
          'Le témoignage des croyants touche les païens',
          'L\'intégrité personnelle dans les fonctions publiques'
        ],
        geographical_info: 'Babylone, capitale de l\'empire néo-babylonien. Palais royal et école des jeunes nobles.',
        cultural_context: 'Assimilation contrôlée des élites déportées. Formation multiculturelle à la cour impériale.',
        key_figures: ['Daniel (Beltshatsar)', 'Shadrak, Méshak, Abed-Nego', 'Nabuchodonosor', 'Darius le Mède'],
        related_events: ['Première déportation', 'Fosse aux lions', 'Visions apocalyptiques'],
        educational_notes: 'Modèle de vie pieuse en diaspora. Daniel préfigure la résistance spirituelle juive en exil.'
      },
      {
        id: 'daniel_01',
        title: 'Daniel dans la fosse aux lions',
        description: 'La fidélité de Daniel est récompensée par un miracle divin.',
        book: 'Daniel 6',
        year_bc: 540,
        available: false,
        summary: 'Dieu protège Daniel qui reste fidèle malgré l\'interdiction de prier sous l\'empire perse.',
        key_verses: [
          'Daniel 6:22 - Mon Dieu a envoyé son ange et fermé la gueule des lions',
          'Daniel 6:10 - Daniel se mettait à genoux trois fois le jour et priait'
        ],
        historical_context: 'Transition de l\'empire babylonien vers l\'empire perse sous Darius. Complot des satrapes contre Daniel.',
        spiritual_lessons: [
          'La fidélité à Dieu ne se négocie jamais',
          'Dieu délivre ceux qui lui font confiance',
          'La prière régulière est plus forte que les lois humaines',
          'L\'intégrité suscite jalousie mais attire respect divin'
        ],
        geographical_info: 'Babylone sous domination perse. Fosse aux lions probablement dans les jardins royaux.',
        cultural_context: 'Lois des Mèdes et des Perses irrévocables. Culte du roi comme test de loyauté politique.',
        key_figures: ['Daniel âgé', 'Darius le roi', 'Les satrapes jaloux', 'L\'ange de Dieu'],
        related_events: ['Conquête perse', 'Édit de Cyrus', 'Retour d\'exil'],
        educational_notes: 'Climax du témoignage de Daniel. Démonstration que Dieu règne sur tous les empires terrestres.'
      },
      {
        id: 'edit_cyrus',
        title: 'Édit de Cyrus',
        year_bc: 538,
        description: 'Cyrus autorise le retour des Juifs et la reconstruction du Temple',
        book: 'Esdras 1',
        available: false,
        summary: 'Accomplissement de la prophétie des 70 ans, début du retour d\'exil.',
        key_verses: [
          'Esdras 1:2 - Ainsi parle Cyrus, roi des Perses: L\'Éternel m\'a chargé de lui bâtir une maison à Jérusalem',
          '2 Chroniques 36:22 - Pour que s\'accomplît la parole de l\'Éternel prononcée par Jérémie'
        ],
        historical_context: 'Politique perse de restauration des cultes locaux pour s\'assurer la loyauté des peuples. Cyrus accomplit sans le savoir les prophéties bibliques.',
        spiritual_lessons: [
          'Dieu utilise même les rois païens pour accomplir ses plans',
          'Les prophéties divines s\'accomplissent au temps fixé',
          'Le retour d\'exil est un acte de grâce divine',
          'Dieu tourne le cœur des rois selon sa volonté'
        ],
        geographical_info: 'Édit proclamé dans tout l\'empire perse depuis Babylone jusqu\'à l\'Inde et l\'Éthiopie.',
        cultural_context: 'Tolérance religieuse perse contrastant avec l\'impérialisme babylonien. Restitution des vases sacrés.',
        key_figures: ['Cyrus le Grand', 'Les exilés juifs', 'Zorobabel', 'Sheshbatsar'],
        related_events: ['Fin des 70 ans', 'Premier retour', 'Reconstruction du Temple'],
        educational_notes: 'Tournant providentiel de l\'histoire juive. Cyrus appelé "messie" (oint) par Ésaïe 45:1.'
      },
      {
        id: 'zorobabel_retour',
        title: 'Premier Retour avec Zorobabel',
        year_bc: 537,
        description: 'Zorobabel mène 42 360 exilés dans le premier retour à Jérusalem',
        book: 'Esdras 2',
        available: false,
        summary: 'Premier groupe de rapatriés sous la direction de Zorobabel et Josué le sacrificateur.',
        key_verses: [
          'Esdras 2:64 - Toute l\'assemblée réunie était de 42 360 personnes',
          'Esdras 3:11 - Ils chantaient, célébrant et louant l\'Éternel'
        ],
        historical_context: 'Organisation méticuleuse du retour avec recensement par familles. Priorité donnée aux Lévites et aux serviteurs du Temple.',
        spiritual_lessons: [
          'Dieu accomplit ses promesses de restauration',
          'L\'importance de préserver les généalogies et l\'identité',
          'Le retour d\'exil est un acte de foi courageux',
          'La priorité du culte dans la reconstruction nationale'
        ],
        geographical_info: 'Voyage de Babylone à Jérusalem à travers 1500 km de désert. Réinstallation dans les villes ancestrales.',
        cultural_context: 'Retour volontaire d\'une minorité, la majorité reste en diaspora. Réorganisation sociale et religieuse selon la Loi.',
        key_figures: ['Zorobabel (descendant de David)', 'Josué le sacrificateur', 'Les chefs de familles', 'Sheshbatsar'],
        related_events: ['Édit de Cyrus', 'Pose des fondements du Temple', 'Opposition samaritaine'],
        educational_notes: 'Premier accomplissement de la promesse de retour. Zorobabel dans la lignée messianique (Matthieu 1:12).'
      },
      {
        id: 'esdras_reforme',
        title: 'Mission d\'Esdras',
        year_bc: 458,
        description: 'Esdras mène la réforme spirituelle et enseigne la Loi',
        book: 'Esdras 7-10',
        available: false,
        summary: 'Second retour d\'exil axé sur la restauration spirituelle et l\'enseignement de la Loi.',
        key_verses: [
          'Esdras 7:10 - Car Esdras avait appliqué son cœur à étudier et à mettre en pratique la loi de l\'Éternel',
          'Esdras 10:11 - Séparez-vous des peuples du pays et des femmes étrangères'
        ],
        historical_context: 'Mission sous Artaxerxès avec autorité royale pour établir la Loi juive. Découverte de mariages mixtes compromettant l\'identité du peuple.',
        spiritual_lessons: [
          'L\'importance de l\'étude et de la pratique de la Parole',
          'La nécessité de la séparation du monde pour préserver la foi',
          'Le leadership spirituel exige l\'exemplarité personnelle',
          'La restauration passe par la repentance collective'
        ],
        geographical_info: 'Voyage de Babylone à Jérusalem en quatre mois. Réforme s\'étendant à toutes les villes de Juda.',
        cultural_context: 'Esdras, scribe expert en Loi mosaïque, forme l\'école rabbinique naissante. Dissolution forcée des mariages mixtes.',
        key_figures: ['Esdras le scribe', 'Artaxerxès roi', 'Les chefs de familles', 'Les épouses étrangères'],
        related_events: ['Achèvement du Temple', 'Mariages mixtes', 'Mission de Néhémie'],
        educational_notes: 'Fondation du judaïsme rabbinique centré sur l\'étude de la Torah. Esdras, second Moïse pour le peuple restauré.'
      },
      {
        id: 'nehemie_murailles',
        title: 'Néhémie reconstruit les murailles',
        year_bc: 445,
        description: 'Reconstruction des murailles de Jérusalem en 52 jours',
        book: 'Néhémie 1-6',
        available: false,
        summary: 'Troisième retour d\'exil centré sur la reconstruction des défenses de Jérusalem.',
        key_verses: [
          'Néhémie 2:17 - Venez, rebâtissons la muraille de Jérusalem',
          'Néhémie 6:15 - La muraille fut achevée le vingt-cinquième jour d\'Élul, en cinquante-deux jours'
        ],
        historical_context: 'Néhémie, échanson du roi, obtient l\'autorisation de fortifier Jérusalem malgré l\'opposition des gouverneurs locaux.',
        spiritual_lessons: [
          'La prière précède et accompagne l\'action',
          'L\'importance de la protection dans l\'œuvre spirituelle',
          'La persévérance face à l\'opposition et au découragement',
          'L\'unité du peuple dans l\'effort commun'
        ],
        geographical_info: 'Jérusalem avec ses portes et tours. Travail organisé par sections familiales autour de la ville.',
        cultural_context: 'Reconstruction rapide malgré les menaces. Organisation militaire et civile combinée.',
        key_figures: ['Néhémie', 'Sanballat le Horonite', 'Tobija l\'Ammonite', 'Guéshem l\'Arabe'],
        related_events: ['Opposition des voisins', 'Réforme sociale', 'Lecture publique de la Loi'],
        educational_notes: 'Modèle de leadership pratique et spirituel. Néhémie combine action et prière, fermeté et compassion.'
      },
      {
        id: 'reconstruction_temple',
        title: 'Reconstruction du Temple',
        description: 'Zorobabel et Josué reconstruisent le Temple.',
        book: 'Esdras 3-6',
        year_bc: 515,
        available: false,
        summary: 'Achèvement du second Temple de Jérusalem.',
        key_verses: ['Esdras 6:15 - Cette maison fut achevée le troisième jour du mois d\'Adar.']
      },

    ]
  },
  {
    id: 'intertestamentaire',
    title: 'Période Intertestamentaire',
    icon: '🏺',
    color: '#f59e0b',
    description: 'Entre Ancien et Nouveau Testament',
    period_range: '400 av. J.-C. - 0',
    start_year_bc: 400,
    end_year_bc: 0,
    period_summary: 'Période cruciale de 400 ans entre les prophéties de Malachie et la naissance du Christ. Domination grecque puis romaine. Développement du judaïsme pharisien, essénien et sadducéen. Révolte des Maccabées et indépendance hasmonéenne. Préparation providentielle à la venue du Messie.',
    key_themes: [
      'Silence prophétique et attente messianique croissante',
      'Hellénisation et résistance de l\'identité juive',
      'Développement des sectes et traditions juives',
      'Expansion de la diaspora juive dans l\'Empire',
      'Préparation politique et culturelle pour l\'Évangile'
    ],
    historical_background: 'Conquêtes d\'Alexandre, royaumes hellénistiques (Ptolémées, Séleucides), montée de Rome. Persécution d\'Antiochus IV, révolte maccabéenne, dynastie hasmonéenne, conquête romaine par Pompée.',
    theological_significance: 'Préparation divine du monde pour la venue du Christ : langue grecque universelle, routes romaines, diaspora juive, attente messianique. Développement de la théologie apocalyptique et de la résurrection.',
    events: [
      {
        id: 'alexandre_conquete',
        title: 'Conquêtes d\'Alexandre le Grand',
        year_bc: 333,
        description: 'Alexandre conquiert l\'Empire perse et hellénise l\'Orient',
        book: 'Daniel 8, 11',
        available: false,
        summary: 'Accomplissement des prophéties de Daniel sur le léopard à quatre ailes et le bouc.',
        key_verses: [
          'Daniel 8:5 - Un bouc venait de l\'occident, et parcourait toute la terre',
          'Daniel 11:3 - Un roi puissant se lèvera, il dominera avec une grande puissance'
        ],
        historical_context: 'Victoires fulgurantes d\'Alexandre sur Darius III à Issos et Gaugamèles. La Judée passe sous domination grecque.',
        spiritual_lessons: [
          'Les prophéties de Daniel s\'accomplissent précisément',
          'Dieu contrôle la succession des empires mondiaux',
          'Les conquêtes humaines servent les plans divins',
          'L\'hellénisation prépare la diffusion de l\'Évangile'
        ],
        geographical_info: 'Empire s\'étendant de la Grèce à l\'Inde. Jérusalem soumise pacifiquement selon Flavius Josèphe.',
        cultural_context: 'Début de l\'hellénisation : langue grecque, gymnases, théâtres. Choc culturel avec le judaïsme traditionnel.',
        key_figures: ['Alexandre le Grand', 'Darius III de Perse', 'Les prêtres de Jérusalem'],
        related_events: ['Prophéties de Daniel', 'Partage de l\'empire', 'Domination ptolémaïque'],
        educational_notes: 'Tournant historique majeur. L\'hellénisation facilite la future expansion du christianisme dans l\'Empire romain.'
      },
      {
        id: 'ptolemees_seleucides',
        title: 'Rivalité Ptolémées-Séleucides',
        year_bc: 301,
        description: 'La Judée passe entre l\'Égypte et la Syrie',
        book: 'Daniel 11:5-20',
        available: false,
        summary: 'Six guerres syriennes pour le contrôle de la Palestine, accomplissement de Daniel 11.',
        key_verses: [
          'Daniel 11:6 - Le roi du midi et le roi du nord feront alliance',
          'Daniel 11:15 - Le roi du nord viendra, il élèvera des retranchements'
        ],
        historical_context: 'Partage de l\'empire d\'Alexandre entre les Diadoques. La Palestine, enjeu stratégique entre Égypte et Syrie.',
        spiritual_lessons: [
          'Les nations se disputent mais Dieu contrôle l\'histoire',
          'Son peuple survit aux changements politiques',
          'Les prophéties détaillées de Daniel s\'accomplissent',
          'La providence divine au milieu des conflits'
        ],
        geographical_info: 'Palestine ballottée entre Alexandrie (Ptolémées) et Antioche (Séleucides). Contrôle des routes commerciales.',
        cultural_context: 'Influence hellénistique croissante. Développement de la Septante (traduction grecque) sous les Ptolémées.',
        key_figures: ['Ptolémée I-VI', 'Séleucus I', 'Antiochus I-III', 'Les grands prêtres'],
        related_events: ['Traduction de la Septante', 'Bataille de Raphia', 'Conquête d\'Antiochus III'],
        educational_notes: 'Préparation providientielle : la Septante permet la diffusion de l\'AT en grec dans l\'Empire romain.'
      },
      {
        id: 'antiochus_persecution',
        title: 'Persécution d\'Antiochus IV',
        year_bc: 167,
        description: 'Antiochus Épiphane interdit le judaïsme et profane le Temple',
        book: 'Daniel 11:21-35, 1 Maccabées',
        available: false,
        summary: 'Première persécution religieuse systématique du judaïsme, accomplissement de Daniel 11:21-35.',
        key_verses: [
          'Daniel 11:31 - Ils profaneront le sanctuaire, la forteresse',
          'Daniel 8:13 - Jusqu\'à quand durera la vision sur le sacrifice perpétuel?'
        ],
        historical_context: 'Antiochus IV veut helléniser de force la Judée. Interdiction de la circoncision, du sabbat, sacrifice de porcs dans le Temple.',
        spiritual_lessons: [
          'La foi résiste à la persécution la plus intense',
          'Dieu fixe des limites à l\'oppression de son peuple',
          'La fidélité jusqu\'à la mort glorifie Dieu',
          'Les épreuves purifient et fortifient la foi'
        ],
        geographical_info: 'Persécution centrée sur Jérusalem et la Judée. Fuite des fidèles vers les montagnes et le désert.',
        cultural_context: 'Première tentative d\'éradication complète d\'une religion. Martyrs juifs deviennent modèles de résistance.',
        key_figures: ['Antiochus IV Épiphane', 'Le grand prêtre Ménélas', 'Éléazar', 'Les sept frères Maccabées'],
        related_events: ['Profanation du Temple', 'Révolte de Mattathias', 'Purification du Temple'],
        educational_notes: 'Préfigure les persécutions chrétiennes futures. Développement de la théologie du martyre et de la résurrection.'
      }
    ]
  },
  {
    id: 'vie_jesus',
    title: 'Vie de Jésus-Christ',
    icon: '✞',
    color: '#dc2626',
    description: 'De la naissance à l\'ascension du Messie',
    period_range: '6 av. J.-C. - 30 ap. J.-C.',
    start_year_bc: 6,
    end_year_bc: -30,
    period_summary: 'Vie terrestre complète du Fils de Dieu incarné : de la conception virginale à Nazareth jusqu\'à l\'ascension au mont des Oliviers. 33 années qui transforment l\'histoire humaine et accomplissent toutes les prophéties messianiques. Révélation parfaite de Dieu en Jésus-Christ.',
    key_themes: [
      'Incarnation : Dieu devient homme sans cesser d\'être Dieu',
      'Ministère messianique : enseignements, miracles, compassion',
      'Passion rédemptrice : mort expiatoire pour les péchés du monde',
      'Résurrection victorieuse : victoire sur la mort et Satan',
      'Ascension glorieuse : retour vers le Père et session à sa droite'
    ],
    historical_background: 'Palestine sous domination romaine (Auguste, Tibère). Hérode le Grand puis ses fils. Attente messianique intense. Ponce Pilate gouverneur de Judée. Système religieux juif avec Temple, synagogues, sectes pharisiennes et sadducéennes.',
    theological_significance: 'Centre absolu de l\'histoire du salut. Accomplissement de toutes les promesses de l\'AT. Révélation définitive de Dieu. Réconciliation entre Dieu et l\'humanité. Fondement de la foi chrétienne et de l\'Église universelle.',
    events: [
      {
        id: 'annonciation',
        title: 'Annonciation à Marie',
        year_bc: 6,
        description: 'L\'ange Gabriel annonce à Marie qu\'elle concevra le Messie',
        book: 'Luc 1:26-38',
        available: false,
        summary: 'Annonce surnaturelle de l\'incarnation du Fils de Dieu par conception virginale.',
        key_verses: [
          'Luc 1:31 - Tu deviendras enceinte, et tu enfanteras un fils, et tu lui donneras le nom de Jésus',
          'Luc 1:35 - Le Saint-Esprit viendra sur toi, et la puissance du Très-Haut te couvrira de son ombre',
          'Luc 1:38 - Je suis la servante du Seigneur; qu\'il me soit fait selon ta parole'
        ],
        historical_context: 'Marie, jeune vierge fiancée à Joseph à Nazareth en Galilée. Époque d\'attente messianique intense sous Hérode le Grand.',
        spiritual_lessons: [
          'Dieu choisit les humbles pour accomplir ses plus grands plans',
          'La foi accepte l\'impossible quand Dieu parle',
          'L\'obéissance à Dieu prime sur la compréhension humaine',
          'L\'incarnation commence par l\'acceptation libre de Marie'
        ],
        geographical_info: 'Nazareth, petite ville de Galilée méprisée. Région multiculturelle sous influence hellénistique.',
        cultural_context: 'Société patriarcale où la grossesse hors mariage expose au déshonneur et à la mort. Fiançailles juives équivalentes au mariage.',
        key_figures: ['Marie de Nazareth', 'L\'ange Gabriel', 'Joseph le charpentier'],
        related_events: ['Conception de Jean-Baptiste', 'Visitation', 'Songe de Joseph'],
        educational_notes: 'Moment décisif de l\'histoire : Dieu devient homme. Marie, première croyante du NT, modèle de foi et d\'obéissance.'
      },
      {
        id: 'nativite',
        title: 'Nativité à Bethléhem',
        year_bc: 6,
        description: 'Naissance de Jésus dans une étable à Bethléhem',
        book: 'Matthieu 1:18-25, Luc 2:1-20',
        available: false,
        summary: 'Accomplissement des prophéties : le Messie naît à Bethléhem, ville de David.',
        key_verses: [
          'Luc 2:7 - Elle enfanta son fils premier-né, l\'emmaillota, et le coucha dans une crèche',
          'Luc 2:11 - Il vous est né aujourd\'hui, dans la ville de David, un Sauveur, qui est le Christ, le Seigneur',
          'Matthieu 1:21 - Tu lui donneras le nom de Jésus; c\'est lui qui sauvera son peuple de ses péchés'
        ],
        historical_context: 'Recensement de Quirinius sous l\'empereur Auguste. Joseph et Marie voyagent de Nazareth à Bethléhem pour le recensement.',
        spiritual_lessons: [
          'Dieu accomplit ses promesses avec une précision parfaite',
          'Le Sauveur naît dans l\'humilité, non dans la grandeur',
          'La bonne nouvelle s\'annonce d\'abord aux humbles bergers',
          'Jésus (Yeshua) signifie "l\'Éternel sauve"'
        ],
        geographical_info: 'Bethléhem de Judée, ville de David, à 8 km au sud de Jérusalem. Accomplissement de Michée 5:1.',
        cultural_context: 'Hôtelleries bondées à cause du recensement. Naissance dans une étable, couché dans une mangeoire d\'animaux.',
        key_figures: ['Jésus nouveau-né', 'Marie', 'Joseph', 'Les bergers', 'L\'ange du Seigneur', 'La multitude céleste'],
        related_events: ['Recensement romain', 'Annonce aux bergers', 'Visite des bergers'],
        educational_notes: 'Naissance la plus importante de l\'histoire. Contraste saisissant : le Créateur naît dans une étable.'
      },
      {
        id: 'visite_mages',
        title: 'Visite des Mages',
        year_bc: 5,
        description: 'Des mages d\'Orient viennent adorer le roi des Juifs',
        book: 'Matthieu 2:1-12',
        available: false,
        summary: 'Reconnaissance du Messie par les nations païennes, guidées par l\'étoile surnaturelle.',
        key_verses: [
          'Matthieu 2:2 - Où est le roi des Juifs qui vient de naître? car nous avons vu son étoile en Orient',
          'Matthieu 2:11 - Ils se prosternèrent et l\'adorèrent; ils ouvrirent ensuite leurs trésors',
          'Matthieu 2:12 - Puis, divinement avertis en songe de ne pas retourner vers Hérode, ils regagnèrent leur pays'
        ],
        historical_context: 'Mages (probablement de Perse/Babylonie) suivent l\'étoile pendant environ 2 ans. Hérode le Grand inquiet de la naissance d\'un rival.',
        spiritual_lessons: [
          'Dieu guide les cœurs sincères vers Jésus',
          'Les païens reconnaissent parfois mieux le Messie que son peuple',
          'L\'adoration s\'exprime par des offrandes précieuses',
          'Or, encens, myrrhe symbolisent royauté, divinité, humanité souffrante'
        ],
        geographical_info: 'Voyage d\'Orient (Perse/Babylonie) jusqu\'à Jérusalem puis Bethléhem. Étoile guide surnaturelle.',
        cultural_context: 'Mages, savants astronomes-astrologues respectés en Orient. Leurs offrandes financent probablement la fuite en Égypte.',
        key_figures: ['Les mages d\'Orient', 'Hérode le Grand inquiet', 'Jésus enfant', 'Marie', 'Joseph'],
        related_events: ['Étoile de Bethléhem', 'Inquiétude d\'Hérode', 'Massacre des innocents', 'Fuite en Égypte'],
        educational_notes: 'Première adoration païenne de Jésus. Universalité du salut préfigurée dès l\'enfance du Christ.'
      },
      {
        id: 'fuite_egypte',
        title: 'Fuite en Égypte',
        year_bc: 5,
        description: 'Joseph emmène Jésus et Marie en Égypte pour échapper à Hérode',
        book: 'Matthieu 2:13-18',
        available: false,
        summary: 'Protection divine de l\'enfant Jésus face à la persécution d\'Hérode le Grand.',
        key_verses: [
          'Matthieu 2:13 - Lève-toi, prends le petit enfant et sa mère, fuis en Égypte',
          'Matthieu 2:15 - Afin que s\'accomplît ce que le Seigneur avait annoncé par le prophète: J\'ai appelé mon fils hors d\'Égypte',
          'Matthieu 2:16 - Hérode fit tuer tous les enfants de deux ans et au-dessous qui étaient à Bethléhem'
        ],
        historical_context: 'Hérode le Grand, tyran paranoïaque, ordonne le massacre des enfants de Bethléhem. L\'Égypte, refuge traditionnel hors de portée d\'Hérode.',
        spiritual_lessons: [
          'Dieu protège son Fils bien-aimé des dangers mortels',
          'L\'obéissance immédiate de Joseph sauve la famille',
          'Les innocents souffrent à cause du péché des puissants',
          'Jésus, nouveau Moïse, "appelé hors d\'Égypte"'
        ],
        geographical_info: 'Voyage de Bethléhem vers l\'Égypte, probablement vers Alexandrie où vivait une importante communauté juive.',
        cultural_context: 'Égypte, province romaine autonome. Nombreuses communautés juives accueillantes. Hérode règne seulement sur la Palestine.',
        key_figures: ['Joseph obéissant', 'Marie', 'Jésus enfant', 'Hérode le meurtrier', 'L\'ange avertisseur', 'Les saints innocents'],
        related_events: ['Songe de Joseph', 'Massacre des innocents', 'Mort d\'Hérode', 'Retour à Nazareth'],
        educational_notes: 'Première persécution contre Jésus. Parallèle avec Moïse enfant sauvé des eaux. Protection divine sur le Messie.'
      },
      {
        id: 'jesus_temple_12ans',
        title: 'Jésus au Temple à 12 ans',
        year_bc: -6,
        description: 'Jésus enfant dialogue avec les docteurs dans le Temple',
        book: 'Luc 2:41-52',
        available: false,
        summary: 'Première manifestation publique de la sagesse et de la conscience messianique de Jésus.',
        key_verses: [
          'Luc 2:46 - Au bout de trois jours, ils le trouvèrent dans le temple, assis au milieu des docteurs',
          'Luc 2:49 - Ne saviez-vous pas qu\'il faut que je m\'occupe des affaires de mon Père?',
          'Luc 2:52 - Jésus croissait en sagesse, en stature, et en grâce, devant Dieu et devant les hommes'
        ],
        historical_context: 'Pèlerinage familial annuel à Jérusalem pour la Pâque. Jésus à l\'âge de la majorité religieuse (bar mitzvah).',
        spiritual_lessons: [
          'Jésus manifeste précocement sa conscience filiale divine',
          'La sagesse divine étonne même les experts religieux',
          'L\'obéissance aux parents terrestres n\'exclut pas la mission céleste',
          'Croissance harmonieuse : sagesse, physique, spirituelle, sociale'
        ],
        geographical_info: 'Temple de Jérusalem, centre spirituel du judaïsme. Voyage depuis Nazareth en caravane familiale.',
        cultural_context: 'Éducation rabbinique par questions-réponses. Bar mitzvah marquant l\'entrée dans l\'âge adulte religieux.',
        key_figures: ['Jésus à 12 ans', 'Marie inquiète', 'Joseph', 'Les docteurs de la Loi étonnés'],
        related_events: ['Pèlerinage pascal', 'Recherche angoissée', 'Retour à Nazareth', 'Croissance cachée'],
        educational_notes: 'Première parole rapportée de Jésus révélant sa relation unique avec le Père. Modèle de croissance équilibrée.'
      },
      {
        id: 'bapteme_jesus',
        title: 'Baptême de Jésus',
        year_bc: -27,
        description: 'Jean-Baptiste baptise Jésus dans le Jourdain, manifestation trinitaire',
        book: 'Matthieu 3:13-17, Marc 1:9-11, Luc 3:21-22',
        available: false,
        summary: 'Inauguration officielle du ministère messianique avec l\'onction du Saint-Esprit et l\'approbation du Père.',
        key_verses: [
          'Matthieu 3:17 - Et voici, une voix fit entendre des cieux ces paroles: Celui-ci est mon Fils bien-aimé',
          'Luc 3:22 - Et le Saint-Esprit descendit sur lui sous une forme corporelle, comme une colombe',
          'Matthieu 3:15 - Laisse faire maintenant, car il est convenable que nous accomplissions ainsi tout ce qui est juste'
        ],
        historical_context: 'Ministère de Jean-Baptiste au désert de Judée. Mouvement de repentance nationale en préparation messianique.',
        spiritual_lessons: [
          'Jésus s\'identifie solidairement avec l\'humanité pécheresse',
          'Manifestation trinitaire : Père, Fils, Saint-Esprit',
          'L\'onction divine équipe pour le service',
          'L\'obéissance à la justice divine même sans nécessité personnelle'
        ],
        geographical_info: 'Fleuve Jourdain, probablement près de Béthanie au-delà du Jourdain. Lieu symbolique d\'entrée en Terre Promise.',
        cultural_context: 'Baptême de repentance pratiqué par Jean. Jésus sans péché se soumet par solidarité et exemple.',
        key_figures: ['Jésus', 'Jean-Baptiste', 'Le Père céleste', 'Le Saint-Esprit sous forme de colombe'],
        related_events: ['Prédication de Jean', 'Tentation au désert', 'Premiers disciples', 'Témoignage de Jean'],
        educational_notes: 'Consécration messianique officielle. Modèle trinitaire de l\'œuvre du salut. Début du ministère public.'
      },
      {
        id: 'tentation_desert',
        title: 'Tentation au Désert',
        year_bc: -27,
        description: 'Jésus jeûne 40 jours et vainc les tentations de Satan',
        book: 'Matthieu 4:1-11, Luc 4:1-13',
        available: false,
        summary: 'Victoire décisive de Jésus sur Satan, préparant son ministère et récapitulant les échecs d\'Israël.',
        key_verses: [
          'Matthieu 4:4 - L\'homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu',
          'Matthieu 4:7 - Tu ne tenteras point le Seigneur, ton Dieu',
          'Matthieu 4:10 - Retire-toi, Satan! Car il est écrit: Tu adoreras le Seigneur, ton Dieu'
        ],
        historical_context: 'Désert de Judée, lieu traditionnel de retraite spirituelle. 40 jours rappellent Moïse au Sinaï et Israël au désert.',
        spiritual_lessons: [
          'La Parole de Dieu est l\'arme suprême contre la tentation',
          'Jésus réussit là où Adam et Israël ont échoué',
          'Le jeûne et la prière préparent aux combats spirituels',
          'Satan est un ennemi réel mais déjà vaincu'
        ],
        geographical_info: 'Désert de Judée entre Jérusalem et la mer Morte. Région désolée propice à la retraite spirituelle.',
        cultural_context: 'Jeûne de 40 jours, exploit spirituel extrême. Tentations portant sur les besoins, l\'orgueil, le pouvoir.',
        key_figures: ['Jésus jeûnant', 'Satan le tentateur', 'Les anges servants'],
        related_events: ['Baptême de Jésus', 'Début du ministère', 'Appel des premiers disciples'],
        educational_notes: 'Victoire fondamentale préparant tout le ministère. Jésus, nouvel Adam, réussit l\'épreuve de l\'obéissance.'
      },
      {
        id: 'premiers_miracles',
        title: 'Premiers Miracles et Signes',
        year_bc: -27,
        description: 'Noces de Cana, purification du Temple, entretien avec Nicodème',
        book: 'Jean 2-3',
        available: false,
        summary: 'Manifestation progressive de la gloire messianique par les premiers signes et enseignements.',
        key_verses: [
          'Jean 2:11 - Tel fut, à Cana en Galilée, le premier des miracles que fit Jésus. Il manifesta sa gloire',
          'Jean 2:19 - Détruisez ce temple, et en trois jours je le relèverai',
          'Jean 3:16 - Car Dieu a tant aimé le monde qu\'il a donné son Fils unique'
        ],
        historical_context: 'Début du ministère galiléen. Jésus participe aux festivités juives tout en révélant sa mission spirituelle.',
        spiritual_lessons: [
          'Jésus transforme l\'ordinaire en extraordinaire',
          'Le corps de Jésus est le vrai temple de Dieu',
          'La nouvelle naissance est nécessaire pour voir le royaume',
          'L\'amour divin motive l\'incarnation et le sacrifice'
        ],
        geographical_info: 'Cana de Galilée pour les noces, Jérusalem pour la Pâque et l\'entretien nocturne avec Nicodème.',
        cultural_context: 'Mariage juif durant plusieurs jours. Purification du Temple contre la commercialisation. Nicodème, pharisien sincère.',
        key_figures: ['Jésus', 'Marie sa mère', 'Les disciples', 'Nicodème', 'Les marchands du Temple'],
        related_events: ['Noces de Cana', 'Purification du Temple', 'Entretien avec Nicodème', 'Baptêmes en Judée'],
        educational_notes: 'Révélation progressive de l\'identité messianique. Signes confirmant la parole d\'enseignement.'
      },
      {
        id: 'sermon_montagne',
        title: 'Sermon sur la Montagne',
        year_bc: -28,
        description: 'Jésus proclame les principes du royaume des cieux',
        book: 'Matthieu 5-7, Luc 6:17-49',
        available: false,
        summary: 'Magna Carta du royaume messianique : béatitudes, justice supérieure, amour des ennemis, prière modèle.',
        key_verses: [
          'Matthieu 5:3-4 - Heureux les pauvres en esprit, car le royaume des cieux est à eux! Heureux les affligés',
          'Matthieu 6:9 - Voici donc comment vous devez prier: Notre Père qui es aux cieux',
          'Matthieu 7:12 - Tout ce que vous voulez que les hommes fassent pour vous, faites-le de même pour eux'
        ],
        historical_context: 'Enseignement donné sur une montagne de Galilée devant une grande foule de disciples et de curieux.',
        spiritual_lessons: [
          'Les valeurs du royaume renversent celles du monde',
          'La justice chrétienne dépasse celle des pharisiens',
          'L\'amour des ennemis révèle la perfection divine',
          'La prière du Seigneur modèle toute vraie prière'
        ],
        geographical_info: 'Montagne près du lac de Galilée, probablement les cornes de Hattin. Amphithéâtre naturel.',
        cultural_context: 'Enseignement rabbinique en plein air. Contraste avec la casuistique pharisienne complexe.',
        key_figures: ['Jésus enseignant', 'Les douze disciples', 'La grande foule', 'Les scribes et pharisiens'],
        related_events: ['Choix des Douze', 'Guérisons multiples', 'Paraboles du royaume'],
        educational_notes: 'Constitution morale du christianisme. Éthique révolutionnaire basée sur l\'amour et la grâce divine.'
      },
      {
        id: 'multiplication_pains',
        title: 'Multiplication des Pains',
        year_bc: -29,
        description: 'Jésus nourrit 5000 hommes avec 5 pains et 2 poissons',
        book: 'Matthieu 14:13-21, Marc 6:30-44, Luc 9:10-17, Jean 6:1-15',
        available: false,
        summary: 'Miracle de compassion révélant Jésus comme le pain de vie et le bon berger qui nourrit son troupeau.',
        key_verses: [
          'Matthieu 14:19 - Il prit les cinq pains et les deux poissons, leva les yeux vers le ciel, et rendit grâces',
          'Jean 6:35 - Jésus leur dit: Je suis le pain de vie. Celui qui vient à moi n\'aura jamais faim',
          'Marc 6:34 - Quand il sortit de la barque, Jésus vit une grande foule, et fut ému de compassion pour eux'
        ],
        historical_context: 'Foule nombreuse venue écouter Jésus dans un lieu désert près du lac de Galilée. Fin de journée, éloignement des villages.',
        spiritual_lessons: [
          'La compassion de Jésus pourvoit aux besoins concrets',
          'Dieu peut multiplier les petites offrandes consacrées',
          'Jésus est le vrai pain qui nourrit l\'âme éternellement',
          'L\'abondance divine dépasse toujours nos besoins'
        ],
        geographical_info: 'Lieu désert près de Bethsaïda, sur la rive nord-est du lac de Galilée.',
        cultural_context: 'Repas pris assis sur l\'herbe par groupes de 50 et 100. Distribution ordonnée par les disciples.',
        key_figures: ['Jésus compatissant', 'Les douze disciples', '5000 hommes plus femmes et enfants', 'Le garçon au pain'],
        related_events: ['Marche sur l\'eau', 'Discourse sur le pain de vie', 'Confession de Pierre'],
        educational_notes: 'Seul miracle rapporté par les quatre évangélistes. Préfigure l\'Eucharistie et le banquet messianique final.'
      },
      {
        id: 'transfiguration',
        title: 'Transfiguration',
        year_bc: -30,
        description: 'Jésus révèle sa gloire divine à Pierre, Jacques et Jean',
        book: 'Matthieu 17:1-13, Marc 9:2-13, Luc 9:28-36',
        available: false,
        summary: 'Manifestation de la gloire divine de Jésus confirmée par la Loi (Moïse) et les Prophètes (Élie).',
        key_verses: [
          'Matthieu 17:2 - Il fut transfiguré devant eux; son visage resplendit comme le soleil',
          'Matthieu 17:5 - Une voix fit entendre de la nuée ces paroles: Celui-ci est mon Fils bien-aimé: écoutez-le',
          'Luc 9:31 - Ils parlaient de son départ qu\'il allait accomplir à Jérusalem'
        ],
        historical_context: 'Événement sur une haute montagne (probablement l\'Hermon) six jours après la confession de Pierre à Césarée de Philippe.',
        spiritual_lessons: [
          'La gloire divine de Jésus confirmée avant sa passion',
          'Moïse et Élie attestent l\'accomplissement en Jésus',
          'La voix du Père commande d\'écouter le Fils',
          'Anticipation de la gloire de la résurrection'
        ],
        geographical_info: 'Haute montagne, traditionnellement le mont Hermon (2814m) au nord de la Palestine.',
        cultural_context: 'Retraite de prière avec le cercle intime. Moïse et Élie représentent la Loi et les Prophètes.',
        key_figures: ['Jésus transfiguré', 'Pierre, Jacques, Jean', 'Moïse', 'Élie', 'La voix du Père'],
        related_events: ['Confession de Pierre', 'Première annonce de la passion', 'Descente de la montagne'],
        educational_notes: 'Confirmation divine de l\'identité messianique avant la passion. Encouragement pour les disciples face à la croix.'
      },
      {
        id: 'entree_triomphale',
        title: 'Entrée Triomphale à Jérusalem',
        year_bc: -30,
        description: 'Jésus entre comme roi messianique le dimanche des Rameaux',
        book: 'Matthieu 21:1-11, Marc 11:1-11, Luc 19:28-44, Jean 12:12-19',
        available: false,
        summary: 'Accomplissement de Zacharie 9:9 : le roi vient humblement monté sur un ânon.',
        key_verses: [
          'Matthieu 21:5 - Dites à la fille de Sion: Voici, ton roi vient à toi, plein de douceur, et monté sur un âne',
          'Luc 19:38 - Béni soit le roi qui vient au nom du Seigneur! Paix dans le ciel, et gloire dans les lieux très hauts!',
          'Jean 12:13 - Hosanna! Béni soit celui qui vient au nom du Seigneur, le roi d\'Israël!'
        ],
        historical_context: 'Semaine de la Pâque, Jérusalem bondée de pèlerins. Tension maximale avec les autorités religieuses.',
        spiritual_lessons: [
          'Jésus accepte publiquement le titre de Roi-Messie',
          'L\'humilité caractérise le règne messianique',
          'Accomplissement précis des prophéties de l\'AT',
          'Popularité éphémère contrastant avec la passion imminente'
        ],
        geographical_info: 'Trajet du mont des Oliviers à Jérusalem via Béthanie et Bethphagé. Descente vers la vallée du Cédron.',
        cultural_context: 'Acclamations messianiques avec rameaux de palmiers et vêtements sur le chemin. Hosanna = "Sauve maintenant".',
        key_figures: ['Jésus roi humble', 'Les disciples joyeux', 'La foule enthousiaste', 'Les pharisiens inquiets'],
        related_events: ['Onction à Béthanie', 'Purification du Temple', 'Enseignements de la semaine sainte'],
        educational_notes: 'Dernière offre publique du royaume à Israël. Contraste poignant avec la crucifixion cinq jours plus tard.'
      },
      {
        id: 'derniere_cene',
        title: 'Dernière Cène',
        year_bc: -30,
        description: 'Jésus institue la Cène et lave les pieds des disciples',
        book: 'Matthieu 26:17-30, Marc 14:12-26, Luc 22:7-23, Jean 13-17',
        available: false,
        summary: 'Institution de l\'Eucharistie et discours d\'adieux révélant l\'amour parfait de Jésus.',
        key_verses: [
          'Matthieu 26:26 - Prenez, mangez, ceci est mon corps',
          'Matthieu 26:28 - Ceci est mon sang, le sang de l\'alliance, qui est répandu pour plusieurs',
          'Jean 13:34 - Je vous donne un commandement nouveau: Aimez-vous les uns les autres'
        ],
        historical_context: 'Repas pascal dans une chambre haute à Jérusalem, jeudi soir avant la crucifixion.',
        spiritual_lessons: [
          'La Cène perpétue le mémorial de la mort du Christ',
          'Le service humble caractérise le vrai leadership',
          'L\'amour mutuel identifie les vrais disciples',
          'Jésus prépare ses disciples à son départ'
        ],
        geographical_info: 'Chambre haute à Jérusalem, probablement chez Marc. Lieu secret pour éviter l\'arrestation prématurée.',
        cultural_context: 'Repas pascal selon les traditions juives, transformé par Jésus en sacrement chrétien.',
        key_figures: ['Jésus servant', 'Les onze disciples fidèles', 'Judas le traître'],
        related_events: ['Lavement des pieds', 'Annonce de la trahison', 'Gethsémané'],
        educational_notes: 'Testament spirituel de Jésus. Institution de l\'Eucharistie, sacrement central du christianisme.'
      },
      {
        id: 'gethsemane',
        title: 'Agonie à Gethsémané',
        year_bc: -30,
        description: 'Jésus prie et agonise avant son arrestation',
        book: 'Matthieu 26:36-56, Marc 14:32-52, Luc 22:39-53',
        available: false,
        summary: 'Combat spirituel suprême où Jésus accepte pleinement la volonté du Père pour notre salut.',
        key_verses: [
          'Matthieu 26:39 - Mon Père, s\'il est possible, que cette coupe s\'éloigne de moi! Toutefois, non pas ce que je veux, mais ce que tu veux',
          'Luc 22:44 - Étant en agonie, il priait plus instamment, et sa sueur devint comme des grumeaux de sang',
          'Matthieu 26:41 - Veillez et priez, afin que vous ne tombiez pas dans la tentation'
        ],
        historical_context: 'Jardin de Gethsémané au pied du mont des Oliviers, lieu de retraite habituel de Jésus.',
        spiritual_lessons: [
          'L\'humanité de Jésus révélée dans l\'angoisse de la mort',
          'La prière soutient dans les épreuves les plus terribles',
          'L\'obéissance au Père prime sur les sentiments naturels',
          'L\'intercession angélique dans les moments critiques'
        ],
        geographical_info: 'Gethsémané ("pressoir à huile"), jardin d\'oliviers dans la vallée du Cédron.',
        cultural_context: 'Prière juive d\'abandon à Dieu. Sueur de sang (hématidrose) due au stress extrême.',
        key_figures: ['Jésus agonisant', 'Pierre, Jacques, Jean endormis', 'L\'ange consolateur', 'Judas et les soldats'],
        related_events: ['Dernière Cène', 'Arrestation', 'Fuite des disciples'],
        educational_notes: 'Moment le plus difficile de la vie terrestre de Jésus. Victoire de l\'obéissance sur la nature humaine.'
      },
      {
        id: 'crucifixion',
        title: 'Crucifixion',
        year_bc: -30,
        description: 'Jésus meurt sur la croix pour les péchés du monde',
        book: 'Matthieu 27:32-56, Marc 15:21-41, Luc 23:26-49, Jean 19:17-37',
        available: false,
        summary: 'Sacrifice expiatoire parfait : Jésus porte les péchés du monde et réconcilie l\'humanité avec Dieu.',
        key_verses: [
          'Jean 19:30 - Quand Jésus eut pris le vinaigre, il dit: Tout est accompli. Et, baissant la tête, il rendit l\'esprit',
          'Luc 23:34 - Père, pardonne-leur, car ils ne savent ce qu\'ils font',
          'Marc 15:34 - Mon Dieu, mon Dieu, pourquoi m\'as-tu abandonné?'
        ],
        historical_context: 'Crucifixion au Golgotha ("lieu du crâne") vendredi matin, veille de sabbat pascal.',
        spiritual_lessons: [
          'L\'amour divin révélé dans le don suprême du Fils',
          'Jésus porte le châtiment que nous méritions',
          'Le pardon divin offert même aux bourreaux',
          'La séparation du Père révèle l\'horreur du péché'
        ],
        geographical_info: 'Golgotha, colline rocheuse près de Jérusalem. Lieu d\'exécution publique des Romains.',
        cultural_context: 'Crucifixion, supplice romain le plus infamant. Exposition publique pour dissuader la rébellion.',
        key_figures: ['Jésus crucifié', 'Marie sa mère', 'Jean le disciple bien-aimé', 'Les deux brigands', 'Le centenier'],
        related_events: ['Portement de croix', 'Paroles de la croix', 'Mort et sépulture'],
        educational_notes: 'Centre de la foi chrétienne. La croix transforme la malédiction en bénédiction, la mort en vie.'
      },
      {
        id: 'resurrection',
        title: 'Résurrection',
        year_bc: -30,
        description: 'Jésus ressuscite le troisième jour, vainqueur de la mort',
        book: 'Matthieu 28:1-15, Marc 16:1-8, Luc 24:1-12, Jean 20:1-18',
        available: false,
        summary: 'Victoire décisive sur la mort, Satan et le péché. Validation divine de l\'œuvre expiatoire du Christ.',
        key_verses: [
          'Matthieu 28:6 - Il n\'est point ici; il est ressuscité, comme il l\'avait dit. Venez, voyez le lieu où il était couché',
          '1 Corinthiens 15:20 - Mais maintenant, Christ est ressuscité des morts, il est les prémices de ceux qui sont morts',
          'Jean 20:20 - Les disciples furent dans la joie en voyant le Seigneur'
        ],
        historical_context: 'Dimanche matin, troisième jour après la crucifixion. Tombeau gardé par des soldats romains.',
        spiritual_lessons: [
          'La résurrection prouve la divinité de Jésus',
          'Victoire définitive sur la mort et Satan',
          'Espérance de résurrection pour tous les croyants',
          'Validation divine du sacrifice expiatoire'
        ],
        geographical_info: 'Tombeau neuf de Joseph d\'Arimathée dans un jardin près du Golgotha.',
        cultural_context: 'Témoignage des femmes, juridiquement non recevable mais historiquement crédible.',
        key_figures: ['Jésus ressuscité', 'Marie de Magdala', 'Les autres femmes', 'Pierre et Jean', 'Les gardes terrifiés'],
        related_events: ['Tombeau vide', 'Apparitions', 'Course de Pierre et Jean', 'Rapport des gardes'],
        educational_notes: 'Fondement historique du christianisme. Sans résurrection, la foi chrétienne s\'effondre (1 Co 15:17).'
      },
      {
        id: 'quarante_jours',
        title: 'Les Quarante Jours après la Résurrection',
        year_bc: -30,
        description: 'Jésus apparaît à ses disciples pendant 40 jours avant l\'ascension',
        book: 'Luc 24:13-53, Jean 20:19-21:25, Actes 1:1-11, 1 Co 15:1-8',
        available: true,
        summary: 'Période de consolidation de la foi des disciples par les apparitions et enseignements du Ressuscité.',
        key_verses: [
          'Actes 1:3 - Après qu\'il eut souffert, il leur apparut vivant, et leur en donna plusieurs preuves',
          'Luc 24:27 - Et, commençant par Moïse et par tous les prophètes, il leur expliqua dans toutes les Écritures ce qui le concernait',
          'Jean 21:15 - Pais mes brebis'
        ],
        historical_context: 'Quarante jours entre Pâque et Ascension. Apparitions multiples confirmant la réalité de la résurrection.',
        spiritual_lessons: [
          'Jésus prend soin de restaurer la foi ébranlée',
          'Les Écritures s\'éclairent à la lumière de la résurrection',
          'Restauration personnelle (Pierre) et mission collective',
          'Préparation progressive à l\'Ascension et à la Pentecôte'
        ],
        geographical_info: 'Emmaus, Jérusalem, Galilée (lac de Tibériade), mont des Oliviers. Apparitions géographiquement diverses.',
        cultural_context: 'Scepticisme initial transformé en foi solide. Thomas représentant du doute sincère.',
        key_figures: ['Jésus ressuscité', 'Les disciples d\'Emmaus', 'Thomas l\'incrédule', 'Pierre restauré', 'Les onze apôtres'],
        related_events: ['Emmaus', 'Apparition aux Onze', 'Thomas', 'Pêche miraculeuse', 'Restauration de Pierre'],
        educational_notes: 'Consolidation nécessaire de la foi apostolique. Jésus forme ses témoins pour la mission mondiale.'
      },
      {
        id: 'ascension',
        title: 'Ascension',
        year_bc: -30,
        description: 'Jésus monte au ciel depuis le mont des Oliviers',
        book: 'Luc 24:50-53, Actes 1:9-11',
        available: true,
        summary: 'Retour glorieux de Jésus vers le Père, couronnement de son œuvre terrestre et promesse de son retour.',
        key_verses: [
          'Actes 1:9 - Après avoir dit cela, il fut élevé pendant qu\'ils le regardaient, et une nuée le déroba à leurs yeux',
          'Actes 1:11 - Ce même Jésus, qui a été enlevé au ciel du milieu de vous, viendra de la même manière',
          'Luc 24:52 - Pour eux, après l\'avoir adoré, ils retournèrent à Jérusalem avec une grande joie'
        ],
        historical_context: 'Quarantième jour après la résurrection, depuis le mont des Oliviers face à Jérusalem.',
        spiritual_lessons: [
          'Achèvement glorieux de l\'œuvre terrestre du Fils',
          'Session à la droite du Père comme Souverain Sacrificateur',
          'Promesse certaine du retour en gloire',
          'Joie des disciples malgré la séparation physique'
        ],
        geographical_info: 'Mont des Oliviers, à l\'est de Jérusalem. Lieu traditionnel de l\'attente messianique.',
        cultural_context: 'Ascension visible de Jésus confirmant sa divinité. Nuée évoquant la Shekinah divine.',
        key_figures: ['Jésus ascendant', 'Les onze apôtres témoins', 'Les deux anges messagers'],
        related_events: ['Dernières instructions', 'Promesse de l\'Esprit', 'Retour à Jérusalem', 'Attente de Pentecôte'],
        educational_notes: 'Fin de la présence physique de Jésus, début de la présence spirituelle universelle. Espoir du retour.'
      }
    ]
  },
  {
    id: 'neotestamentaire',
    title: 'Période Néotestamentaire',
    icon: '✝️',
    color: '#dc2626',
    description: 'Jésus-Christ et l\'Église primitive',
    period_range: '0 - 100 ap. J.-C.',
    start_year_bc: 0,
    end_year_bc: -100,
    period_summary: 'Accomplissement de toutes les promesses messianiques avec l\'incarnation, la vie, la mort et la résurrection de Jésus-Christ. Naissance de l\'Église, expansion de l\'Évangile dans l\'Empire romain par les apôtres. Rédaction du Nouveau Testament. Destruction de Jérusalem et fin de l\'économie de l\'Ancien Testament.',
    key_themes: [
      'Incarnation du Fils de Dieu et accomplissement messianique',
      'Nouvelle Alliance établie par le sang du Christ',
      'Naissance et expansion de l\'Église universelle',
      'Mission aux nations et inclusion des païens',
      'Révélation progressive de la doctrine chrétienne'
    ],
    historical_background: 'Pax Romana facilitant les voyages et communications. Diaspora juive préparant l\'évangélisation. Langues grecque et latine véhiculaires. Destruction du Temple en 70 ap. J.-C. marquant la transition définitive.',
    theological_significance: 'Point culminant de l\'histoire du salut. Accomplissement de toutes les prophéties messianiques. Ouverture du salut à toute l\'humanité. Fondation de l\'Église comme nouveau peuple de Dieu transcendant les frontières ethniques.',
    events: [
      {
        id: 'naissance_jesus',
        title: 'Naissance de Jésus',
        year_bc: 0,
        description: 'L\'incarnation du Fils de Dieu à Bethléhem',
        book: 'Matthieu 1-2, Luc 1-2',
        available: true,
        summary: 'Accomplissement des prophéties messianiques avec la naissance virginale du Sauveur.',
        key_verses: [
          'Luc 2:11 - Il vous est né aujourd\'hui, dans la ville de David, un Sauveur',
          'Matthieu 1:23 - On l\'appellera Emmanuel, ce qui signifie Dieu avec nous'
        ],
        historical_context: 'Recensement de Quirinius sous Auguste. Hérode le Grand règne sur la Judée. Attente messianique à son apogée.',
        spiritual_lessons: [
          'Dieu accomplit ses promesses au temps parfait',
          'L\'incarnation révèle l\'amour infini de Dieu',
          'Jésus unit la divinité et l\'humanité',
          'Le salut vient par l\'humilité, non la grandeur humaine'
        ],
        geographical_info: 'Bethléhem de Judée, ville de David. Annonciation à Nazareth en Galilée.',
        cultural_context: 'Société sous occupation romaine. Espoir messianique intense parmi les Juifs pieux.',
        key_figures: ['Jésus', 'Marie', 'Joseph', 'Élisabeth', 'Jean-Baptiste', 'Les mages'],
        related_events: ['Annonciation', 'Visitation', 'Massacre des innocents', 'Présentation au Temple'],
        educational_notes: 'Centre de toute l\'histoire humaine. L\'incarnation change tout : Dieu devient homme pour sauver l\'humanité.'
      },
      {
        id: 'ministere_jesus',
        title: 'Ministère public de Jésus',
        year_bc: -30,
        description: 'Trois ans de prédication, miracles et enseignements du Messie',
        book: 'Évangiles',
        available: true,
        summary: 'Révélation progressive de Jésus comme Messie, Fils de Dieu et Sauveur du monde.',
        key_verses: [
          'Marc 1:15 - Le temps est accompli, et le royaume de Dieu est proche',
          'Jean 3:16 - Dieu a tant aimé le monde qu\'il a donné son Fils unique'
        ],
        historical_context: 'Ministère principalement en Galilée et Judée. Opposition croissante des autorités religieuses.',
        spiritual_lessons: [
          'Jésus révèle parfaitement le caractère de Dieu',
          'Le royaume de Dieu transcende les attentes humaines',
          'L\'amour et la vérité s\'incarnent en Jésus',
          'Le Messie vient servir, non être servi'
        ],
        geographical_info: 'Galilée (Capharnaüm, lac de Tibériade), Judée (Jérusalem, Béthanie), Samarie (puits de Jacob).',
        cultural_context: 'Tension entre Jésus et le système religieux établi. Formation des disciples.',
        key_figures: ['Jésus', 'Les Douze apôtres', 'Les pharisiens', 'Les sadducéens', 'Jean-Baptiste'],
        related_events: ['Baptême de Jésus', 'Sermon sur la montagne', 'Transfiguration', 'Entrée triomphale'],
        educational_notes: 'Révélation définitive de Dieu en Jésus-Christ. Modèle parfait de vie et d\'enseignement divin.'
      },
      {
        id: 'crucifixion_resurrection',
        title: 'Crucifixion et Résurrection',
        year_bc: -33,
        description: 'Mort expiatoire et résurrection victorieuse de Jésus-Christ',
        book: 'Évangiles',
        available: true,
        summary: 'Accomplissement de l\'œuvre rédemptrice : Jésus meurt pour les péchés et ressuscite pour la justification.',
        key_verses: [
          'Jean 19:30 - Tout est accompli',
          '1 Corinthiens 15:20 - Christ est ressuscité des morts, il est les prémices de ceux qui sont morts'
        ],
        historical_context: 'Crucifixion sous Ponce Pilate pendant la Pâque. Résurrection le troisième jour confirmée par de nombreux témoins.',
        spiritual_lessons: [
          'La croix révèle l\'amour et la justice de Dieu',
          'La résurrection prouve la divinité de Jésus',
          'Le salut est accompli une fois pour toutes',
          'La mort n\'a plus le dernier mot'
        ],
        geographical_info: 'Golgotha (lieu du crâne) près de Jérusalem. Tombeau de Joseph d\'Arimathée.',
        cultural_context: 'Scandale de la crucifixion pour Juifs et Grecs. Transformation des disciples par la résurrection.',
        key_figures: ['Jésus', 'Pilate', 'Joseph d\'Arimathée', 'Marie de Magdala', 'Les apôtres'],
        related_events: ['Dernière Cène', 'Gethsémané', 'Procès', 'Apparitions', 'Ascension'],
        educational_notes: 'Cœur de l\'Évangile. La croix et la résurrection changent le cours de l\'histoire humaine et cosmique.'
      },
      {
        id: 'pentecote',
        title: 'Pentecôte et naissance de l\'Église',
        year_bc: -33,
        description: 'Effusion du Saint-Esprit et début de l\'Église',
        book: 'Actes 2',
        available: true,
        summary: 'Accomplissement de la promesse de Jésus : le Saint-Esprit descendu pour équiper l\'Église naissante.',
        key_verses: [
          'Actes 2:4 - Ils furent tous remplis du Saint-Esprit',
          'Actes 2:41 - En ce jour-là, le nombre des disciples s\'augmenta d\'environ trois mille âmes'
        ],
        historical_context: 'Fête juive de Pentecôte, Juifs de la diaspora présents à Jérusalem. Miracle des langues.',
        spiritual_lessons: [
          'Le Saint-Esprit équipe l\'Église pour la mission',
          'L\'Évangile transcende les barrières linguistiques',
          'La puissance divine transforme les disciples craintifs',
          'L\'Église naît dans l\'unité et la diversité'
        ],
        geographical_info: 'Jérusalem, chambre haute. Expansion immédiate dans toute la ville.',
        cultural_context: 'Première prédication chrétienne publique. Communauté primitive partageant tous ses biens.',
        key_figures: ['Pierre', 'Les Douze', 'Les 120 disciples', 'Les nouveaux convertis'],
        related_events: ['Ascension de Jésus', 'Élection de Matthias', 'Premières persécutions'],
        educational_notes: 'Naissance officielle de l\'Église. Le Saint-Esprit inaugure la nouvelle dispensation de grâce.'
      }
    ]
  },
  {
    id: 'periode_grecque',
    title: 'Période Grecque',
    icon: '🏛️',
    color: '#3b82f6',
    description: 'Domination hellénistique',
    period_range: '333-63 av. J.-C.',
    start_year_bc: 333,
    end_year_bc: 63,
    events: [
      {
        id: 'alexandre_conquete',
        title: 'Conquête d\'Alexandre',
        description: 'Alexandre le Grand conquiert l\'Orient.',
        book: 'Daniel 8',
        year_bc: 333,
        available: false,
        summary: 'Début de l\'influence grecque sur le monde juif.',
        key_verses: ['Daniel 8:21 - Le bouc, c\'est le roi de Javan.']
      },
      {
        id: 'antiochus_persecution',
        title: 'Persécution d\'Antiochus IV',
        description: 'Antiochus Épiphane profane le Temple et persécute les Juifs.',
        book: '1 Maccabées 1',
        year_bc: 167,
        available: false,
        summary: 'Tentative d\'hellénisation forcée et profanation du Temple.',
        key_verses: ['1 Maccabées 1:54 - Ils élevèrent sur l\'autel l\'abomination de la désolation.']
      },
      {
        id: 'revolte_maccabees',
        title: 'Révolte des Maccabées',
        description: 'Judas Maccabée libère Jérusalem et purifie le Temple.',
        book: '1 Maccabées 4',
        year_bc: 164,
        available: false,
        summary: 'Restauration de l\'indépendance juive et purification du Temple.',
        key_verses: ['1 Maccabées 4:52 - Ils offrirent des sacrifices selon la loi sur le nouvel autel.']
      }
    ]
  },
  {
    id: 'periode_romaine',
    title: 'Période Romaine',
    icon: '🏛️',
    color: '#7c2d12',
    description: 'Domination romaine et venue du Messie',
    period_range: '63 av. J.-C. - 70 ap. J.-C.',
    start_year_bc: 63,
    end_year_ad: 70,
    events: [
      {
        id: 'pompee_jerusalem',
        title: 'Pompée prend Jérusalem',
        description: 'Rome établit sa domination sur la Palestine.',
        book: 'Histoire',
        year_bc: 63,
        available: false,
        summary: 'Début de la domination romaine sur la Judée.',
        key_verses: ['Daniel 2:40 - Il y aura un quatrième royaume, fort comme le fer.']
      },
      {
        id: 'herode_roi',
        title: 'Hérode le Grand',
        description: 'Hérode règne sur la Judée sous autorité romaine.',
        book: 'Matthieu 2',
        year_bc: 37,
        available: false,
        summary: 'Règne d\'Hérode et reconstruction du Temple.',
        key_verses: ['Matthieu 2:1 - Jésus étant né à Bethléhem de Judée, au temps du roi Hérode.']
      },
      {
        id: 'naissance_jesus',
        title: 'Naissance de Jésus',
        description: 'Le Verbe a été fait chair, et il a habité parmi nous.',
        book: 'Matthieu 1-2, Luc 1-2',
        year_bc: 4,
        available: false,
        summary: 'Incarnation du Fils de Dieu, accomplissement des prophéties messianiques.',
        key_verses: ['Jean 1:14 - Et la parole a été faite chair, et elle a habité parmi nous.']
      },
      {
        id: 'ministere_jesus',
        title: 'Ministère de Jésus',
        description: 'Jésus prêche, enseigne et accomplit des miracles.',
        book: 'Matthieu, Marc, Luc, Jean',
        year_ad: 30,
        available: false,
        summary: 'Ministère public de Jésus : prédication du royaume des cieux.',
        key_verses: ['Marc 1:15 - Le temps est accompli, et le royaume de Dieu est proche.']
      },
      {
        id: 'crucifixion_resurrection',
        title: 'Crucifixion et Résurrection',
        description: 'Christ est mort pour nos péchés et est ressuscité.',
        book: 'Matthieu 27-28',
        year_ad: 33,
        available: false,
        summary: 'Sacrifice expiatoire et victoire sur la mort.',
        key_verses: ['1 Corinthiens 15:3-4 - Christ est mort pour nos péchés et il est ressuscité.']
      },
      {
        id: 'pentecote',
        title: 'La Pentecôte',
        description: 'Le Saint-Esprit descend sur les apôtres.',
        book: 'Actes 2',
        year_ad: 33,
        available: false,
        summary: 'Naissance de l\'Église chrétienne par l\'effusion du Saint-Esprit.',
        key_verses: ['Actes 2:4 - Ils furent tous remplis du Saint-Esprit.']
      },
      {
        id: 'destruction_temple',
        title: 'Destruction du Temple',
        description: 'Titus détruit Jérusalem et le second Temple.',
        book: 'Luc 21',
        year_ad: 70,
        available: false,
        summary: 'Fin du judaïsme du second Temple, accomplissement des prophéties de Jésus.',
        key_verses: ['Luc 21:6 - Il ne restera pas pierre sur pierre qui ne soit renversée.']
      }
    ]
  }
];

export class CompleteTimelineService {
  static getCompleteTimelineData(): CompleteTimelineData {
    return {
      timeline: {
        title: 'Frise Chronologique Biblique Complète',
        description: 'De la Création à la destruction du Temple (70 ap. J.-C.)',
        periods: COMPLETE_TIMELINE_DATA
      },
      educational_goals: [
        'Comprendre la chronologie des événements bibliques majeurs',
        'Situer les personnages et événements dans leur contexte historique',
        'Voir l\'unité du plan de Dieu à travers l\'histoire',
        'Apprécier l\'accomplissement des promesses divines',
        'Développer une vision d\'ensemble de l\'histoire biblique'
      ]
    };
  }

  static getPeriodById(periodId: string): HistoricalPeriod | undefined {
    return COMPLETE_TIMELINE_DATA.find((period: HistoricalPeriod) => period.id === periodId);
  }

  static getEventById(eventId: string): HistoricalEvent | undefined {
    for (const period of COMPLETE_TIMELINE_DATA) {
      const event = period.events.find((e: HistoricalEvent) => e.id === eventId);
      if (event) return event;
    }
    return undefined;
  }

  static getAllAvailableEvents(): HistoricalEvent[] {
    return COMPLETE_TIMELINE_DATA.flatMap((period: HistoricalPeriod) => 
      period.events.filter((event: HistoricalEvent) => event.available)
    );
  }

  static getEventsByPeriod(periodId: string): HistoricalEvent[] {
    const period = this.getPeriodById(periodId);
    return period ? period.events : [];
  }
}

