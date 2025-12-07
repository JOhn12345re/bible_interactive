// Base de données locale des versets bibliques pour le fallback
// Cette base est utilisée lorsque l'API externe n'est pas disponible

export const KEY_VERSES: Record<string, string> = {
  // Genèse
  'genese_1_1': 'Au commencement, Dieu créa les cieux et la terre.',
  'genese_1_27': 'Dieu créa l\'homme à son image, il le créa à l\'image de Dieu, il créa l\'homme et la femme.',
  'genese_2_7': 'L\'Éternel Dieu forma l\'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie et l\'homme devint un être vivant.',
  'genese_3_6': 'La femme vit que l\'arbre était bon à manger, agréable à regarder, et que l\'arbre était précieux pour ouvrir l\'intelligence. Elle prit de son fruit, et en mangea ; elle en donna aussi à son mari, qui était avec elle, et il en mangea.',
  'genese_6_13': 'Dieu dit à Noé : La fin de toute chair est arrêtée devant moi ; car la terre est pleine de violence à cause d\'eux ; voici, je vais les détruire avec la terre.',
  'genese_12_1': 'L\'Éternel dit à Abram : Va-t\'en de ton pays, de ta patrie et de la maison de ton père, vers le pays que je te montrerai.',
  'genese_12_2': 'Je ferai de toi une grande nation, et je te bénirai ; je rendrai ton nom grand, et tu seras une source de bénédiction.',
  'genese_22_1': 'Après ces choses, Dieu mit Abraham à l\'épreuve, et lui dit : Abraham ! Et il répondit : Me voici !',
  'genese_28_15': 'Voici, je suis avec toi, je te garderai partout où tu iras, et je te ramènerai dans ce pays ; car je ne t\'abandonnerai point, que je n\'aie exécuté ce que je te dis.',
  'genese_37_28': 'Ils vendirent Joseph aux Ismaélites pour vingt pièces d\'argent. Et ils emmenèrent Joseph en Égypte.',
  'genese_45_7': 'Dieu m\'a envoyé devant vous pour préserver la vie, afin de vous conserver un reste sur la terre et de vous sauver par une grande délivrance.',
  'genese_50_20': 'Vous aviez médité de me faire du mal : Dieu l\'a changé en bien, pour accomplir ce qui arrive aujourd\'hui, pour sauver la vie à un peuple nombreux.',

  // Exode
  'exode_3_14': 'Dieu dit à Moïse : Je suis celui qui suis. Et il ajouta : C\'est ainsi que tu répondras aux enfants d\'Israël : Celui qui s\'appelle "je suis" m\'a envoyé vers vous.',
  'exode_14_13': 'Moïse répondit au peuple : Ne craignez rien, restez en place, et voyez la délivrance que l\'Éternel vous donnera aujourd\'hui.',
  'exode_20_2': 'Je suis l\'Éternel, ton Dieu, qui t\'ai fait sortir du pays d\'Égypte, de la maison de servitude.',
  'exode_20_3': 'Tu n\'auras pas d\'autres dieux devant ma face.',
  'exode_20_12': 'Honore ton père et ta mère, afin que tes jours se prolongent dans le pays que l\'Éternel, ton Dieu, te donne.',

  // Lévitique
  'levitique_19_18': 'Tu ne te vengeras point, et tu ne garderas point de rancune contre les enfants de ton peuple. Tu aimeras ton prochain comme toi-même. Je suis l\'Éternel.',

  // Nombres
  'nombres_6_24': 'Que l\'Éternel te bénisse, et qu\'il te garde !',
  'nombres_6_25': 'Que l\'Éternel fasse luire sa face sur toi, et qu\'il t\'accorde sa grâce !',
  'nombres_6_26': 'Que l\'Éternel tourne sa face vers toi, et qu\'il te donne la paix !',

  // Deutéronome
  'deuteronome_6_4': 'Écoute, Israël ! L\'Éternel, notre Dieu, est le seul Éternel.',
  'deuteronome_6_5': 'Tu aimeras l\'Éternel, ton Dieu, de tout ton cœur, de toute ton âme et de toute ta force.',
  'deuteronome_31_6': 'Fortifiez-vous et ayez du courage ! Ne craignez point et ne soyez point effrayés devant eux ; car l\'Éternel, ton Dieu, marchera lui-même avec toi, il ne te délaissera point, il ne t\'abandonnera point.',

  // Josué
  'josue_1_9': 'Ne t\'ai-je pas donné cet ordre : Fortifie-toi et prends courage ? Ne t\'effraie point et ne t\'épouvante point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.',
  'josue_24_15': 'Moi et ma maison, nous servirons l\'Éternel.',

  // Psaumes
  'psaumes_23_1': 'L\'Éternel est mon berger : je ne manquerai de rien.',
  'psaumes_23_4': 'Quand je marche dans la vallée de l\'ombre de la mort, Je ne crains aucun mal, car tu es avec moi : Ta houlette et ton bâton me rassurent.',
  'psaumes_27_1': 'L\'Éternel est ma lumière et mon salut : De qui aurais-je crainte ? L\'Éternel est le soutien de ma vie : De qui aurais-je peur ?',
  'psaumes_46_1': 'Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.',
  'psaumes_119_105': 'Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.',
  'psaumes_121_1': 'Je lève mes yeux vers les montagnes... D\'où me viendra le secours ?',
  'psaumes_121_2': 'Le secours me vient de l\'Éternel, Qui a fait les cieux et la terre.',

  // Proverbes
  'proverbes_3_5': 'Confie-toi en l\'Éternel de tout ton cœur, Et ne t\'appuie pas sur ta sagesse.',
  'proverbes_3_6': 'Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.',
  'proverbes_16_3': 'Recommande à l\'Éternel tes œuvres, Et tes projets réussiront.',
  'proverbes_18_10': 'Le nom de l\'Éternel est une tour forte ; Le juste s\'y réfugie, et se trouve en sûreté.',

  // Esaïe
  'esaie_9_6': 'Car un enfant nous est né, un fils nous est donné, Et la domination reposera sur son épaule ; On l\'appellera Admirable, Conseiller, Dieu puissant, Père éternel, Prince de la paix.',
  'esaie_40_31': 'Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.',
  'esaie_41_10': 'Ne crains rien, car je suis avec toi ; Ne promène pas des regards inquiets, car je suis ton Dieu ; Je te fortifie, je viens à ton secours, Je te soutiens de ma droite triomphante.',
  'esaie_53_5': 'Mais il était blessé pour nos péchés, Brisé pour nos iniquités ; Le châtiment qui nous donne la paix est tombé sur lui, Et c\'est par ses meurtrissures que nous sommes guéris.',

  // Jérémie
  'jeremie_29_11': 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.',
  'jeremie_33_3': 'Invoque-moi, et je te répondrai ; Je t\'annoncerai de grandes choses, des choses cachées, Que tu ne connais pas.',

  // Jonas
  'jonas_2_9': 'Pour moi, je t\'offrirai des sacrifices avec un cri d\'actions de grâces, J\'accomplirai les vœux que j\'ai faits : Le salut vient de l\'Éternel.',

  // Matthieu
  'matthieu_5_3': 'Heureux les pauvres en esprit, car le royaume des cieux est à eux !',
  'matthieu_5_4': 'Heureux les affligés, car ils seront consolés !',
  'matthieu_6_9': 'Voici donc comment vous devez prier : Notre Père qui es aux cieux ! Que ton nom soit sanctifié.',
  'matthieu_6_10': 'Que ton règne vienne ; que ta volonté soit faite sur la terre comme au ciel.',
  'matthieu_6_33': 'Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.',
  'matthieu_11_28': 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.',
  'matthieu_18_21': 'Alors Pierre s\'approcha de Jésus et lui dit : Seigneur, combien de fois pardonnerai-je à mon frère, lorsqu\'il péchera contre moi ? Jusqu\'à sept fois ?',
  'matthieu_18_22': 'Jésus lui dit : Je ne te dis pas jusqu\'à sept fois, mais jusqu\'à soixante-dix fois sept fois.',
  'matthieu_28_19': 'Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit.',
  'matthieu_28_20': 'Et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu\'à la fin du monde.',

  // Marc
  'marc_16_15': 'Puis il leur dit : Allez par tout le monde, et prêchez la bonne nouvelle à toute la création.',

  // Luc
  'luc_2_10': 'Mais l\'ange leur dit : Ne craignez point ; car voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd\'hui.',
  'luc_2_11': 'C\'est un Sauveur, qui est le Christ, le Seigneur.',
  'luc_2_14': 'Gloire à Dieu dans les lieux très hauts, Et paix sur la terre parmi les hommes qu\'il agrée !',
  'luc_2_20': 'Les bergers s\'en retournèrent, glorifiant et louant Dieu pour tout ce qu\'ils avaient entendu et vu, comme cela leur avait été annoncé.',
  'luc_6_37': 'Ne jugez point, et vous ne serez point jugés ; ne condamnez point, et vous ne serez point condamnés ; pardonnez, et vous serez pardonnés.',

  // Jean
  'jean_1_1': 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.',
  'jean_3_16': 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle.',
  'jean_14_6': 'Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.',
  'jean_14_27': 'Je vous laisse la paix, je vous donne ma paix. Je ne vous la donne pas comme le monde la donne. Que votre cœur ne se trouble point, et ne s\'alarme point.',

  // Actes
  'actes_1_8': 'Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu\'aux extrémités de la terre.',

  // Romains
  'romains_8_28': 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.',
  'romains_10_9': 'Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l\'a ressuscité des morts, tu seras sauvé.',
  'romains_12_2': 'Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l\'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.',
  'romains_15_13': 'Que le Dieu de l\'espérance vous remplisse de toute joie et paix dans la foi, afin que vous abondiez en espérance par la puissance du Saint-Esprit.',

  // 1 Corinthiens
  '1_corinthiens_13_4': 'La charité est patiente, elle est pleine de bonté ; la charité n\'est point envieuse ; la charité ne se vante point, elle ne s\'enfle point d\'orgueil.',
  '1_corinthiens_13_13': 'Maintenant donc ces trois choses demeurent : la foi, l\'espérance, la charité ; mais la plus grande de ces choses, c\'est la charité.',

  // Galates
  'galates_5_22': 'Mais le fruit de l\'Esprit, c\'est l\'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité,',
  'galates_5_23': 'la douceur, la tempérance ; la loi n\'est pas contre ces choses.',

  // Éphésiens
  'ephesiens_2_8': 'Car c\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de Dieu.',
  'ephesiens_6_11': 'Revêtez-vous de toutes les armes de Dieu, afin de pouvoir tenir ferme contre les ruses du diable.',

  // Philippiens
  'philippiens_4_4': 'Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.',
  'philippiens_4_6': 'Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.',
  'philippiens_4_13': 'Je puis tout par celui qui me fortifie.',

  // Colossiens
  'colossiens_3_23': 'Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes.',

  // 1 Thessaloniciens
  '1_thessaloniciens_5_16': 'Soyez toujours joyeux.',
  '1_thessaloniciens_5_17': 'Priez sans cesse.',
  '1_thessaloniciens_5_18': 'Rendez grâces en toutes choses, car c\'est à votre égard la volonté de Dieu en Jésus-Christ.',

  // Hébreux
  'hebreux_11_1': 'Or la foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit pas.',
  'hebreux_13_8': 'Jésus-Christ est le même hier, aujourd\'hui, et éternellement.',

  // Jacques
  'jacques_1_5': 'Si quelqu\'un d\'entre vous manque de sagesse, qu\'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.',

  // 1 Pierre
  '1_pierre_5_7': 'Et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.',

  // 1 Jean
  '1_jean_1_9': 'Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.',
  '1_jean_4_8': 'Celui qui n\'aime pas n\'a pas connu Dieu, car Dieu est amour.',

  // Apocalypse
  'apocalypse_3_20': 'Voici, je me tiens à la porte, et je frappe. Si quelqu\'un entend ma voix et ouvre la porte, j\'entrerai chez lui, je souperai avec lui, et lui avec moi.',
  'apocalypse_21_4': 'Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n\'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.'
};

export function getLocalVerse(book: string, chapter: number, verse: number): string | null {
  // Normaliser le nom du livre (supprimer accents, espaces, etc.)
  const normalizedBook = book
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/ /g, '_') // Remplacer espaces par underscores
    .replace(/[^a-z0-9_]/g, ''); // Garder uniquement lettres, chiffres et underscores

  const key = `${normalizedBook}_${chapter}_${verse}`;
  
  return KEY_VERSES[key] || null;
}
