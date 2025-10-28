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
    'Jonas obéit et prêche',
  ];

  // Versions courtes pour les cartes
  private shortStorySteps = [
    'Dieu parle\nà Jonas',
    'Jonas fuit\nen bateau',
    'Dans le ventre\ndu poisson',
    'Jonas obéit\net prêche',
  ];

  constructor() {
    super('OrderEvents');
  }

  // Force la réinitialisation complète de la scène (cartes, slots, etc.)
  reloadScene() {
    this.scene.restart();
  }

  public setLessonData(data: any) {
    this.lessonData = data;
    console.log('📚 SetLessonData appelé avec:', data?.id || 'pas de data');
    console.log('📚 Données complètes:', data);

    // Nouvelle logique : si story_steps existe dans la leçon, l'utiliser pour le jeu d'ordre
    if (
      data &&
      Array.isArray(data.story_steps) &&
      data.story_steps.length > 0
    ) {
      // story_steps peut être un tableau de chaînes ou d'objets {title, content}
      const removeDayPrefix = (txt: string) =>
        txt.replace(/^Jour \d+ ?-? ?/i, '').trim();
      if (typeof data.story_steps[0] === 'string') {
        this.storySteps = data.story_steps.map((txt: string) =>
          removeDayPrefix(txt)
        );
        this.shortStorySteps = this.storySteps;
      } else {
        this.storySteps = data.story_steps.map((step: any) =>
          removeDayPrefix(step.title || step.content || '')
        );
        this.shortStorySteps = this.storySteps;
      }
      this.cardCount = this.storySteps.length;
      this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
      console.log(
        '🟢 storySteps dynamiques extraites du JSON:',
        this.storySteps
      );
      console.log('🎯 correctOrder mis à jour:', this.correctOrder);
      // Redémarre la scène pour afficher les nouvelles cartes
      this.reloadScene();
      return;
    }
    // Fallback legacy: anciens cas codés en dur
    if (data && data.id) {
      switch (data.id) {
        case 'jonas_01':
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche',
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche',
          ];
          break;
        case 'jonas_02_fuite':
          this.storySteps = [
            'Dieu donne la mission',
            'Jonas refuse et fuit',
            'Tempête sur la mer',
            'Jonas jeté à la mer',
          ];
          this.shortStorySteps = [
            'Dieu donne\nla mission',
            'Jonas refuse\net fuit',
            'Tempête\nsur la mer',
            'Jonas jeté\nà la mer',
          ];
          break;
        case 'jonas_03_ninive':
          this.storySteps = [
            'Jonas prêche à Ninive',
            'Les habitants se repentent',
            'Le roi ordonne le jeûne',
            'Dieu pardonne la ville',
          ];
          this.shortStorySteps = [
            'Jonas prêche\nà Ninive',
            'Les habitants\nse repentent',
            'Le roi ordonne\nle jeûne',
            'Dieu pardonne\nla ville',
          ];
          break;
        case 'jonas_04_ricin':
          this.storySteps = [
            'Jonas attend dehors',
            'Dieu fait pousser le ricin',
            'Un ver détruit le ricin',
            'Leçon de miséricorde',
          ];
          this.shortStorySteps = [
            'Jonas attend\ndehors',
            'Dieu fait pousser\nle ricin',
            'Un ver détruit\nle ricin',
            'Leçon de\nmiséricorde',
          ];
          break;
        case 'daniel_01':
          this.storySteps = [
            'Daniel prie fidèlement',
            'Les jaloux le dénoncent',
            'Daniel jeté aux lions',
            'Dieu ferme leur gueule',
          ];
          this.shortStorySteps = [
            'Daniel prie\nfidèlement',
            'Les jaloux\nle dénoncent',
            'Daniel jeté\naux lions',
            'Dieu ferme\nleur gueule',
          ];
          break;
        case 'david_01':
          this.storySteps = [
            'Goliath défie Israël',
            'David se porte volontaire',
            'David lance sa pierre',
            'Goliath tombe, victoire !',
          ];
          this.shortStorySteps = [
            'Goliath défie\nIsraël',
            'David se porte\nvolontaire',
            'David lance\nsa pierre',
            'Goliath tombe\nvictoire !',
          ];
          break;
        case 'creation_01':
          this.storySteps = [
            'Jour 1 : Dieu sépare la lumière des ténèbres',
            'Jour 2 : Dieu sépare les eaux et crée le firmament',
            'Jour 3 : Dieu sépare la terre des mers et crée les plantes',
            'Jour 4 : Dieu crée le soleil, la lune et les étoiles',
            'Jour 5 : Dieu crée les poissons et les oiseaux',
            'Jour 6 : Dieu crée les animaux terrestres et l\'homme',
            'Jour 7 : Dieu se repose et bénit le septième jour'
          ];
          this.shortStorySteps = [
            'Jour 1 :\nLumière/ténèbres',
            'Jour 2 :\nEaux et firmament',
            'Jour 3 :\nTerre, mers, plantes',
            'Jour 4 :\nSoleil, lune, étoiles',
            'Jour 5 :\nPoissons et oiseaux',
            'Jour 6 :\nAnimaux et homme',
            'Jour 7 :\nRepos de Dieu'
          ];
          this.cardCount = this.storySteps.length;
          this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
          break;
        case 'moise_01':
          this.storySteps = [
            "Le peuple d'Israël est esclave en Égypte",
            'Moïse reçoit la mission de Dieu',
            "Les dix plaies d'Égypte",
            'La traversée de la mer Rouge',
          ];
          this.shortStorySteps = [
            "Le peuple d'Israël\nest esclave en Égypte",
            'Moïse reçoit\nla mission de Dieu',
            "Les dix plaies\nd'Égypte",
            'La traversée\nde la mer Rouge',
          ];
          break;
        case 'moise_buisson_01':
          this.storySteps = [
            'Moïse garde les troupeaux dans le désert',
            'Moïse voit le buisson ardent qui ne se consume pas',
            'Dieu appelle Moïse depuis le buisson',
            'Dieu dit à Moïse d\'ôter ses chaussures',
            'Dieu révèle son nom et sa mission',
            'Moïse hésite et exprime ses doutes',
            'Dieu rassure Moïse et lui donne des signes',
          ];
          this.shortStorySteps = [
            'Moïse garde les\ntroupeaux dans le désert',
            'Moïse voit le buisson\nardent qui ne se\nconsume pas',
            'Dieu appelle Moïse\ndepuis le buisson',
            'Dieu dit à Moïse\nd\'ôter ses chaussures',
            'Dieu révèle son nom\net sa mission',
            'Moïse hésite et\nexprime ses doutes',
            'Dieu rassure Moïse et\nlui donne des signes',
          ];
          break;
        case 'mer_rouge_01':
          this.storySteps = [
            'Les Israélites arrivent au bord de la mer Rouge',
            'Moïse étend sa main et les eaux se séparent',
            'Les Israélites traversent à pied sec',
            'Les eaux se referment sur l\'armée de Pharaon',
          ];
          this.shortStorySteps = [
            'Les Israélites arrivent\nau bord de la mer Rouge',
            'Moïse étend sa main et\nles eaux se séparent',
            'Les Israélites traversent\nà pied sec',
            'Les eaux se referment sur\nl\'armée de Pharaon',
          ];
          this.cardCount = this.storySteps.length;
          this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
          console.log('🌊 Mer Rouge - Nombre de cartes:', this.cardCount);
          break;
        case 'noe_01':
          this.storySteps = [
            'Dieu voit le mal sur la terre',
            "Noé construit l'arche",
            'Le déluge recouvre la terre',
            "L'alliance et l'arc-en-ciel",
          ];
          this.shortStorySteps = [
            'Dieu voit le mal\nsur la terre',
            "Noé construit\nl'arche",
            'Le déluge recouvre\nla terre',
            "L'alliance et\nl'arc-en-ciel",
          ];
          break;
        case 'tabernacle_01':
          this.storySteps = [
            'Dieu ordonne à Moïse de construire un sanctuaire',
            'Les Israélites apportent des offrandes volontaires',
            'Construction de l\'arche de l\'alliance en bois d\'acacia',
            'Réalisation du propitiatoire en or pur',
            'Fabrication du voile séparant le lieu saint',
            'Construction de l\'autel des holocaustes',
            'Moïse consacre le tabernacle achevé',
            'La nuée de Dieu remplit le sanctuaire',
          ];
          this.shortStorySteps = [
            'Dieu ordonne à Moïse\nde construire un sanctuaire',
            'Les Israélites apportent\ndes offrandes volontaires',
            'Construction de l\'arche\nen bois d\'acacia',
            'Réalisation du propitiatoire\nen or pur',
            'Fabrication du voile\nséparant le lieu saint',
            'Construction de l\'autel\ndes holocaustes',
            'Moïse consacre le\ntabernacle achevé',
            'La nuée de Dieu remplit\nle sanctuaire',
          ];
          this.cardCount = this.storySteps.length;
          this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
          console.log('🏛️ Tabernacle - Nombre de cartes:', this.cardCount);
          break;
        case 'terre_promise_01':
          this.storySteps = [
            'Moïse atteint l\'âge de 120 ans',
            'Il gravit le mont Nebo dans le pays de Moab',
            'Dieu lui montre toute la terre promise',
            'Moïse contemple le pays qu\'il ne peut posséder',
            'Dieu lui révèle que Josué guidera le peuple',
            'Moïse meurt seul avec Dieu sur la montagne',
          ];
          this.shortStorySteps = [
            'Moïse atteint l\'âge\nde 120 ans',
            'Il gravit le mont Nebo\ndans le pays de Moab',
            'Dieu lui montre toute\nla terre promise',
            'Moïse contemple le pays\nqu\'il ne peut posséder',
            'Dieu révèle que Josué\nguidera le peuple',
            'Moïse meurt seul avec Dieu\nsur la montagne',
          ];
          this.cardCount = this.storySteps.length;
          this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
          console.log('🏔️ Terre Promise - Nombre de cartes:', this.cardCount);
          break;
        case 'josue_01':
          this.storySteps = [
            'Dieu donne à Josué les instructions pour conquérir Jéricho',
            'Les Israélites marchent silencieusement autour de la ville pendant 6 jours',
            'Le septième jour, ils font 7 tours autour des murailles',
            'Josué ordonne au peuple de crier à la fin du septième tour',
            'Les murailles de Jéricho s\'effondrent par la puissance de Dieu',
            'Le peuple monte dans la ville et la conquiert selon le plan divin',
          ];
          this.shortStorySteps = [
            'Dieu donne à Josué les\ninstructions pour conquérir',
            'Les Israélites marchent\nsilencieusement 6 jours',
            'Le septième jour, ils font\n7 tours autour des murailles',
            'Josué ordonne au peuple\nde crier au dernier tour',
            'Les murailles s\'effondrent\npar la puissance de Dieu',
            'Le peuple conquiert la ville\nselon le plan divin',
          ];
          this.cardCount = this.storySteps.length;
          this.correctOrder = Array.from({ length: this.cardCount }, (_, i) => (i + 1).toString());
          console.log('🏰 Jéricho - Nombre de cartes:', this.cardCount);
          break;
        case 'babel_01':
          this.storySteps = [
            'Tous parlent la même langue',
            'Ils décident de construire une tour',
            'Dieu confond leur langage',
            'Ils se dispersent sur la terre',
          ];
          this.shortStorySteps = [
            'Tous parlent\nla même langue',
            'Ils décident de\nconstruire une tour',
            'Dieu confond\nleur langage',
            'Ils se dispersent\nsur la terre',
          ];
          break;
        case 'abraham_01':
          this.storySteps = [
            'Dieu appelle Abram',
            'Abram quitte son pays',
            'Dieu promet une grande nation',
            'Abraham reçoit Isaac',
          ];
          this.shortStorySteps = [
            'Dieu appelle\nAbram',
            'Abram quitte\nson pays',
            'Dieu promet\nune grande nation',
            'Abraham reçoit\nIsaac',
          ];
          break;
        case 'isaac_sacrifice_01':
          this.storySteps = [
            'Dieu met Abraham à l\'épreuve',
            'Abraham et Isaac partent vers Morija',
            'Isaac demande où est l\'agneau',
            'Abraham construit l\'autel',
            'L\'ange arrête Abraham',
            'Abraham sacrifie un bélier',
            'Dieu renouvelle sa promesse',
          ];
          this.shortStorySteps = [
            'Dieu met Abraham\nà l\'épreuve',
            'Voyage vers\nMorija',
            'Isaac demande\noù est l\'agneau',
            'Abraham construit\nl\'autel',
            'L\'ange arrête\nAbraham',
            'Abraham sacrifie\nun bélier',
            'Dieu renouvelle\nsa promesse',
          ];
          break;
        case 'isaac_mariage_01':
          this.storySteps = [
            'Abraham envoie son serviteur',
            'Le serviteur va en Mésopotamie',
            "Rebecca puise de l'eau au puits",
            'Isaac et Rebecca se marient',
          ];
          this.shortStorySteps = [
            'Abraham envoie\nson serviteur',
            'Le serviteur va\nen Mésopotamie',
            "Rebecca puise\nde l'eau au puits",
            'Isaac et Rebecca\nse marient',
          ];
          break;
        case 'jacob_esau_01':
          this.storySteps = [
            'Naissance des jumeaux Jacob et Ésaü',
            "Ésaü vend son droit d'aînesse",
            "Jacob reçoit la bénédiction d'Isaac",
            'Jacob doit fuir la colère d\'Ésaü',
            'Jacob revient avec sa famille',
            'Jacob et Ésaü se réconcilient',
          ];
          this.shortStorySteps = [
            'Naissance des\njumeaux Jacob et Ésaü',
            "Ésaü vend son\ndroit d'aînesse",
            "Jacob reçoit la\nbénédiction d'Isaac",
            'Jacob doit fuir\nla colère d\'Ésaü',
            'Jacob revient\navec sa famille',
            'Jacob et Ésaü\nse réconcilient',
          ];
          break;
        case 'jacob_songe_01':
          this.storySteps = [
            'Jacob voyage vers Haran',
            'Jacob s\'arrête pour dormir',
            'Jacob voit l\'échelle dans son songe',
            'Les anges montent et descendent',
            'Dieu parle à Jacob',
            'Jacob se réveille et réalise',
            'Jacob érige un monument à Béthel',
          ];
          this.shortStorySteps = [
            'Jacob voyage\nvers Haran',
            'Jacob s\'arrête\npour dormir',
            'Jacob voit l\'échelle\ndans son songe',
            'Les anges montent\net descendent',
            'Dieu parle\nà Jacob',
            'Jacob se réveille\net réalise',
            'Jacob érige un\nmonument à Béthel',
          ];
          break;
        case 'joseph_01':
          this.storySteps = [
            'Joseph est aimé de son père',
            'Ses frères le vendent en Égypte',
            'Joseph interprète les rêves du pharaon',
            'Joseph pardonne à ses frères',
          ];
          this.shortStorySteps = [
            'Joseph est aimé\nde son père',
            'Ses frères le\nvendent en Égypte',
            'Joseph interprète\nles rêves du pharaon',
            'Joseph pardonne\nà ses frères',
          ];
          break;
        case 'commandements_01':
          this.storySteps = [
            'Moïse monte sur le mont Sinaï',
            'Dieu parle au milieu du tonnerre et du feu',
            'Dieu donne les dix commandements',
            'Les commandements sont gravés sur des tables de pierre',
          ];
          this.shortStorySteps = [
            'Moïse monte sur\nle mont Sinaï',
            'Dieu parle au milieu\ndu tonnerre et du feu',
            'Dieu donne les\ndix commandements',
            'Les commandements\nsont gravés sur des\ntables de pierre',
          ];
          break;
        case 'salomon_01':
          this.storySteps = [
            'Salomon demande la sagesse à Dieu pour gouverner le peuple',
            'Dieu exauce sa prière et lui donne une sagesse reconnue dans le monde',
            'Salomon fait construire un magnifique Temple à Jérusalem',
            "L'arche de l'alliance est placée dans le Temple et la gloire de Dieu le remplit",
          ];
          this.shortStorySteps = [
            'Salomon demande la sagesse\nà Dieu pour gouverner\nle peuple',
            'Dieu exauce sa prière et\nlui donne une sagesse\nreconnue dans le monde',
            'Salomon fait construire un\nmagnifique Temple\nà Jérusalem',
            "L'arche de l'alliance est\nplacée dans le Temple et\nla gloire de Dieu le remplit",
          ];
          console.log(
            '👑 Étapes Salomon et le Temple définies:',
            this.storySteps
          );
          break;
        case 'elie_01':
          this.storySteps = [
            'Élie rassemble le peuple sur le mont Carmel pour un défi',
            'Les prophètes de Baal crient et dansent toute la journée sans résultat',
            "Élie arrose le bois d'eau et prie Dieu",
            'Le feu du ciel tombe et consume le sacrifice, et le peuple reconnaît Dieu',
          ];
          this.shortStorySteps = [
            'Élie rassemble le peuple\nsur le mont Carmel\npour un défi',
            'Les prophètes de Baal crient\net dansent toute la journée\nsans résultat',
            "Élie arrose le bois d'eau\net prie Dieu",
            'Le feu du ciel tombe et\nconsume le sacrifice, et le\npeuple reconnaît Dieu',
          ];
          console.log(
            '🔥 Étapes Élie et les prophètes de Baal définies:',
            this.storySteps
          );
          break;
        case 'ezechiel_01':
          this.storySteps = [
            "Dieu transporte Ézéchiel dans une vallée d'ossements desséchés",
            'Dieu demande à Ézéchiel si ces os peuvent revivre',
            'Ézéchiel prophétise et les os se rapprochent, la chair et la peau se forment',
            "L'esprit de Dieu entre en eux et ils deviennent une armée vivante",
          ];
          this.shortStorySteps = [
            "Dieu transporte Ézéchiel\ndans une vallée\nd'ossements desséchés",
            'Dieu demande à Ézéchiel\nsi ces os peuvent\nrevivre',
            'Ézéchiel prophétise et les os\nse rapprochent, la chair\net la peau se forment',
            "L'esprit de Dieu entre en eux\net ils deviennent une\narmée vivante",
          ];
          console.log(
            '💨 Étapes Ézéchiel et les ossements desséchés définies:',
            this.storySteps
          );
          break;
        case 'naissance_jesus':
          this.storySteps = [
            "L'ange Gabriel annonce à Marie qu'elle aura un enfant par l'Esprit Saint",
            'Marie accepte la volonté de Dieu avec foi',
            "Joseph prend Marie chez lui après que l'ange lui soit apparu en rêve",
            'Marie et Joseph vont à Bethléhem pour le recensement de César',
            "Jésus naît dans une étable faute de place à l'auberge",
            "Des bergers reçoivent l'annonce de la naissance par un ange",
            "Une étoile guide des mages d'Orient vers Jésus",
          ];
          this.shortStorySteps = [
            "L'ange Gabriel annonce\nà Marie qu'elle aura\nun enfant par l'Esprit Saint",
            'Marie accepte la volonté\nde Dieu avec foi',
            "Joseph prend Marie chez lui\naprès que l'ange lui soit\napparu en rêve",
            'Marie et Joseph vont\nà Bethléhem pour le\nrecensement de César',
            "Jésus naît dans une étable\nfaute de place à\nl'auberge",
            "Des bergers reçoivent\nl'annonce de la naissance\npar un ange",
            "Une étoile guide des mages\nd'Orient vers Jésus",
          ];
          console.log(
            '👶 Étapes Naissance de Jésus définies:',
            this.storySteps
          );
          break;

        case 'enfance_jesus':
          this.storySteps = [
            'Marie et Joseph vont à Jérusalem pour la fête de la Pâque avec Jésus',
            'Après la fête, ils repartent mais Jésus reste à Jérusalem',
            "Ils pensent qu'il est avec d'autres voyageurs et font une journée de chemin",
            'Ils le cherchent parmi leurs parents et connaissances sans le trouver',
            'Ils retournent à Jérusalem pour le chercher',
            'Au bout de trois jours, ils le trouvent dans le temple',
            'Jésus écoute les docteurs et pose des questions, étonnant tous par son intelligence',
            "Jésus répond qu'il faut qu'il s'occupe des affaires de son Père",
          ];
          this.shortStorySteps = [
            'Marie et Joseph vont\nà Jérusalem pour la fête\nde la Pâque avec Jésus',
            'Après la fête, ils repartent\nmais Jésus reste\nà Jérusalem',
            "Ils pensent qu'il est avec\nd'autres voyageurs et font\nune journée de chemin",
            'Ils le cherchent parmi leurs\nparents et connaissances\nsans le trouver',
            'Ils retournent à Jérusalem\npour le chercher',
            'Au bout de trois jours,\nils le trouvent dans\nle temple',
            'Jésus écoute les docteurs\net pose des questions,\nétonnant tous par son intelligence',
            "Jésus répond qu'il faut\nqu'il s'occupe des affaires\nde son Père",
          ];
          console.log(
            "🧒 Étapes L'enfance de Jésus définies:",
            this.storySteps
          );
          break;

        case 'bapteme_jesus':
          this.storySteps = [
            'Jean-Baptiste prêche dans le désert, appelant à la repentance',
            'Jésus vient de Galilée pour être baptisé par Jean',
            "Jean hésite, disant qu'il a besoin d'être baptisé par Jésus",
            "Jésus insiste, expliquant que c'est nécessaire pour accomplir toute la justice",
            "Jésus est baptisé par Jean dans l'eau",
            "Lorsque Jésus sort de l'eau, les cieux s'ouvrent",
            "L'Esprit de Dieu descend sur lui comme une colombe",
            'Une voix du ciel dit : « Celui-ci est mon Fils bien-aimé »',
          ];
          this.shortStorySteps = [
            'Jean-Baptiste prêche\ndans le désert, appelant\nà la repentance',
            'Jésus vient de Galilée\npour être baptisé\npar Jean',
            "Jean hésite, disant qu'il a\nbesoin d'être baptisé\npar Jésus",
            "Jésus insiste, expliquant\nque c'est nécessaire pour\naccomplir toute la justice",
            "Jésus est baptisé par Jean\ndans l'eau",
            "Lorsque Jésus sort de l'eau,\nles cieux s'ouvrent",
            "L'Esprit de Dieu descend\nsur lui comme une colombe",
            'Une voix du ciel dit :\n« Celui-ci est mon Fils bien-aimé »',
          ];
          console.log(
            '💦 Étapes Le baptême de Jésus définies:',
            this.storySteps
          );
          break;

        case 'tentations_jesus':
          this.storySteps = [
            "Après son baptême, Jésus est conduit par l'Esprit dans le désert",
            'Jésus jeûne quarante jours et quarante nuits, après quoi il a faim',
            "Le diable s'approche et lui dit : « Si tu es Fils de Dieu, ordonne que ces pierres deviennent des pains »",
            "Jésus répond : « L'homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu »",
            'Le diable transporte Jésus sur le haut du temple et le tente de se jeter en bas',
            'Jésus répond : « Tu ne tenteras point le Seigneur, ton Dieu »',
            'Le diable montre à Jésus tous les royaumes du monde et leur gloire',
            'Jésus répond : « Retire-toi, Satan ! Tu adoreras le Seigneur, ton Dieu, et tu le serviras lui seul »',
            'Le diable laisse Jésus, et des anges viennent le servir',
          ];
          this.shortStorySteps = [
            "Après son baptême, Jésus est\nconduit par l'Esprit\ndans le désert",
            'Jésus jeûne quarante jours\net quarante nuits,\naprès quoi il a faim',
            "Le diable s'approche et lui dit :\n« Si tu es Fils de Dieu,\nordonne que ces pierres deviennent des pains »",
            "Jésus répond : « L'homme ne vivra pas\nde pain seulement, mais de toute\nparole qui sort de la bouche de Dieu »",
            'Le diable transporte Jésus\nsur le haut du temple\net le tente de se jeter en bas',
            'Jésus répond : « Tu ne tenteras point\nle Seigneur, ton Dieu »',
            'Le diable montre à Jésus\ntous les royaumes du monde\net leur gloire',
            'Jésus répond : « Retire-toi, Satan !\nTu adoreras le Seigneur, ton Dieu,\net tu le serviras lui seul »',
            'Le diable laisse Jésus,\net des anges viennent le servir',
          ];
          console.log(
            '😈 Étapes Les tentations de Jésus définies:',
            this.storySteps
          );
          break;
        default:
          // Utiliser les étapes Jonas par défaut
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche',
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche',
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
      { from: 0x3b82f6, to: 0x1d4ed8 }, // Bleu gradient
      { from: 0x10b981, to: 0x047857 }, // Vert gradient
      { from: 0xf59e0b, to: 0xd97706 }, // Orange gradient
      { from: 0xef4444, to: 0xdc2626 }, // Rouge gradient
      { from: 0x8b5cf6, to: 0x7c3aed }, // Violet gradient
      { from: 0x06b6d4, to: 0x0891b2 }, // Cyan gradient
    ];

    for (let i = 1; i <= 6; i++) {
      graphics.clear();

      // Créer un gradient radial pour un effet moderne
      const color = gradientColors[i - 1];
      graphics.fillGradientStyle(
        color.from,
        color.from,
        color.to,
        color.to,
        1,
        1,
        0.5,
        0.5
      );
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
    graphics.fillGradientStyle(
      0xf8fafc,
      0xf8fafc,
      0xe2e8f0,
      0xe2e8f0,
      1,
      1,
      0,
      0
    );
    graphics.fillRect(0, 0, 800, 600);
    graphics.generateTexture('bg', 800, 600);

    graphics.destroy();
  }

  create() {
    // (déclarations remplacées plus bas)
    const { width, height } = this.scale;
    const isMobile = width < 600;
    
    // Adaptive sizing based on number of cards
    let slotWidth, slotHeight, cardWidth, cardHeight, margin, cardsPerRow, slotsPerRow;
    
    if (this.cardCount > 20) {
      // For large number of cards (20+)
      slotWidth = isMobile ? 60 : 90;
      slotHeight = isMobile ? 50 : 70;
      cardsPerRow = isMobile ? 5 : 8;
      slotsPerRow = isMobile ? 5 : 8;
      margin = isMobile ? 8 : 15;
    } else if (this.cardCount > 10) {
      // For medium number of cards (10-20)
      slotWidth = isMobile ? 70 : 100;
      slotHeight = isMobile ? 60 : 90;
      cardsPerRow = isMobile ? 4 : 6;
      slotsPerRow = isMobile ? 4 : 6;
      margin = isMobile ? 8 : 15;
    } else {
      // For small number of cards (1-10)
      slotWidth = isMobile ? 80 : 110;
      slotHeight = isMobile ? 70 : 100;
      cardsPerRow = isMobile ? 4 : 6;
      slotsPerRow = isMobile ? 4 : 6;
      margin = isMobile ? 10 : 20;
    }
    
    cardWidth = slotWidth;
    cardHeight = slotHeight;
    
    // Fond moderne avec gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0xf8fafc, 0xf8fafc, 0xe2e8f0, 0xe2e8f0, 1, 1, 1, 1);
    bg.fillRoundedRect(0, 0, width, height, 30);
    
    // Ajouter des éléments décoratifs subtils
    const decorGraphics = this.add.graphics();
    decorGraphics.setAlpha(0.1);
    
    // Motifs géométriques subtils
    for (let i = 0; i < 5; i++) {
      const x = (width / 6) * (i + 1);
      const y = height * 0.15;
      decorGraphics.fillStyle(0x3b82f6, 0.3);
      decorGraphics.fillCircle(x, y, 4);
    }
    
    // Titre avec style amélioré
    const titleY = 25;
    const instructionsY = titleY + (isMobile ? 35 : 45);
    // Espace dynamique après instructions (plus il y a d'étapes, plus on espace)
    const minSpace = isMobile ? 50 : 70;
    const extraSpace =
      Math.max(0, this.cardCount - (isMobile ? 4 : 6)) * (isMobile ? 8 : 12);
    const slotsStartY = instructionsY + minSpace + extraSpace;
    
    // Titre principal avec ombre et gradient
    const titleText = this.add
      .text(width / 2, titleY, "Remets les scènes dans l'ordre chronologique", {
        fontSize: isMobile ? '20px' : '28px',
        color: '#1e293b',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontStyle: 'bold',
        stroke: '#fff',
        strokeThickness: 3,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#94a3b8',
          blur: 4,
          fill: true,
        },
      })
      .setOrigin(0.5);
    
    // Instructions avec style moderne
    this.add
      .text(
        width / 2,
        instructionsY,
        "📚 Glisse les cartes dans les zones pour reconstituer l'histoire",
        {
          fontSize: isMobile ? '13px' : '16px',
          color: '#475569',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontStyle: '500',
          shadow: {
            offsetX: 1,
            offsetY: 1,
            color: '#cbd5e1',
            blur: 2,
            fill: true,
          },
        }
      )
      .setOrigin(0.5);
    // Calcul slots sur plusieurs lignes si besoin
    const slotRows = Math.ceil(this.cardCount / slotsPerRow);
    const slotIndices = Array.from({ length: this.cardCount }, (_, i) => i);
    this.slots = slotIndices.map((i) => {
      const row = Math.floor(i / slotsPerRow);
      const col = i % slotsPerRow;
      const slotsInThisRow =
        row === slotRows - 1 ? this.cardCount - row * slotsPerRow : slotsPerRow;
      const totalRowWidth =
        slotsInThisRow * slotWidth + (slotsInThisRow - 1) * margin;
      const x =
        width / 2 -
        totalRowWidth / 2 +
        col * (slotWidth + margin) +
        slotWidth / 2;
      const y = slotsStartY + row * (slotHeight + 36);
      const zone = this.add
        .zone(x, y, slotWidth, slotHeight)
        .setRectangleDropZone(slotWidth, slotHeight);
      (zone as any).index = i;
      // Slot background moderne avec gradient et ombre
      const slotBg = this.add.graphics();
      
      // Ombre portée
      slotBg.fillStyle(0x1e293b, 0.15);
      slotBg.fillRoundedRect(
        x - slotWidth / 2 + 2,
        y - slotHeight / 2 + 2,
        slotWidth,
        slotHeight,
        18
      );
      
      // Fond principal avec gradient
      slotBg.fillGradientStyle(0xffffff, 0xffffff, 0xf1f5f9, 0xf1f5f9, 1, 1, 1, 1);
      slotBg.fillRoundedRect(
        x - slotWidth / 2,
        y - slotHeight / 2,
        slotWidth,
        slotHeight,
        18
      );
      
      // Bordure avec gradient
      slotBg.lineStyle(2, 0x94a3b8, 0.6);
      slotBg.strokeRoundedRect(
        x - slotWidth / 2,
        y - slotHeight / 2,
        slotWidth,
        slotHeight,
        18
      );
      
      // Bordure interne subtile
      slotBg.lineStyle(1, 0xffffff, 0.8);
      slotBg.strokeRoundedRect(
        x - slotWidth / 2 + 1,
        y - slotHeight / 2 + 1,
        slotWidth - 2,
        slotHeight - 2,
        17
      );
      
      // Indicateur de position
      const stepNumber = this.add
        .text(x, y - slotHeight / 2 + 15, `${i + 1}`, {
          fontSize: isMobile ? '12px' : '14px',
          color: '#94a3b8',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);
      
      slotBg.setAlpha(0.95);
      // (Suppression du numéro d'étape pour un affichage plus épuré)
      return zone;
    });
    // Cartes sur plusieurs lignes si besoin
    const cardRows = Math.ceil(this.cardCount / cardsPerRow);
    const cardsStartY = slotsStartY + slotRows * (slotHeight + 36) + 20;
    const cardKeys = Array.from(
      { length: this.cardCount },
      (_, i) => `card${i + 1}`
    );
    const shuffledKeys = [...cardKeys].sort(() => Math.random() - 0.5);
    this.cards = shuffledKeys.map((key, i) => {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const cardsInThisRow =
        row === cardRows - 1 ? this.cardCount - row * cardsPerRow : cardsPerRow;
      const totalRowWidth =
        cardsInThisRow * cardWidth + (cardsInThisRow - 1) * margin;
      const x =
        width / 2 -
        totalRowWidth / 2 +
        col * (cardWidth + margin) +
        cardWidth / 2;
      const y = cardsStartY + row * (cardHeight + 28);
      const container = this.add.container(x, y) as CardContainer;
      const cardIndex = parseInt(key.replace('card', '')) - 1;
      // Card background moderne avec gradient et ombre
      const cardGraphics = this.add.graphics();
      
      // Ombre portée élégante
      cardGraphics.fillStyle(0x1e293b, 0.2);
      cardGraphics.fillRoundedRect(
        -cardWidth / 2 + 3,
        -cardHeight / 2 + 3,
        cardWidth,
        cardHeight,
        22
      );
      
      // Couleurs gradient selon l'index de la carte
      const gradientColors = [
        { top: 0x3b82f6, bottom: 0x1d4ed8 },  // Bleu
        { top: 0x10b981, bottom: 0x059669 },  // Vert
        { top: 0xf59e0b, bottom: 0xd97706 },  // Orange
        { top: 0xef4444, bottom: 0xdc2626 },  // Rouge
      ];
      const colorSet = gradientColors[cardIndex % gradientColors.length];
      
      // Fond principal avec gradient
      cardGraphics.fillGradientStyle(
        colorSet.top, colorSet.top, 
        colorSet.bottom, colorSet.bottom, 
        1, 1, 1, 1
      );
      cardGraphics.fillRoundedRect(
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth,
        cardHeight,
        22
      );
      
      // Bordure brillante
      cardGraphics.lineStyle(2, 0xffffff, 0.9);
      cardGraphics.strokeRoundedRect(
        -cardWidth / 2,
        -cardHeight / 2,
        cardWidth,
        cardHeight,
        22
      );
      
      // Reflet subtil sur le haut
      cardGraphics.fillStyle(0xffffff, 0.15);
      cardGraphics.fillRoundedRect(
        -cardWidth / 2 + 2,
        -cardHeight / 2 + 2,
        cardWidth - 4,
        cardHeight / 3,
        20
      );
      
      container.add(cardGraphics);
      // Card text
      // Afficher uniquement le texte de l'étape (shortStorySteps), sinon rien
      const displayText = this.shortStorySteps[cardIndex] || '';
      
      // Adaptive text size based on number of cards
      let fontSize;
      if (this.cardCount > 20) {
        fontSize = isMobile ? '8px' : '10px';
      } else if (this.cardCount > 10) {
        fontSize = isMobile ? '9px' : '12px';
      } else {
        fontSize = isMobile ? '11px' : '15px';
      }
      
      const frontNumber = this.add
        .text(0, 0, displayText, {
          fontSize: fontSize,
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: cardWidth - 12 },
          stroke: '#1e293b',
          strokeThickness: 2,
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: '#000000',
            blur: 4,
            fill: true,
          },
        })
        .setOrigin(0.5);
      container.add(frontNumber);
      (container as any).frontNumber = frontNumber;
      container.setSize(cardWidth, cardHeight);
      container.setInteractive({ draggable: true, useHandCursor: true });
      this.input.setDraggable(container);
      
      // Effets de survol et d'interaction
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 200,
          ease: 'Power2',
        });
        container.setDepth(10);
      });
      
      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Power2',
        });
        container.setDepth(1);
      });
      
      container.on('dragstart', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.1,
          scaleY: 1.1,
          duration: 150,
          ease: 'Back.easeOut',
        });
        container.setAlpha(0.8);
        container.setDepth(20);
      });
      
      container.on('dragend', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Back.easeOut',
        });
        container.setAlpha(1);
        container.setDepth(1);
      });
      
      // Double-clic : ramener la carte à la ligne du bas
      container.setData('originalX', x);
      container.setData('originalY', y);
      container.setData('lastClick', 0);
      container.on('pointerdown', () => {
        const now = this.time.now;
        const lastClick = container.getData('lastClick') || 0;
        if (now - lastClick < 350) {
          (container as any).slotIndex = undefined;
          this.tweens.add({
            targets: container,
            x: container.getData('originalX'),
            y: container.getData('originalY'),
            duration: 300,
            ease: 'Back.easeOut',
          });
        }
        container.setData('lastClick', now);
      });
      return container;
    });
    this.input.on(
      'drop',
      (_pointer: any, gameObject: CardContainer, dropZone: any) => {
        // Vérifier si une autre carte occupe déjà cette zone
        const occupant = this.cards.find(
          (card) => card.slotIndex === dropZone.index && card !== gameObject
        );
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
            ease: 'Back.easeOut',
          });

          this.tweens.add({
            targets: occupant,
            x: tempX,
            y: tempY,
            duration: 300,
            ease: 'Back.easeOut',
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
            ease: 'Back.easeOut',
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
          ease: 'Power2',
        });

        // Vérifier si toutes les cartes sont placées pour activer le bouton
        this.updateValidateButton();
      }
    );

    this.input.on(
      'dragenter',
      (_pointer: any, _gameObject: any, dropZone: any) => {
        // Effet visuel amélioré pour la zone de drop
        this.tweens.add({
          targets: dropZone,
          alpha: 0.7,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 200,
          ease: 'Power2',
        });
      }
    );

    this.input.on(
      'dragleave',
      (_pointer: any, _gameObject: any, dropZone: any) => {
        // Restaurer l'état normal de la zone
        this.tweens.add({
          targets: dropZone,
          alpha: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Power2',
        });
      }
    );

    // (Instructions sous les slots supprimées)

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

    // Fond du bouton moderne avec gradient et effets
    const buttonBg = this.add.graphics();
    
    // Ombre portée élégante
    buttonBg.fillStyle(0x1e293b, 0.3);
    buttonBg.fillRoundedRect(-102, -27, 204, 54, 30);
    
    // Gradient principal du bouton
    buttonBg.fillGradientStyle(
      0x10b981,
      0x10b981,
      0x059669,
      0x059669,
      1,
      1,
      0,
      0
    );
    buttonBg.fillRoundedRect(-100, -25, 200, 50, 28);
    
    // Bordure brillante
    buttonBg.lineStyle(2, 0xffffff, 0.8);
    buttonBg.strokeRoundedRect(-100, -25, 200, 50, 28);
    
    // Reflet sur le haut du bouton
    buttonBg.fillStyle(0xffffff, 0.2);
    buttonBg.fillRoundedRect(-96, -21, 192, 15, 25);

    // Texte du bouton moderne
    const buttonText = this.add
      .text(0, 0, '✅ Valider mon ordre', {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontStyle: 'bold',
        stroke: '#065f46',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true,
        },
      })
      .setOrigin(0.5);

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
      ease: 'Back.easeOut',
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
        },
      });
    });

    // Effet hover amélioré
    this.validateButton.on('pointerover', () => {
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 200,
        ease: 'Back.easeOut',
      });
    });

    this.validateButton.on('pointerout', () => {
      this.tweens.add({
        targets: this.validateButton,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut',
      });
    });

    // Désactiver le bouton initialement
    this.updateValidateButton();
  }

  private updateValidateButton() {
    if (!this.validateButton) return;

    // Vérifier si toutes les cartes sont placées
    const placedCards = this.cards.filter(
      (card) => card.slotIndex !== undefined
    );
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
        yoyo: true,
      });

      this.validateButton.setInteractive({ useHandCursor: true });

      // Changer la couleur pour indiquer qu'il est prêt
      const buttonBg = this.validateButton
        .list[0] as Phaser.GameObjects.Graphics;
      buttonBg.clear();
      buttonBg.fillGradientStyle(
        0x10b981,
        0x10b981,
        0x059669,
        0x059669,
        1,
        1,
        0,
        0
      );
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
        ease: 'Sine.easeInOut',
      });
    } else {
      // Désactiver le bouton
      this.tweens.add({
        targets: this.validateButton,
        alpha: 0.6,
        duration: 200,
        ease: 'Power2',
      });

      this.validateButton.disableInteractive();

      // Changer la couleur pour indiquer qu'il n'est pas prêt
      const buttonBg = this.validateButton
        .list[0] as Phaser.GameObjects.Graphics;
      buttonBg.clear();
      buttonBg.fillGradientStyle(
        0x6b7280,
        0x6b7280,
        0x4b5563,
        0x4b5563,
        1,
        1,
        0,
        0
      );
      buttonBg.fillRoundedRect(-100, -25, 200, 50, 25);
      buttonBg.lineStyle(3, 0x9ca3af, 1);
      buttonBg.strokeRoundedRect(-100, -25, 200, 50, 25);
    }
  }

  private checkWin() {
    if (this.gameComplete) return;

    // Vérifier que toutes les cartes sont placées
    const placedCards = this.cards.filter(
      (card) => card.slotIndex !== undefined
    );
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
    const normalizedOrder = order.map((text) =>
      text.replace(/\n/g, ' ').trim()
    );
    const normalizedCorrect = correctStoryOrder.map((text) =>
      text.replace(/\n/g, ' ').trim()
    );
    const isCorrect = normalizedOrder.every(
      (cardText, index) => cardText === normalizedCorrect[index]
    );

    // Debug temporaire pour voir le problème
    console.log('🎯 Vérification ordre:', {
      'Ordre actuel brut': order,
      'Ordre correct brut': correctStoryOrder,
      'Ordre normalisé': normalizedOrder,
      'Correct normalisé': normalizedCorrect,
      'Est correct': isCorrect,
    });

    // Afficher le message avec design moderne
    const { width } = this.scale;
    let successMessage = 'Bravo ! Jonas a obéi à Dieu.';
    let badgeName = 'Ami des Prophètes';

    // Adapter le message selon la leçon
    if (this.lessonData && isCorrect) {
      const lessonId = this.lessonData.id || '';
      if (lessonId.startsWith('adam_eve')) {
        successMessage = "Bravo ! Tu as compris l'histoire d'Adam et Ève.";
        badgeName = 'Gardien du Jardin';
      } else if (lessonId.startsWith('cain_abel')) {
        successMessage =
          "Bravo ! Tu as reconstitué l'histoire de Caïn et Abel.";
        badgeName = 'Gardien de mon frère';
      } else if (lessonId === 'creation_01') {
        successMessage = 'Bravo ! Tu as retracé les 7 jours de la Création !';
        badgeName = 'Témoin de la Création';
      } else
        switch (lessonId) {
          case 'creation_world':
            successMessage = 'Bravo ! Tu as retracé la création du monde.';
            badgeName = 'Témoin de la Création';
            break;
          case 'jonas_02_fuite':
            successMessage = 'Bravo ! Tu as reconstitué la fuite de Jonas.';
            badgeName = 'Navigateur sage';
            break;
          case 'jonas_03_ninive':
            successMessage = "Bravo ! Ninive s'est convertie grâce à toi.";
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
            successMessage = "Bravo ! Tu as compris l'histoire d'Adam et Ève.";
            badgeName = 'Gardien du Jardin';
            break;
          case 'moise_01':
            successMessage = "Bravo ! Tu as retracé l'Exode d'Israël.";
            badgeName = "Libérateur d'Israël";
            break;
          case 'noe_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Noé et l'arche.";
            badgeName = "Navigateur de l'Alliance";
            break;
          case 'babel_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de la Tour de Babel.";
            badgeName = 'Maître des Langues';
            break;
          case 'abraham_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire d'Abraham et de l'alliance.";
            badgeName = "Fils d'Abraham";
            break;
          case 'isaac_sacrifice_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire du sacrifice d'Isaac.";
            badgeName = 'Témoin de la Foi';
            break;
          case 'isaac_mariage_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire d'Isaac et Rebecca.";
            badgeName = 'Héritier de la Promesse';
            break;
          case 'jacob_esau_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Jacob et Ésaü.";
            badgeName = 'Maître de la Réconciliation';
            break;
          case 'jacob_songe_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire du songe de Jacob.";
            badgeName = 'Témoin de l\'Échelle';
            break;
          case 'joseph_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Joseph en Égypte.";
            badgeName = 'Maître du Pardon';
            break;
          case 'commandements_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire des Dix Commandements.";
            badgeName = 'Gardien de la Loi';
            break;
          case 'gedeon_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Gédéon et des 300 hommes.";
            badgeName = 'Vaillant Héros';
            break;
          case 'moise_buisson_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de l'appel de Moïse.";
            badgeName = "Témoin de l'Appel";
            break;
          case 'plaies_egypte_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire des dix plaies d'Égypte.";
            badgeName = 'Témoin de la Puissance';
            break;
          case 'mer_rouge_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de la traversée de la mer Rouge.";
            badgeName = 'Témoin du Miracle';
            break;
          case 'samson_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Samson et Dalila.";
            badgeName = 'Témoin de la Force';
            break;
          case 'salomon_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de Salomon et le Temple.";
            badgeName = 'Témoin de la Sagesse';
            break;
          case 'elie_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire d'Élie et les prophètes de Baal.";
            badgeName = 'Témoin du Feu';
            break;
          case 'ezechiel_01':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire d'Ézéchiel et les ossements desséchés.";
            badgeName = 'Témoin de la Résurrection';
            break;
          case 'naissance_jesus':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de la naissance de Jésus.";
            badgeName = 'Témoin de Noël';
            break;

          case 'enfance_jesus':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire de l'enfance de Jésus au temple.";
            badgeName = 'Étudiant du Temple';
            break;

          case 'bapteme_jesus':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire du baptême de Jésus.";
            badgeName = 'Témoin du Baptême';
            break;

          case 'tentations_jesus':
            successMessage =
              "Bravo ! Tu as reconstitué l'histoire des tentations de Jésus.";
            badgeName = 'Vainqueur des Tentations';
            break;
          default:
            // Garder le message par défaut
            break;
        }
    }

    const message = isCorrect
      ? successMessage
      : "Regarde bien l'histoire, essaie encore.";

    const messageColor = isCorrect ? '#10b981' : '#ef4444';
    const bgColor = isCorrect ? 0x10b981 : 0xef4444;

    // Créer un fond pour le message
    const messageBg = this.add.graphics();
    messageBg.fillStyle(bgColor, 0.1);
    messageBg.fillRoundedRect(width / 2 - 200, 100, 400, 80, 20);
    messageBg.lineStyle(3, parseInt(messageColor.replace('#', ''), 16), 1);
    messageBg.strokeRoundedRect(width / 2 - 200, 100, 400, 80, 20);

    const messageText = this.add
      .text(width / 2, 90, message, {
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
          fill: true,
        },
      })
      .setOrigin(0.5)
      .setDepth(10)
      .setAlpha(0);

    // Animation d'entrée du message
    this.tweens.add({
      targets: [messageBg, messageText],
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut',
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
        repeat: 2,
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
          delay: Math.random() * 500,
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
    return this.add
      .rectangle(0, 0, 180, 240, color)
      .setStrokeStyle(2, 0x6b7280);
  }

  // Fonction flipCard supprimée - plus nécessaire car tout le texte est visible
}
