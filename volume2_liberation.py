# -*- coding: utf-8 -*-
"""
Volume 2 : Libération – Sortie d'Égypte et formation du peuple
Version Louis Segond 1910 – Adaptée pour enfants
"""
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import cm

pdf_path = "Liberation_-_Sortie_d_Egypte_et_formation_du_peuple.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=A4,
                        rightMargin=2*cm, leftMargin=2*cm,
                        topMargin=2*cm, bottomMargin=2*cm)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Titre", alignment=TA_CENTER, fontSize=18,
                          spaceAfter=12, textColor=colors.darkred))
styles.add(ParagraphStyle(name="SousTitre", alignment=TA_CENTER, fontSize=13,
                          spaceAfter=10, textColor=colors.grey))
styles.add(ParagraphStyle(name="Texte", fontSize=11, leading=15, spaceAfter=8))
styles.add(ParagraphStyle(name="Verset", fontSize=10, leading=13,
                          leftIndent=15, textColor=colors.darkgreen))
styles.add(ParagraphStyle(name="Section", fontSize=14,
                          textColor=colors.darkblue, spaceAfter=6, spaceBefore=10))

story = []
story.append(Paragraph("🔥 Libération", styles["Titre"]))
story.append(Paragraph("Sortie d'Égypte et formation du peuple (1250–1200 av. J.-C.)",
                       styles["SousTitre"]))
story.append(PageBreak())

# ------------- Données des 8 leçons -----------------
lessons = [
{
 "titre":"Moïse et le buisson ardent","ref":"Exode 3",
 "histoire":"Moïse gardait les brebis au mont Horeb quand un buisson brûla sans se consumer. Dieu l'appela et lui confia la mission de libérer Israël.",
 "versets":[("Exode 3 :2","L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson."),
            ("Exode 3 :10","Viens, je t'enverrai vers Pharaon, et tu feras sortir d'Égypte mon peuple.")],
 "vocab":[("Buisson ardent","Signe visible de la présence de Dieu."),
          ("Appel","Mission donnée par Dieu."),
          ("Libération","Action de Dieu pour délivrer son peuple."),
          ("Sainteté","Pureté et gloire de Dieu.")],
 "sens":"Dieu voit la souffrance de son peuple et appelle Moïse pour être l'instrument de sa délivrance.",
 "questions":["Que montre le feu qui ne brûle pas ?","Pourquoi Dieu choisit-il Moïse ?"]
},
{
 "titre":"Les dix plaies d'Égypte","ref":"Exode 7–12",
 "histoire":"Pharaon refusa d'obéir à Dieu. Alors l'Éternel envoya dix plaies : sang, grenouilles, moustiques, mouches, peste, ulcères, grêle, sauterelles, ténèbres et mort des premiers-nés. Enfin Israël fut libéré.",
 "versets":[("Exode 7 :5","Les Égyptiens sauront que je suis l'Éternel, quand j'étendrai ma main sur l'Égypte."),
            ("Exode 12 :31","Pharaon dit : Sortez du milieu de mon peuple !")],
 "vocab":[("Pharaon","Roi d'Égypte, symbole d'orgueil."),
          ("Plaies","Châtiments envoyés par Dieu."),
          ("Jugement","Action de Dieu contre le mal."),
          ("Libération","Délivrance du peuple esclave.")],
 "sens":"Dieu montre qu'Il est maître sur toute la création ; rien ne peut empêcher sa volonté de sauver.",
 "questions":["Pourquoi Dieu a-t-Il envoyé les plaies ?","Que nous apprend la patience de Moïse ?"]
},
{
 "titre":"Passage de la mer Rouge","ref":"Exode 14",
 "histoire":"Poursuivis par l'armée de Pharaon, les Israélites furent sauvés quand Dieu ouvrit la mer ; ils traversèrent à sec et les Égyptiens furent engloutis.",
 "versets":[("Exode 14 :21","Moïse étendit sa main sur la mer ; l'Éternel refoula la mer par un vent d'orient toute la nuit."),
            ("Exode 14 :29","Les enfants d'Israël marchèrent à sec au milieu de la mer.")],
 "vocab":[("Mer Rouge","Mer séparée miraculeusement."),
          ("Foi","Confiance totale en Dieu."),
          ("Miracle","Acte surnaturel de Dieu.")],
 "sens":"Le passage de la mer est le signe que Dieu ouvre toujours un chemin pour ceux qui croient.",
 "questions":["Qu'a fait Dieu pour sauver son peuple ?","Que t'enseigne ce miracle ?"]
},
{
 "titre":"Les Dix Commandements","ref":"Exode 20",
 "histoire":"Au mont Sinaï, Dieu donna dix paroles : aimer Dieu, respecter ses parents, ne pas tuer, ne pas voler, ne pas mentir. Ces lois guident la vie de son peuple.",
 "versets":[("Exode 20 :1-3","Dieu prononça toutes ces paroles, disant : Je suis l'Éternel ton Dieu… Tu n'auras pas d'autres dieux.")],
 "vocab":[("Commandement","Règle donnée par Dieu."),
          ("Alliance","Lien sacré entre Dieu et son peuple."),
          ("Obéissance","Mettre la Parole en pratique.")],
 "sens":"Les commandements sont un signe d'amour : Dieu montre comment vivre dans la paix avec Lui et avec les autres.",
 "questions":["Pourquoi Dieu a-t-Il donné des commandements ?","Quel est le plus important pour toi ?"]
},
{
 "titre":"Le Tabernacle","ref":"Exode 25-40",
 "histoire":"Dieu demanda à Moïse de bâtir une tente sacrée où Il habiterait au milieu du peuple. Quand elle fut terminée, la nuée de la gloire divine la remplit.",
 "versets":[("Exode 25 :8","Ils me feront un sanctuaire, et j'habiterai au milieu d'eux."),
            ("Exode 40 :34","La nuée couvrit la tente d'assignation, et la gloire de l'Éternel remplit le tabernacle.")],
 "vocab":[("Tabernacle","Tente de la présence de Dieu."),
          ("Présence divine","Dieu vivant parmi son peuple."),
          ("Sainteté","Pureté et respect de Dieu.")],
 "sens":"Dieu désire habiter au milieu de ceux qui Lui obéissent ; Il n'est pas loin de nous.",
 "questions":["Pourquoi Dieu voulait-Il un sanctuaire ?","Comment peux-tu sentir la présence de Dieu ?"]
},
{
 "titre":"Le Veau d'or","ref":"Exode 32",
 "histoire":"Pendant que Moïse recevait la Loi, le peuple se fit un veau d'or et l'adora. Moïse, en colère, brisa les tables. Dieu pardonna, mais rappela que l'idolâtrie éloigne de Lui.",
 "versets":[("Exode 32 :4","Voici ton dieu, Israël, qui t'a fait sortir du pays d'Égypte !"),
            ("Exode 32 :19","Moïse jeta les tables et les brisa au pied de la montagne.")],
 "vocab":[("Idole","Objet adoré à la place de Dieu."),
          ("Infidélité","Oublier Dieu après sa bénédiction."),
          ("Pardon","Grâce donnée à celui qui se repent.")],
 "sens":"Dieu veut un cœur fidèle. Le pardon est toujours possible pour celui qui revient à Lui.",
 "questions":["Pourquoi le peuple a-t-il fabriqué une idole ?","Que fait Dieu quand nous nous égarons ?"]
},
{
 "titre":"Le Serpent d'airain","ref":"Nombres 21 :4-9",
 "histoire":"Les Israélites murmurèrent contre Dieu ; Il envoya des serpents brûlants. Moïse fit un serpent d'airain : ceux qui le regardaient avec foi étaient guéris.",
 "versets":[("Nombres 21 :8-9","Fais-toi un serpent brûlant et place-le sur une perche ; quiconque le regardera conservera la vie.")],
 "vocab":[("Airain","Métal ancien : bronze."),
          ("Foi","Confiance en Dieu et en sa parole."),
          ("Guérison","Vie rendue par la foi.")],
 "sens":"Dieu guérit ceux qui tournent leur regard vers Lui ; ce signe annonce le salut en Jésus.",
 "questions":["Pourquoi Dieu a-t-Il envoyé les serpents ?","Que représente le serpent d'airain ?"]
},
{
 "titre":"La Terre promise – Vision de Moïse","ref":"Deutéronome 34",
 "histoire":"Du mont Nebo, Moïse contempla la Terre promise avant de mourir. Il ne put y entrer, mais vit que Dieu avait tenu sa promesse.",
 "versets":[("Deutéronome 34 :1","Moïse monta sur le mont Nebo et l'Éternel lui fit voir tout le pays."),
            ("Deutéronome 34 :4","Je te fais voir ce pays, mais tu n'y entreras point.")],
 "vocab":[("Terre promise","Pays donné par Dieu à Abraham."),
          ("Espérance","Confiance que Dieu accomplit ses promesses."),
          ("Fidélité","Constance de Dieu envers son peuple.")],
 "sens":"Dieu accomplit toujours ce qu'Il promet ; Il conduit ses enfants jusqu'à la vraie terre promise : la vie éternelle.",
 "questions":["Que ressent Moïse en voyant le pays ?","Que t'enseigne cette promesse ?"]
}
]

# -------- génération du contenu ----------
for l in lessons:
    story.append(Paragraph("🔥 " + l["titre"], styles["Section"]))
    story.append(Paragraph("📖 " + l["ref"], styles["Texte"]))
    story.append(Paragraph(l["histoire"], styles["Texte"]))
    for ref, txt in l["versets"]:
        story.append(Paragraph(ref + " — " + txt, styles["Verset"]))
    data = [["Mot","Définition"]] + l["vocab"]
    table = Table(data, colWidths=[4*cm,10*cm])
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
                               ('GRID',(0,0),(-1,-1),0.5,colors.grey)]))
    story.append(table)
    story.append(Paragraph("⚖️ " + l["sens"], styles["Texte"]))
    for q in l["questions"]:
        story.append(Paragraph("💬 " + q, styles["Texte"]))
    story.append(PageBreak())

# conclusion
story.append(Paragraph("🕊️ Conclusion", styles["Section"]))
story.append(Paragraph(
"Dieu libère son peuple de l'esclavage et l'appelle à marcher dans la foi. "
"Il délivre encore aujourd'hui ceux qui Lui font confiance. "
"Jésus est notre libérateur, comme Moïse fut celui d'Israël.", styles["Texte"]))

doc.build(story)
print("✅ PDF créé :", pdf_path)