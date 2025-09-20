import Phaser from 'phaser';
import { CardContainer } from '../types';

export default class OrderEventsScene extends Phaser.Scene {
  private slots!: Phaser.GameObjects.Zone[];
  private cards!: CardContainer[];
  private correctOrder = ['1', '2', '3', '4'];
  private gameComplete = false;
  private lessonData: any = null;
  private validateButton: Phaser.GameObjects.Container | null = null;
  private cardCount = 4;
  private storySteps = [
    'Dieu parle à Jonas',
    'Jonas fuit en bateau',
    'Dans le ventre du poisson', 
    'Jonas obéit et prêche'
  ];
  
  // Versions courtes pour les cartes
  private shortStorySteps = [
    'Dieu parle\nà Jonas',
    'Jonas fuit\nen bateau',
    'Dans le ventre\ndu poisson', 
    'Jonas obéit\net prêche'
  ];

  constructor() {
    super('OrderEvents');
  }


  public setLessonData(data: any) {
    this.lessonData = data;
    console.log('📚 SetLessonData appelé avec:', data?.id || 'pas de data');
    console.log('📚 Données complètes:', data);
    
    // Adapter les étapes selon la leçon
    if (data && data.id) {
      switch (data.id) {
        case 'jonas_01':
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche'
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche'
          ];
          break;
        case 'jonas_02_fuite':
          this.storySteps = [
            'Dieu donne la mission',
            'Jonas refuse et fuit',
            'Tempête sur la mer',
            'Jonas jeté à la mer'
          ];
          this.shortStorySteps = [
            'Dieu donne\nla mission',
            'Jonas refuse\net fuit',
            'Tempête\nsur la mer',
            'Jonas jeté\nà la mer'
          ];
          break;
        case 'jonas_03_ninive':
          this.storySteps = [
            'Jonas prêche à Ninive',
            'Les habitants se repentent',
            'Le roi ordonne le jeûne',
            'Dieu pardonne la ville'
          ];
          this.shortStorySteps = [
            'Jonas prêche\nà Ninive',
            'Les habitants\nse repentent',
            'Le roi ordonne\nle jeûne',
            'Dieu pardonne\nla ville'
          ];
          break;
        case 'jonas_04_ricin':
          this.storySteps = [
            'Jonas attend dehors',
            'Dieu fait pousser le ricin',
            'Un ver détruit le ricin',
            'Leçon de miséricorde'
          ];
          this.shortStorySteps = [
            'Jonas attend\ndehors',
            'Dieu fait pousser\nle ricin',
            'Un ver détruit\nle ricin',
            'Leçon de\nmiséricorde'
          ];
          break;
        case 'daniel_01':
          this.storySteps = [
            'Daniel prie fidèlement',
            'Les jaloux le dénoncent',
            'Daniel jeté aux lions',
            'Dieu ferme leur gueule'
          ];
          this.shortStorySteps = [
            'Daniel prie\nfidèlement',
            'Les jaloux\nle dénoncent',
            'Daniel jeté\naux lions',
            'Dieu ferme\nleur gueule'
          ];
          break;
        case 'david_01':
          this.storySteps = [
            'Goliath défie Israël',
            'David se porte volontaire',
            'David lance sa pierre',
            'Goliath tombe, victoire !'
          ];
          this.shortStorySteps = [
            'Goliath défie\nIsraël',
            'David se porte\nvolontaire',
            'David lance\nsa pierre',
            'Goliath tombe\nvictoire !'
          ];
          break;
        case 'creation_01':
          this.storySteps = [
            'Dieu sépare lumière et ténèbres',
            'Dieu créa la terre et les mers',
            'Dieu créa les plantes et animaux',
            'Dieu créa l\'homme et la femme'
          ];
          this.shortStorySteps = [
            'Dieu sépare\nlumière/ténèbres',
            'Dieu créa terre\net mers',
            'Dieu créa plantes\net animaux',
            'Dieu créa homme\net femme'
          ];
          break;
        case 'moise_01':
          this.storySteps = [
            'Le peuple d\'Israël est esclave en Égypte',
            'Moïse reçoit la mission de Dieu',
            'Les dix plaies d\'Égypte',
            'La traversée de la mer Rouge'
          ];
          this.shortStorySteps = [
            'Le peuple d\'Israël\nest esclave en Égypte',
            'Moïse reçoit\nla mission de Dieu',
            'Les dix plaies\nd\'Égypte',
            'La traversée\nde la mer Rouge'
          ];
          break;
        case 'noe_01':
          this.storySteps = [
            'Dieu voit le mal sur la terre',
            'Noé construit l\'arche',
            'Le déluge recouvre la terre',
            'L\'alliance et l\'arc-en-ciel'
          ];
          this.shortStorySteps = [
            'Dieu voit le mal\nsur la terre',
            'Noé construit\nl\'arche',
            'Le déluge recouvre\nla terre',
            'L\'alliance et\nl\'arc-en-ciel'
          ];
          break;
        case 'babel_01':
          this.storySteps = [
            'Tous parlent la même langue',
            'Ils décident de construire une tour',
            'Dieu confond leur langage',
            'Ils se dispersent sur la terre'
          ];
          this.shortStorySteps = [
            'Tous parlent\nla même langue',
            'Ils décident de\nconstruire une tour',
            'Dieu confond\nleur langage',
            'Ils se dispersent\nsur la terre'
          ];
          break;
        case 'abraham_01':
          this.storySteps = [
            'Dieu appelle Abram',
            'Abram quitte son pays',
            'Dieu promet une grande nation',
            'Abraham reçoit Isaac'
          ];
          this.shortStorySteps = [
            'Dieu appelle\nAbram',
            'Abram quitte\nson pays',
            'Dieu promet\nune grande nation',
            'Abraham reçoit\nIsaac'
          ];
          break;
        case 'isaac_01':
          this.storySteps = [
            'Abraham envoie son serviteur',
            'Le serviteur va en Mésopotamie',
            'Rebecca puise de l\'eau au puits',
            'Isaac et Rebecca se marient'
          ];
          this.shortStorySteps = [
            'Abraham envoie\nson serviteur',
            'Le serviteur va\nen Mésopotamie',
            'Rebecca puise\nde l\'eau au puits',
            'Isaac et Rebecca\nse marient'
          ];
          break;
        case 'jacob_01':
          this.storySteps = [
            'Naissance des jumeaux Jacob et Ésaü',
            'Ésaü vend son droit d\'aînesse',
            'Jacob reçoit la bénédiction d\'Isaac',
            'Jacob et Ésaü se réconcilient'
          ];
          this.shortStorySteps = [
            'Naissance des\njumeaux Jacob et Ésaü',
            'Ésaü vend son\ndroit d\'aînesse',
            'Jacob reçoit la\nbénédiction d\'Isaac',
            'Jacob et Ésaü\nse réconcilient'
          ];
          break;
        case 'joseph_01':
          this.storySteps = [
            'Joseph est aimé de son père',
            'Ses frères le vendent en Égypte',
            'Joseph interprète les rêves du pharaon',
            'Joseph pardonne à ses frères'
          ];
          this.shortStorySteps = [
            'Joseph est aimé\nde son père',
            'Ses frères le\nvendent en Égypte',
            'Joseph interprète\nles rêves du pharaon',
            'Joseph pardonne\nà ses frères'
          ];
          break;
        case 'commandements_01':
          this.storySteps = [
            'Moïse monte sur le mont Sinaï',
            'Dieu parle au milieu du tonnerre et du feu',
            'Dieu donne les dix commandements',
            'Les commandements sont gravés sur des tables de pierre'
          ];
          this.shortStorySteps = [
            'Moïse monte sur\nle mont Sinaï',
            'Dieu parle au milieu\ndu tonnerre et du feu',
            'Dieu donne les\ndix commandements',
            'Les commandements\nsont gravés sur des\ntables de pierre'
          ];
          break;
        case 'gedeon_01':
          this.storySteps = [
            'Les Madianites oppriment Israël',
            'Dieu choisit Gédéon pour délivrer le peuple',
            'Dieu demande à Gédéon de garder seulement 300 hommes',
            'Gédéon et ses hommes attaquent avec des trompettes et des torches'
          ];
          this.shortStorySteps = [
            'Les Madianites\noppriment Israël',
            'Dieu choisit Gédéon\npour délivrer le peuple',
            'Dieu demande à Gédéon\nde garder seulement\n300 hommes',
            'Gédéon et ses hommes\nattaquent avec des\ntrompettes et des torches'
          ];
          break;
        case 'josue_01':
          this.storySteps = [
            'Josué reçoit ses instructions',
            'Six jours de marche silencieuse',
            'Septième jour : sept tours',
            'Cris et chute des murailles'
          ];
          this.shortStorySteps = [
            'Josué reçoit\nses instructions',
            'Six jours\nde marche',
            'Septième jour\nsept tours',
            'Cris et chute\ndes murailles'
          ];
          break;
        case 'adam_eve_01':
          this.storySteps = [
            'Dieu place Adam et Ève en Éden',
            'Le serpent tente Ève',
            'Ève et Adam mangent le fruit',
            'Dieu les confronte et les chasse'
          ];
          this.shortStorySteps = [
            'Dieu place Adam\net Ève en Éden',
            'Le serpent\ntente Ève',
            'Ève et Adam\nmangent le fruit',
            'Dieu les confronte\net les chasse'
          ];
          console.log('🍎 Étapes Adam et Ève définies:', this.storySteps);
          break;
        case 'moise_buisson_01':
          this.storySteps = [
            'Moïse garde les troupeaux dans le désert',
            'Il voit un buisson en feu qui ne se consume pas',
            'Dieu l\'appelle et lui dit d\'ôter ses sandales',
            'Dieu se révèle comme JE SUIS et envoie Moïse en Égypte'
          ];
          this.shortStorySteps = [
            'Moïse garde les\ntroupeaux dans le désert',
            'Il voit un buisson\nen feu qui ne se\nconsume pas',
            'Dieu l\'appelle et lui\ndit d\'ôter ses sandales',
            'Dieu se révèle comme\nJE SUIS et envoie\nMoïse en Égypte'
          ];
          console.log('🔥 Étapes Moïse et le buisson ardent définies:', this.storySteps);
          break;
        case 'plaies_egypte_01':
          this.storySteps = [
            'Moïse et Aaron demandent à Pharaon de libérer Israël',
            'Pharaon refuse et Dieu envoie les premières plaies',
            'Les plaies s\'intensifient : grêle, sauterelles, ténèbres',
            'La mort des premiers-nés brise enfin Pharaon'
          ];
          this.shortStorySteps = [
            'Moïse et Aaron\ndemandent à Pharaon\nde libérer Israël',
            'Pharaon refuse et Dieu\nenvoie les premières\nplaies',
            'Les plaies s\'intensifient :\ngrêle, sauterelles,\nténèbres',
            'La mort des premiers-nés\nbrise enfin Pharaon'
          ];
          console.log('🐸 Étapes Les dix plaies d\'Égypte définies:', this.storySteps);
          break;
        case 'mer_rouge_01':
          this.storySteps = [
            'Les Israélites sont poursuivis par l\'armée de Pharaon',
            'Le peuple a peur mais Moïse dit : "Ne craignez rien"',
            'Moïse étend sa main et Dieu sépare les eaux de la mer',
            'Les Israélites traversent à pied sec, les Égyptiens sont engloutis'
          ];
          this.shortStorySteps = [
            'Les Israélites sont\npoursuivis par l\'armée\nde Pharaon',
            'Le peuple a peur mais\nMoïse dit : "Ne\ncraignez rien"',
            'Moïse étend sa main et\nDieu sépare les eaux\nde la mer',
            'Les Israélites traversent\nà pied sec, les Égyptiens\nsont engloutis'
          ];
          console.log('🌊 Étapes La traversée de la mer Rouge définies:', this.storySteps);
          break;
        case 'samson_01':
          this.storySteps = [
            'Samson est choisi par Dieu pour délivrer Israël des Philistins',
            'Il fait de grands exploits grâce à sa force divine',
            'Il tombe amoureux de Dalila qui découvre son secret',
            'Ses cheveux sont coupés, il perd sa force et meurt en héros'
          ];
          this.shortStorySteps = [
            'Samson est choisi par Dieu\npour délivrer Israël\ndes Philistins',
            'Il fait de grands exploits\ngrâce à sa force divine',
            'Il tombe amoureux de Dalila\nqui découvre son secret',
            'Ses cheveux sont coupés, il\nperd sa force et meurt\nen héros'
          ];
          console.log('💪 Étapes Samson et Dalila définies:', this.storySteps);
          break;
        case 'salomon_01':
          this.storySteps = [
            'Salomon demande la sagesse à Dieu pour gouverner le peuple',
            'Dieu exauce sa prière et lui donne une sagesse reconnue dans le monde',
            'Salomon fait construire un magnifique Temple à Jérusalem',
            'L\'arche de l\'alliance est placée dans le Temple et la gloire de Dieu le remplit'
          ];
          this.shortStorySteps = [
            'Salomon demande la sagesse\nà Dieu pour gouverner\nle peuple',
            'Dieu exauce sa prière et\nlui donne une sagesse\nreconnue dans le monde',
            'Salomon fait construire un\nmagnifique Temple\nà Jérusalem',
            'L\'arche de l\'alliance est\nplacée dans le Temple et\nla gloire de Dieu le remplit'
          ];
          console.log('👑 Étapes Salomon et le Temple définies:', this.storySteps);
          break;
        case 'elie_01':
          this.storySteps = [
            'Élie rassemble le peuple sur le mont Carmel pour un défi',
            'Les prophètes de Baal crient et dansent toute la journée sans résultat',
            'Élie arrose le bois d\'eau et prie Dieu',
            'Le feu du ciel tombe et consume le sacrifice, et le peuple reconnaît Dieu'
          ];
          this.shortStorySteps = [
            'Élie rassemble le peuple\nsur le mont Carmel\npour un défi',
            'Les prophètes de Baal crient\net dansent toute la journée\nsans résultat',
            'Élie arrose le bois d\'eau\net prie Dieu',
            'Le feu du ciel tombe et\nconsume le sacrifice, et le\npeuple reconnaît Dieu'
          ];
          console.log('🔥 Étapes Élie et les prophètes de Baal définies:', this.storySteps);
          break;
        case 'ezechiel_01':
          this.storySteps = [
            'Dieu transporte Ézéchiel dans une vallée d\'ossements desséchés',
            'Dieu demande à Ézéchiel si ces os peuvent revivre',
            'Ézéchiel prophétise et les os se rapprochent, la chair et la peau se forment',
            'L\'esprit de Dieu entre en eux et ils deviennent une armée vivante'
          ];
          this.shortStorySteps = [
            'Dieu transporte Ézéchiel\ndans une vallée\nd\'ossements desséchés',
            'Dieu demande à Ézéchiel\nsi ces os peuvent\nrevivre',
            'Ézéchiel prophétise et les os\nse rapprochent, la chair\net la peau se forment',
            'L\'esprit de Dieu entre en eux\net ils deviennent une\narmée vivante'
          ];
          console.log('💨 Étapes Ézéchiel et les ossements desséchés définies:', this.storySteps);
          break;
        case 'naissance_jesus':
          this.storySteps = [
            'L\'ange Gabriel annonce à Marie qu\'elle aura un enfant par l\'Esprit Saint',
            'Marie accepte la volonté de Dieu avec foi',
            'Joseph prend Marie chez lui après que l\'ange lui soit apparu en rêve',
            'Marie et Joseph vont à Bethléhem pour le recensement de César',
            'Jésus naît dans une étable faute de place à l\'auberge',
            'Des bergers reçoivent l\'annonce de la naissance par un ange',
            'Une étoile guide des mages d\'Orient vers Jésus'
          ];
          this.shortStorySteps = [
            'L\'ange Gabriel annonce\nà Marie qu\'elle aura\nun enfant par l\'Esprit Saint',
            'Marie accepte la volonté\nde Dieu avec foi',
            'Joseph prend Marie chez lui\naprès que l\'ange lui soit\napparu en rêve',
            'Marie et Joseph vont\nà Bethléhem pour le\nrecensement de César',
            'Jésus naît dans une étable\nfaute de place à\nl\'auberge',
            'Des bergers reçoivent\nl\'annonce de la naissance\npar un ange',
            'Une étoile guide des mages\nd\'Orient vers Jésus'
          ];
          console.log('👶 Étapes Naissance de Jésus définies:', this.storySteps);
          break;

        case 'enfance_jesus':
          this.storySteps = [
            'Marie et Joseph vont à Jérusalem pour la fête de la Pâque avec Jésus',
            'Après la fête, ils repartent mais Jésus reste à Jérusalem',
            'Ils pensent qu\'il est avec d\'autres voyageurs et font une journée de chemin',
            'Ils le cherchent parmi leurs parents et connaissances sans le trouver',
            'Ils retournent à Jérusalem pour le chercher',
            'Au bout de trois jours, ils le trouvent dans le temple',
            'Jésus écoute les docteurs et pose des questions, étonnant tous par son intelligence',
            'Jésus répond qu\'il faut qu\'il s\'occupe des affaires de son Père'
          ];
          this.shortStorySteps = [
            'Marie et Joseph vont\nà Jérusalem pour la fête\nde la Pâque avec Jésus',
            'Après la fête, ils repartent\nmais Jésus reste\nà Jérusalem',
            'Ils pensent qu\'il est avec\nd\'autres voyageurs et font\nune journée de chemin',
            'Ils le cherchent parmi leurs\nparents et connaissances\nsans le trouver',
            'Ils retournent à Jérusalem\npour le chercher',
            'Au bout de trois jours,\nils le trouvent dans\nle temple',
            'Jésus écoute les docteurs\net pose des questions,\nétonnant tous par son intelligence',
            'Jésus répond qu\'il faut\nqu\'il s\'occupe des affaires\nde son Père'
          ];
          console.log('🧒 Étapes L\'enfance de Jésus définies:', this.storySteps);
          break;

        case 'bapteme_jesus':
          this.storySteps = [
            'Jean-Baptiste prêche dans le désert, appelant à la repentance',
            'Jésus vient de Galilée pour être baptisé par Jean',
            'Jean hésite, disant qu\'il a besoin d\'être baptisé par Jésus',
            'Jésus insiste, expliquant que c\'est nécessaire pour accomplir toute la justice',
            'Jésus est baptisé par Jean dans l\'eau',
            'Lorsque Jésus sort de l\'eau, les cieux s\'ouvrent',
            'L\'Esprit de Dieu descend sur lui comme une colombe',
            'Une voix du ciel dit : « Celui-ci est mon Fils bien-aimé »'
          ];
          this.shortStorySteps = [
            'Jean-Baptiste prêche\ndans le désert, appelant\nà la repentance',
            'Jésus vient de Galilée\npour être baptisé\npar Jean',
            'Jean hésite, disant qu\'il a\nbesoin d\'être baptisé\npar Jésus',
            'Jésus insiste, expliquant\nque c\'est nécessaire pour\naccomplir toute la justice',
            'Jésus est baptisé par Jean\ndans l\'eau',
            'Lorsque Jésus sort de l\'eau,\nles cieux s\'ouvrent',
            'L\'Esprit de Dieu descend\nsur lui comme une colombe',
            'Une voix du ciel dit :\n« Celui-ci est mon Fils bien-aimé »'
          ];
          console.log('💦 Étapes Le baptême de Jésus définies:', this.storySteps);
          break;

        case 'tentations_jesus':
          this.storySteps = [
            'Après son baptême, Jésus est conduit par l\'Esprit dans le désert',
            'Jésus jeûne quarante jours et quarante nuits, après quoi il a faim',
            'Le diable s\'approche et lui dit : « Si tu es Fils de Dieu, ordonne que ces pierres deviennent des pains »',
            'Jésus répond : « L\'homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu »',
            'Le diable transporte Jésus sur le haut du temple et le tente de se jeter en bas',
            'Jésus répond : « Tu ne tenteras point le Seigneur, ton Dieu »',
            'Le diable montre à Jésus tous les royaumes du monde et leur gloire',
            'Jésus répond : « Retire-toi, Satan ! Tu adoreras le Seigneur, ton Dieu, et tu le serviras lui seul »',
            'Le diable laisse Jésus, et des anges viennent le servir'
          ];
          this.shortStorySteps = [
            'Après son baptême, Jésus est\nconduit par l\'Esprit\ndans le désert',
            'Jésus jeûne quarante jours\net quarante nuits,\naprès quoi il a faim',
            'Le diable s\'approche et lui dit :\n« Si tu es Fils de Dieu,\nordonne que ces pierres deviennent des pains »',
            'Jésus répond : « L\'homme ne vivra pas\nde pain seulement, mais de toute\nparole qui sort de la bouche de Dieu »',
            'Le diable transporte Jésus\nsur le haut du temple\net le tente de se jeter en bas',
            'Jésus répond : « Tu ne tenteras point\nle Seigneur, ton Dieu »',
            'Le diable montre à Jésus\ntous les royaumes du monde\net leur gloire',
            'Jésus répond : « Retire-toi, Satan !\nTu adoreras le Seigneur, ton Dieu,\net tu le serviras lui seul »',
            'Le diable laisse Jésus,\net des anges viennent le servir'
          ];
          console.log('😈 Étapes Les tentations de Jésus définies:', this.storySteps);
          break;
        default:
          // Utiliser les étapes Jonas par défaut
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche'
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche'
          ];
          break;
      }
      
      // Mettre à jour les cartes si elles existent déjà
      if (this.cards && this.cards.length > 0) {
        this.updateCardsAfterLessonDataChange();
      }
    }
  }

  private updateCardsAfterLessonDataChange() {
    // Mettre à jour le texte de chaque carte selon les nouvelles données
    this.cards.forEach((card, index) => {
      const frontNumber = (card as any).frontNumber;
      if (frontNumber && this.shortStorySteps[index]) {
        frontNumber.setText(this.shortStorySteps[index]);
      }
    });
  }

  preload() {
    // Créer des textures colorées au lieu de charger des images
    this.createColorTextures();
  }

  private createColorTextures() {
    const graphics = this.add.graphics();
    const { width } = this.scale;
    
    // Calculer les tailles responsive
    const isMobile = width < 500;
    const isTablet = width >= 500 && width < 800;
    const cardWidth = isMobile ? 80 : isTablet ? 100 : 120;
    const cardHeight = isMobile ? 100 : isTablet ? 130 : 160;
    
    // Créer 6 cartes avec des gradients modernes (pour tous les niveaux de difficulté)
    const gradientColors = [
      { from: 0x3B82F6, to: 0x1D4ED8 }, // Bleu gradient
      { from: 0x10B981, to: 0x047857 }, // Vert gradient
      { from: 0xF59E0B, to: 0xD97706 }, // Orange gradient
      { from: 0xEF4444, to: 0xDC2626 }, // Rouge gradient
      { from: 0x8B5CF6, to: 0x7C3AED }, // Violet gradient
      { from: 0x06B6D4, to: 0x0891B2 }  // Cyan gradient
    ];
    
    for (let i = 1; i <= 6; i++) {
      graphics.clear();
      
      // Créer un gradient radial pour un effet moderne
      const color = gradientColors[i - 1];
      graphics.fillGradientStyle(color.from, color.from, color.to, color.to, 1, 1, 0.5, 0.5);
      graphics.fillRoundedRect(0, 0, cardWidth, cardHeight, 15);
      
      // Ajouter une bordure blanche avec ombre
      graphics.lineStyle(4, 0xffffff, 1);
      graphics.strokeRoundedRect(0, 0, cardWidth, cardHeight, 15);
      
      // Ajouter une ombre portée
      graphics.fillStyle(0x000000, 0.2);
      graphics.fillRoundedRect(2, 2, cardWidth, cardHeight, 15);
      
      graphics.generateTexture(`card${i}`, cardWidth, cardHeight);
    }
    
    // Créer texture de background avec gradient subtil
    graphics.clear();
    graphics.fillGradientStyle(0xf8fafc, 0xf8fafc, 0xe2e8f0, 0xe2e8f0, 1, 1, 0, 0);
    graphics.fillRect(0, 0, 800, 600);
    graphics.generateTexture('bg', 800, 600);
    
    graphics.destroy();
  }

  create() {
    const { width, height } = this.scale;
    
    // Calculer les tailles responsive
    const isMobile = width < 500;
    const isTablet = width >= 500 && width < 800;
    
    // Tailles adaptatives
    const titleFontSize = isMobile ? '20px' : isTablet ? '24px' : '28px';
    const cardWidth = isMobile ? 80 : isTablet ? 100 : 120;
    const cardHeight = isMobile ? 100 : isTablet ? 130 : 160;
    const cardFontSize = isMobile ? '10px' : isTablet ? '12px' : '14px';
    const titleY = isMobile ? 20 : 30;
    
    // Arrière-plan avec gradient moderne
    this.add.rectangle(width / 2, height / 2, width, height, 0xf8fafc);
    
    // Ajouter un pattern subtil en arrière-plan
    const bgPattern = this.add.graphics();
    bgPattern.fillStyle(0x000000, 0.02);
    for (let x = 0; x < width; x += 40) {
      for (let y = 0; y < height; y += 40) {
        bgPattern.fillCircle(x, y, 1);
      }
    }
    
    // Titre avec style moderne et animation d'entrée
    const title = this.add
      .text(width / 2, titleY, 'Remets les scènes dans l\'ordre chronologique', {
        fontSize: titleFontSize,
        color: '#1e293b',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);
      
    // Animation d'entrée du titre
    this.tweens.add({
      targets: title,
      alpha: 1,
      y: 35,
      duration: 800,
      ease: 'Back.easeOut'
    });
      
    // Instructions avec style amélioré
    const instruction1 = this.add
      .text(width / 2, 65, 'Lis les cartes et place-les dans l\'ordre de l\'histoire', {
        fontSize: '16px',
        color: '#475569',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    const instruction2 = this.add
      .text(width / 2, 85, 'Clique pour voir les détails • Utilise la logique chronologique', {
        fontSize: '14px',
        color: '#10b981',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Animation d'entrée des instructions
    this.tweens.add({
      targets: [instruction1, instruction2],
      alpha: 1,
      duration: 600,
      delay: 300,
      ease: 'Power2'
    });

    // Création des zones de dépôt avec design moderne
    const slotIndices = Array.from({ length: this.cardCount }, (_, i) => i);
    this.slots = slotIndices.map((i) => {
      // Calculer les positions responsive
      const slotWidth = isMobile ? 60 : isTablet ? 80 : 180;
      const slotHeight = isMobile ? 80 : isTablet ? 100 : 240;
      const slotSpacing = isMobile ? 80 : isTablet ? 120 : 220;
      const startX = isMobile ? 50 : isTablet ? 100 : 200;
      const x = startX + i * slotSpacing;
      const y = isMobile ? 200 : 300;
      
      // Zone de dépôt invisible
      const zone = this.add
        .zone(x, y, slotWidth, slotHeight)
        .setRectangleDropZone(slotWidth, slotHeight);
      (zone as any).index = i;

      // Fond de la zone avec gradient et ombre
      const slotBg = this.add.graphics();
      slotBg.fillGradientStyle(0xffffff, 0xffffff, 0xf8fafc, 0xf8fafc, 1, 1, 0, 0);
      slotBg.fillRoundedRect(x - slotWidth/2, y - slotHeight/2, slotWidth, slotHeight, 20);
      slotBg.lineStyle(3, 0xe2e8f0, 1);
      slotBg.strokeRoundedRect(x - slotWidth/2, y - slotHeight/2, slotWidth, slotHeight, 20);
      
      // Ombre portée
      slotBg.fillStyle(0x000000, 0.1);
      slotBg.fillRoundedRect(x - slotWidth/2 + 2, y - slotHeight/2 + 2, slotWidth, slotHeight, 20);

      // Numéro de l'étape avec style moderne
      const stepNumber = this.add
        .text(x, y - slotHeight/2 - 20, `Étape ${i + 1}`, {
          fontSize: isMobile ? '12px' : isTablet ? '14px' : '18px',
          color: '#1e293b',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
          stroke: '#ffffff',
          strokeThickness: 1,
        })
        .setOrigin(0.5)
        .setAlpha(0);
        
      // Indicateur visuel avec animation
      const indicatorSize = isMobile ? 8 : isTablet ? 10 : 12;
      const indicator = this.add.circle(x + slotWidth/2 - 10, y - slotHeight/2 + 10, indicatorSize, 0x10b981);
      indicator.setStrokeStyle(3, 0xffffff);
      indicator.setAlpha(0);
      
      // Icône dans l'indicateur
      const checkIcon = this.add.text(x + slotWidth/2 - 10, y - slotHeight/2 + 10, '✓', {
        fontSize: isMobile ? '10px' : isTablet ? '12px' : '14px',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
      }).setOrigin(0.5).setAlpha(0);

      // Animation d'entrée des zones
      this.tweens.add({
        targets: [stepNumber, indicator, checkIcon],
        alpha: 1,
        duration: 500,
        delay: 600 + (i * 100),
        ease: 'Back.easeOut'
      });

      return zone;
    });

    // Création des cartes avec design moderne et animations
    const cardKeys = Array.from({ length: this.cardCount }, (_, i) => `card${i + 1}`);
    const shuffledKeys = [...cardKeys].sort(() => Math.random() - 0.5);

    this.cards = shuffledKeys.map((key, i) => {
      // Calculer les positions responsive pour les cartes
      const cardSpacing = isMobile ? 80 : isTablet ? 120 : 220;
      const startX = isMobile ? 50 : isTablet ? 100 : 200;
      const x = startX + i * cardSpacing;
      const y = isMobile ? 350 : 520;

      const container = this.add.container(x, y) as CardContainer;
      container.setAlpha(0); // Commencer invisible pour l'animation

      // Carte avec texture moderne
      if (this.textures.exists(key)) {
        const img = this.add.image(0, 0, key);
        img.setDisplaySize(cardWidth, cardHeight);
        container.add(img);
      } else {
        // Fallback avec design moderne
        const cardImage = this.add.rectangle(0, 0, cardWidth, cardHeight, 0x3B82F6);
        cardImage.setStrokeStyle(4, 0xffffff);
        container.add(cardImage);
      }

      const cardNumber = key.replace('card', '');
      const cardIndex = parseInt(cardNumber) - 1;

      // Texte avec style moderne et ombre
      const displayText = this.shortStorySteps[cardIndex] || `Étape ${cardNumber}`;
      const frontNumber = this.add
        .text(0, 0, displayText, {
          fontSize: cardFontSize,
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: cardWidth - 20 },
          stroke: '#000000',
          strokeThickness: 2,
          shadow: {
            offsetX: 1,
            offsetY: 1,
            color: '#000000',
            blur: 2,
            fill: true
          }
        })
        .setOrigin(0.5);

      container.add(frontNumber);

      // Propriétés pour la validation
      (container as any).frontNumber = frontNumber;

      container.setSize(cardWidth, cardHeight);
      container.setInteractive({
        draggable: true,
        useHandCursor: true,
      });

      // Animation d'entrée des cartes
      this.tweens.add({
        targets: container,
        alpha: 1,
        y: y,
        scaleX: 1,
        scaleY: 1,
        duration: 600,
        delay: 1000 + (i * 150),
        ease: 'Back.easeOut'
      });

      this.input.setDraggable(container);
      return container;
    });

    // Événement de clic pour effet visuel de sélection amélioré
    this.input.on('pointerdown', (_pointer: any, currentlyOver: any) => {
      if (currentlyOver.length > 0) {
        const clickedObject = currentlyOver[0];
        // Vérifier si l'objet cliqué est une carte
        const card = this.cards.find(c => c === clickedObject.parentContainer || c === clickedObject);
        if (card) {
          // Effet visuel amélioré pour confirmer la sélection
          this.tweens.add({
            targets: card,
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 150,
            yoyo: true,
            ease: 'Back.easeOut'
          });
          
          // Effet de brillance
          this.tweens.add({
            targets: card,
            alpha: 0.8,
            duration: 75,
            yoyo: true,
            ease: 'Power2'
          });
        }
      }
    });

    // Événements de drag & drop avec animations améliorées
    this.input.on('dragstart', (_pointer: any, gameObject: CardContainer) => {
      gameObject.setScale(1.1);
      gameObject.setDepth(1000); // Mettre au premier plan
      this.children.bringToTop(gameObject);
      
      // Effet d'ombre portée pendant le drag
      this.tweens.add({
        targets: gameObject,
        alpha: 0.9,
        duration: 200,
        ease: 'Power2'
      });
    });

    this.input.on('drag', (_pointer: any, gameObject: CardContainer, dragX: number, dragY: number) => {
      gameObject.setPosition(dragX, dragY);
    });

    this.input.on('dragend', (_pointer: any, gameObject: CardContainer) => {
      gameObject.setScale(1);
      gameObject.setDepth(0); // Remettre à la profondeur normale
      
      // Restaurer l'opacité
      this.tweens.add({
        targets: gameObject,
        alpha: 1,
        duration: 200,
        ease: 'Power2'
      });
    });

    this.input.on('drop', (_pointer: any, gameObject: CardContainer, dropZone: any) => {
      // Vérifier si une autre carte occupe déjà cette zone
      const occupant = this.cards.find((card) => card.slotIndex === dropZone.index && card !== gameObject);
      if (occupant) {
        // Échanger les positions avec animation
        const tempX = gameObject.x;
        const tempY = gameObject.y;
        const tempSlot = gameObject.slotIndex;
        
        // Animation d'échange
        this.tweens.add({
          targets: gameObject,
          x: dropZone.x,
          y: dropZone.y,
          duration: 300,
          ease: 'Back.easeOut'
        });
        
        this.tweens.add({
          targets: occupant,
          x: tempX,
          y: tempY,
          duration: 300,
          ease: 'Back.easeOut'
        });
        
        gameObject.slotIndex = dropZone.index;
        occupant.slotIndex = tempSlot;
      } else {
        // Animation de placement
        this.tweens.add({
          targets: gameObject,
          x: dropZone.x,
          y: dropZone.y,
          duration: 300,
          ease: 'Back.easeOut'
        });
        gameObject.slotIndex = dropZone.index;
      }
      
      // Effet de succès visuel
      this.tweens.add({
        targets: gameObject,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 150,
        yoyo: true,
        ease: 'Power2'
      });
      
      // Vérifier si toutes les cartes sont placées pour activer le bouton
      this.updateValidateButton();
    });

    this.input.on('dragenter', (_pointer: any, _gameObject: any, dropZone: any) => {
      // Effet visuel amélioré pour la zone de drop
      this.tweens.add({
        targets: dropZone,
        alpha: 0.7,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 200,
        ease: 'Power2'
      });
    });

    this.input.on('dragleave', (_pointer: any, _gameObject: any, dropZone: any) => {
      // Restaurer l'état normal de la zone
      this.tweens.add({
        targets: dropZone,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2'
      });
    });

    // Instructions détaillées avec animation
    const instruction3 = this.add
      .text(width / 2, 110, 'Glisse chaque carte vers l\'étape correspondante', {
        fontSize: '16px',
        color: '#475569',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setAlpha(0);
      
    const instruction4 = this.add
      .text(width / 2, 130, 'Puis clique sur "Valider" pour vérifier ton ordre', {
        fontSize: '14px',
        color: '#64748b',
        fontFamily: 'Arial, sans-serif',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Animation d'entrée des instructions finales
    this.tweens.add({
      targets: [instruction3, instruction4],
      alpha: 1,
      duration: 500,
      delay: 1200,
      ease: 'Power2'
    });
    
    // Créer le bouton de validation avec délai
    this.time.delayedCall(1500, () => {
      this.createValidateButton();
    });
  }

  private createValidateButton() {
    const { width, height } = this.scale;
    
    // Créer le bouton de validation avec design moderne
    this.validateButton = this.add.container(width / 2, height - 60);
    this.validateButton.setAlpha(0); // Commencer invisible
    
    // Fond du bouton avec gradient
    const buttonBg = this.add.graphics();
    buttonBg.fillGradientStyle(0x10B981, 0x10B981, 0x059669, 0x059669, 1, 1, 0, 0);
    buttonBg.fillRoundedRect(-100, -25, 200, 50, 25);
    buttonBg.lineStyle(3, 0xffffff, 1);
    buttonBg.strokeRoundedRect(-100, -25, 200, 50, 25);
    
    // Ombre portée
    buttonBg.fillStyle(0x000000, 0.2);
    buttonBg.fillRoundedRect(-98, -23, 200, 50, 25);
    
    // Texte du bouton avec ombre
    const buttonText = this.add.text(0, 0, '✅ Valider', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#000000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5);
    
    this.validateButton.add([buttonBg, buttonText]);
    this.validateButton.setSize(200, 50);
    this.validateButton.setInteractive({ useHandCursor: true });
    
    // Animation d'entrée du bouton
    this.tweens.add({
      targets: this.validateButton,
      alpha: 1,
      y: height - 60,
      scaleX: 1,
      scaleY: 1,
      duration: 600,
      ease: 'Back.easeOut'
    });
    
    // Événement de clic avec animation
    this.validateButton.on('pointerdown', () => {
      // Animation de clic
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 100,
        yoyo: true,
        ease: 'Power2',
        onComplete: () => {
          this.checkWin();
        }
      });
    });
    
    // Effet hover amélioré
    this.validateButton.on('pointerover', () => {
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });
    
    this.validateButton.on('pointerout', () => {
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });
    
    // Désactiver le bouton initialement
    this.updateValidateButton();
  }

  private updateValidateButton() {
    if (!this.validateButton) return;
    
    // Vérifier si toutes les cartes sont placées
    const placedCards = this.cards.filter((card) => card.slotIndex !== undefined);
    const allPlaced = placedCards.length === this.cardCount;
    
    if (allPlaced) {
      // Activer le bouton avec animation
      this.tweens.add({
        targets: this.validateButton,
        alpha: 1,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 300,
        ease: 'Back.easeOut',
        yoyo: true
      });
      
      this.validateButton.setInteractive({ useHandCursor: true });
      
      // Changer la couleur pour indiquer qu'il est prêt
      const buttonBg = this.validateButton.list[0] as Phaser.GameObjects.Graphics;
      buttonBg.clear();
      buttonBg.fillGradientStyle(0x10B981, 0x10B981, 0x059669, 0x059669, 1, 1, 0, 0);
      buttonBg.fillRoundedRect(-100, -25, 200, 50, 25);
      buttonBg.lineStyle(3, 0xffffff, 1);
      buttonBg.strokeRoundedRect(-100, -25, 200, 50, 25);
      
      // Effet de pulsation pour attirer l'attention
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 1.02,
        scaleY: 1.02,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else {
      // Désactiver le bouton
      this.tweens.add({
        targets: this.validateButton,
        alpha: 0.6,
        duration: 200,
        ease: 'Power2'
      });
      
      this.validateButton.disableInteractive();
      
      // Changer la couleur pour indiquer qu'il n'est pas prêt
      const buttonBg = this.validateButton.list[0] as Phaser.GameObjects.Graphics;
      buttonBg.clear();
      buttonBg.fillGradientStyle(0x6B7280, 0x6B7280, 0x4B5563, 0x4B5563, 1, 1, 0, 0);
      buttonBg.fillRoundedRect(-100, -25, 200, 50, 25);
      buttonBg.lineStyle(3, 0x9CA3AF, 1);
      buttonBg.strokeRoundedRect(-100, -25, 200, 50, 25);
    }
  }

  private checkWin() {
    if (this.gameComplete) return;

    // Vérifier que toutes les cartes sont placées
    const placedCards = this.cards.filter((card) => card.slotIndex !== undefined);
    if (placedCards.length !== this.cardCount) return;
    
    // Désactiver le bouton de validation
    if (this.validateButton) {
      this.validateButton.disableInteractive();
      this.validateButton.setAlpha(0.5);
    }

    // Trier par index de slot et vérifier l'ordre
    const sortedCards = placedCards.sort((a, b) => a.slotIndex! - b.slotIndex!);
    const order = sortedCards.map((card) => {
      // Récupérer le texte de la carte depuis le frontNumber
      const frontNumber = (card as any).frontNumber;
      return frontNumber?.text || '';
    });

    // Vérifier si l'ordre correspond aux étapes chronologiques
    const correctStoryOrder = this.shortStorySteps.slice(0, this.cardCount);
    // Normaliser les textes pour ignorer les différences de \n
    const normalizedOrder = order.map(text => text.replace(/\n/g, ' ').trim());
    const normalizedCorrect = correctStoryOrder.map(text => text.replace(/\n/g, ' ').trim());
    const isCorrect = normalizedOrder.every((cardText, index) => cardText === normalizedCorrect[index]);
    
    // Debug temporaire pour voir le problème
    console.log('🎯 Vérification ordre:', {
      'Ordre actuel brut': order,
      'Ordre correct brut': correctStoryOrder,
      'Ordre normalisé': normalizedOrder,
      'Correct normalisé': normalizedCorrect,
      'Est correct': isCorrect
    });

    // Afficher le message avec design moderne
    const { width } = this.scale;
    let successMessage = 'Bravo ! Jonas a obéi à Dieu.';
    let badgeName = 'Ami des Prophètes';
    
    // Adapter le message selon la leçon
    if (this.lessonData && isCorrect) {
      switch (this.lessonData.id) {
        case 'jonas_02_fuite':
          successMessage = 'Bravo ! Tu as reconstitué la fuite de Jonas.';
          badgeName = 'Navigateur sage';
          break;
        case 'jonas_03_ninive':
          successMessage = 'Bravo ! Ninive s\'est convertie grâce à toi.';
          badgeName = 'Messager de paix';
          break;
        case 'jonas_04_ricin':
          successMessage = 'Bravo ! Tu as compris la leçon du ricin.';
          badgeName = 'Cœur miséricordieux';
          break;
        case 'daniel_01':
          successMessage = 'Bravo ! Daniel est resté fidèle à Dieu.';
          badgeName = 'Fidèle comme Daniel';
          break;
        case 'david_01':
          successMessage = 'Bravo ! David a vaincu le géant avec la foi.';
          badgeName = 'Courage de David';
          break;
        case 'creation_01':
          successMessage = 'Bravo ! Tu as retracé la création du monde.';
          badgeName = 'Témoin de la Création';
          break;
        case 'josue_01':
          successMessage = 'Bravo ! Les murailles sont tombées par la foi.';
          badgeName = 'Conquérant fidèle';
          break;
        case 'adam_eve_01':
          successMessage = 'Bravo ! Tu as compris l\'histoire d\'Adam et Ève.';
          badgeName = 'Gardien du Jardin';
          break;
        case 'moise_01':
          successMessage = 'Bravo ! Tu as retracé l\'Exode d\'Israël.';
          badgeName = 'Libérateur d\'Israël';
          break;
        case 'noe_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Noé et l\'arche.';
          badgeName = 'Navigateur de l\'Alliance';
          break;
        case 'babel_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de la Tour de Babel.';
          badgeName = 'Maître des Langues';
          break;
        case 'abraham_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire d\'Abraham et de l\'alliance.';
          badgeName = 'Fils d\'Abraham';
          break;
        case 'isaac_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire d\'Isaac et Rebecca.';
          badgeName = 'Héritier de la Promesse';
          break;
        case 'jacob_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Jacob et Ésaü.';
          badgeName = 'Maître de la Réconciliation';
          break;
        case 'joseph_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Joseph en Égypte.';
          badgeName = 'Maître du Pardon';
          break;
        case 'commandements_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire des Dix Commandements.';
          badgeName = 'Gardien de la Loi';
          break;
        case 'gedeon_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Gédéon et des 300 hommes.';
          badgeName = 'Vaillant Héros';
          break;
        case 'moise_buisson_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de l\'appel de Moïse.';
          badgeName = 'Témoin de l\'Appel';
          break;
        case 'plaies_egypte_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire des dix plaies d\'Égypte.';
          badgeName = 'Témoin de la Puissance';
          break;
        case 'mer_rouge_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de la traversée de la mer Rouge.';
          badgeName = 'Témoin du Miracle';
          break;
        case 'samson_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Samson et Dalila.';
          badgeName = 'Témoin de la Force';
          break;
        case 'salomon_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de Salomon et le Temple.';
          badgeName = 'Témoin de la Sagesse';
          break;
        case 'elie_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire d\'Élie et les prophètes de Baal.';
          badgeName = 'Témoin du Feu';
          break;
        case 'ezechiel_01':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire d\'Ézéchiel et les ossements desséchés.';
          badgeName = 'Témoin de la Résurrection';
          break;
        case 'naissance_jesus':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de la naissance de Jésus.';
          badgeName = 'Témoin de Noël';
          break;

        case 'enfance_jesus':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire de l\'enfance de Jésus au temple.';
          badgeName = 'Étudiant du Temple';
          break;

        case 'bapteme_jesus':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire du baptême de Jésus.';
          badgeName = 'Témoin du Baptême';
          break;

        case 'tentations_jesus':
          successMessage = 'Bravo ! Tu as reconstitué l\'histoire des tentations de Jésus.';
          badgeName = 'Vainqueur des Tentations';
          break;
        default:
          // Garder le message par défaut
          break;
      }
    }
    
    const message = isCorrect 
      ? successMessage 
      : 'Regarde bien l\'histoire, essaie encore.';
    
    const messageColor = isCorrect ? '#10b981' : '#ef4444';
    const bgColor = isCorrect ? 0x10b981 : 0xef4444;
    
    // Créer un fond pour le message
    const messageBg = this.add.graphics();
    messageBg.fillStyle(bgColor, 0.1);
    messageBg.fillRoundedRect(width / 2 - 200, 100, 400, 80, 20);
    messageBg.lineStyle(3, parseInt(messageColor.replace('#', ''), 16), 1);
    messageBg.strokeRoundedRect(width / 2 - 200, 100, 400, 80, 20);
    
    const messageText = this.add
      .text(width / 2, 140, message, {
        fontSize: '24px',
        color: messageColor,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0);

    // Animation d'entrée du message
    this.tweens.add({
      targets: [messageBg, messageText],
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut'
    });

    if (isCorrect) {
      this.gameComplete = true;
      
      // Animation de victoire améliorée
      this.tweens.add({
        targets: messageText,
        scaleX: 1.3,
        scaleY: 1.3,
        yoyo: true,
        duration: 400,
        ease: 'Back.easeOut',
        repeat: 2
      });

      // Effet de confettis ou particules (simulation avec des cercles)
      const { height } = this.scale;
      for (let i = 0; i < 20; i++) {
        const confetti = this.add.circle(
          width / 2 + (Math.random() - 0.5) * 400,
          height / 2 + (Math.random() - 0.5) * 200,
          Math.random() * 8 + 4,
          Math.random() * 0xffffff
        );
        
        this.tweens.add({
          targets: confetti,
          y: confetti.y + Math.random() * 200 + 100,
          alpha: 0,
          duration: 2000,
          ease: 'Power2',
          delay: Math.random() * 500
        });
      }

      // Émettre l'événement de victoire après un délai
      this.time.delayedCall(2000, () => {
        this.events.emit('lesson:completed', { badge: badgeName });
      });
    } else {
      // Effacer le message d'erreur après un délai et réactiver le bouton
      this.time.delayedCall(2500, () => {
        messageText.destroy();
        messageBg.destroy();
        // Réactiver le bouton pour permettre un nouvel essai
        this.updateValidateButton();
      });
    }
  }

  private createPlaceholderCard(color: number): Phaser.GameObjects.Rectangle {
    return this.add.rectangle(0, 0, 180, 240, color).setStrokeStyle(2, 0x6b7280);
  }

  // Fonction flipCard supprimée - plus nécessaire car tout le texte est visible
}
