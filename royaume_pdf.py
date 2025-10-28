# -*- coding: utf-8 -*-
"""
Volume 4 : Royaume — De Saül à Salomon
Version Louis Segond 1910 – Adaptée pour enfants
Génère : Royaume_-_De_Saul_a_Salomon.pdf
Dépendances : reportlab, requests
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import cm
import io, requests

# ---------- CONFIG DOCUMENT ----------
PDF_NAME = "Royaume_-_De_Saul_a_Salomon.pdf"
doc = SimpleDocTemplate(
    PDF_NAME,
    pagesize=A4,
    rightMargin=2*cm, leftMargin=2*cm,
    topMargin=2*cm, bottomMargin=2*cm
)

# ---------- STYLES ----------
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Titre", alignment=TA_CENTER, fontSize=18,
                          spaceAfter=12, textColor=colors.darkblue))
styles.add(ParagraphStyle(name="SousTitre", alignment=TA_CENTER, fontSize=13,
                          spaceAfter=10, textColor=colors.grey))
styles.add(ParagraphStyle(name="Texte", fontSize=11, leading=15, spaceAfter=8))
styles.add(ParagraphStyle(name="Verset", fontSize=10, leading=13,
                          leftIndent=15, textColor=colors.darkgreen))
styles.add(ParagraphStyle(name="Section", fontSize=14,
                          textColor=colors.darkred, spaceAfter=6, spaceBefore=10))

story = []

# ---------- COUVERTURE ----------
story.append(Spacer(1, 2.5*cm))
story.append(Paragraph("👑 Royaume — De Saül à Salomon", styles["Titre"]))
story.append(Paragraph("Histoire du Royaume d'Israël : fidélité, sagesse et promesse messianique", styles["SousTitre"]))

# Image de couverture (Pixabay - libre de droits)
cover_url = "https://cdn.pixabay.com/photo/2017/03/27/14/56/bible-2178590_1280.jpg"
try:
    cover_img = io.BytesIO(requests.get(cover_url, timeout=20).content)
    story.append(Image(cover_img, width=14*cm, height=9*cm))
except Exception:
    # Si l'image ne se télécharge pas, on laisse la couverture sans image
    story.append(Spacer(1, 9*cm))

story.append(PageBreak())

# ---------- AVERTISSEMENT (sources) ----------
warn = """
<b>Sources et droits :</b><br/>
• Texte biblique : Louis Segond 1910 — domaine public.<br/>
• Images : Pixabay — libres de droits pour usage éducatif / non commercial.<br/>
• Ce document est créé pour le projet <i>Bible Interactive</i>, à des fins pédagogiques.
"""
story.append(Paragraph(warn, styles["Texte"]))
story.append(PageBreak())

# ---------- INTRODUCTION ----------
intro = """
Ce volume raconte l'histoire du Royaume d'Israël, de Saül à Salomon. 
Il montre comment Dieu choisit des cœurs fidèles plutôt que des apparences, 
et comment la sagesse conduit à la paix et à la justice. 
À travers les victoires, les chutes et les appels à la repentance, 
Dieu demeure fidèle à ses promesses.
"""
story.append(Paragraph("🎚️ Introduction", styles["Section"]))
story.append(Paragraph(intro, styles["Texte"]))
story.append(PageBreak())

# ===================== PARTIE 2 : LECONS + CONCLUSION =====================

# Images libres de droits (Pixabay) pour chaque leçon
images = [
 "https://cdn.pixabay.com/photo/2016/03/27/21/16/bible-1280.jpg",     # Peuple demande un roi
 "https://cdn.pixabay.com/photo/2018/06/19/09/02/king-3480231_1280.jpg", # Saül
 "https://cdn.pixabay.com/photo/2019/05/01/18/19/stone-4175363_1280.jpg", # David et Goliath
 "https://cdn.pixabay.com/photo/2017/01/10/13/29/friendship-1969829_1280.jpg", # David & Jonathan
 "https://cdn.pixabay.com/photo/2020/03/14/18/48/cave-4930420_1280.jpg", # Fuite de David
 "https://cdn.pixabay.com/photo/2016/01/30/19/51/crown-1175870_1280.jpg", # David roi
 "https://cdn.pixabay.com/photo/2015/03/27/19/39/sanctuary-695887_1280.jpg", # Arche à Jérusalem
 "https://cdn.pixabay.com/photo/2017/05/05/22/37/bible-2280454_1280.jpg", # Promesse à David
 "https://cdn.pixabay.com/photo/2017/04/06/09/10/wisdom-2203511_1280.jpg", # Salomon sagesse
 "https://cdn.pixabay.com/photo/2018/05/29/21/22/temple-3434964_1280.jpg"  # Construction du Temple
]

# 10 leçons détaillées
lessons = [
{
 "titre":"📣 Le peuple demande un roi","ref":"1 Samuel 8",
 "texte":"""Les anciens d'Israël vinrent trouver le prophète Samuel et dirent : « Établis sur nous un roi pour nous juger comme en ont toutes les nations. » 
Samuel fut attristé ; il pria l'Éternel, qui répondit : « Ce n'est pas toi qu'ils rejettent, c'est moi qu'ils rejettent, afin que je ne règne plus sur eux. »
Ainsi commença l'époque des rois en Israël.""",
 "versets":[("1 Samuel 8 : 7","Ce n'est pas toi qu'ils rejettent, mais c'est moi qu'ils rejettent, afin que je ne règne plus sur eux.")],
 "vocab":[("Prophète","Messager de Dieu."),
          ("Roi","Chef politique et militaire du peuple."),
          ("Rejet","Refus d'obéir à Dieu.")],
 "sens":"Dieu veut régner dans nos cœurs, mais il laisse l'homme libre de choisir son propre roi.",
 "questions":["Pourquoi Israël voulait-il un roi ?","Comment Dieu a-t-il réagi à cette demande ?"]
},
{
 "titre":"👑 Saül, premier roi d'Israël","ref":"1 Samuel 9–15",
 "texte":"""Saül, homme grand et vaillant de la tribu de Benjamin, fut choisi par Dieu et oint par Samuel. 
Au début, il régna avec humilité et courage, mais il désobéit aux ordres divins. 
Son orgueil le fit rejeter du trône, et Dieu choisit un autre homme selon son cœur.""",
 "versets":[("1 Samuel 10 : 1","Samuel prit une fiole d'huile, la répandit sur la tête de Saül et dit : L'Éternel t'a oint pour que tu sois chef sur son héritage."),
            ("1 Samuel 15 : 23","L'obstination est aussi coupable que l'idolâtrie. Parce que tu as rejeté la parole de l'Éternel, il te rejette aussi comme roi.")],
 "vocab":[("Oindre","Verser de l'huile pour consacrer."),
          ("Obéissance","Soumission à la parole de Dieu."),
          ("Orgueil","Attitude de celui qui se croit supérieur.")],
 "sens":"Dieu préfère l'obéissance à tous les sacrifices. L'orgueil ferme la porte à sa bénédiction.",
 "questions":["Quelles qualités Saül avait-il ?","Pourquoi Dieu l'a-t-il rejeté ?"]
},
{
 "titre":"🪨 David et Goliath","ref":"1 Samuel 17",
 "texte":"""Alors que l'armée d'Israël tremblait devant Goliath, géant des Philistins, le jeune berger David s'avança avec foi. 
Il prit sa fronde, lança une pierre qui frappa le géant au front, et le vainquit au nom de l'Éternel. 
Ainsi, Dieu montra que la victoire vient de Lui, non des armes.""",
 "versets":[("1 Samuel 17 : 45","Tu marches contre moi avec l'épée ; moi je marche contre toi au nom de l'Éternel."),
            ("1 Samuel 17 : 50","Ainsi, David triompha du Philistin avec une fronde et une pierre.")],
 "vocab":[("Fronde","Arme de berger pour lancer des pierres."),
          ("Foi","Confiance totale en Dieu."),
          ("Courage","Force d'agir malgré la peur.")],
 "sens":"Dieu utilise les faibles pour confondre les forts ; la foi triomphe toujours de la peur.",
 "questions":["Comment David a-t-il montré sa foi ?","Quelle leçon tires-tu de cette victoire ?"]
},
{
 "titre":"🤝 Amitié de David et Jonathan","ref":"1 Samuel 18–20",
 "texte":"""Après la victoire sur Goliath, Jonathan, fils du roi Saül, aima David comme son propre frère. 
Ils firent alliance devant Dieu et se promirent fidélité. 
Jonathan protégea David contre la jalousie de son père et sauva sa vie. Leur amitié resta un modèle d'amour sincère et fidèle.""",
 "versets":[("1 Samuel 18 : 3","Jonathan fit alliance avec David, parce qu'il l'aimait comme son âme."),
            ("1 Samuel 20 : 42","Va en paix, car nous avons juré l'un et l'autre au nom de l'Éternel.")],
 "vocab":[("Alliance","Engagement mutuel devant Dieu."),
          ("Fidélité","Attachement sincère malgré les épreuves."),
          ("Amitié","Amour fraternel pur et désintéressé.")],
 "sens":"Une amitié vraie se fonde sur Dieu et sur la loyauté du cœur.",
 "questions":["Pourquoi Jonathan a-t-il défendu David ?","Qu'est-ce qu'une amitié fidèle selon Dieu ?"]
},
{
 "titre":"🏃‍♂️ Fuite de David devant Saül","ref":"1 Samuel 23–26",
 "texte":"""Saül poursuivit David dans le désert. 
Deux fois, David eut l'occasion de le tuer, mais il refusa en disant : « Je ne porterai pas la main sur l'oint de l'Éternel. » 
Il choisit le pardon plutôt que la vengeance, laissant Dieu juger à sa place.""",
 "versets":[("1 Samuel 24 : 6","Loin de moi, par l'Éternel, de faire une telle chose à mon seigneur !"),
            ("1 Samuel 26 : 23","L'Éternel rendra à chacun selon sa justice et sa fidélité.")],
 "vocab":[("Vengeance","Volonté de rendre le mal pour le mal."),
          ("Pardon","Laisser Dieu juger à notre place."),
          ("Humilité","Reconnaissance de la grandeur de Dieu.")],
 "sens":"Le vrai courage, c'est maîtriser sa colère et faire confiance à la justice de Dieu.",
 "questions":["Pourquoi David a-t-il épargné Saül ?","Comment peux-tu répondre au mal par le bien ?"]
},
{
 "titre":"👑 David devient roi","ref":"2 Samuel 2–5",
 "texte":"""Après la mort de Saül, David fut d'abord roi sur Juda, puis sur tout Israël. 
Il établit sa capitale à Jérusalem et gouverna avec justice. 
Le peuple trouva la paix sous sa conduite, et Dieu confirma sa royauté.""",
 "versets":[("2 Samuel 5 : 3","Ils oignirent David roi sur Israël."),
            ("2 Samuel 5 : 10","David devenait de plus en plus grand, et l'Éternel, le Dieu des armées, était avec lui.")],
 "vocab":[("Royaume","Peuple gouverné par un roi."),
          ("Justice","Conduite droite selon Dieu."),
          ("Paix","Résultat de l'obéissance à Dieu.")],
 "sens":"Quand Dieu règne, la paix s'établit ; le vrai roi sert son peuple dans la justice.",
 "questions":["Comment Dieu a-t-il préparé David au trône ?","Qu'est-ce qu'un bon roi selon Dieu ?"]
},
{
 "titre":"🕍 L'Arche à Jérusalem","ref":"2 Samuel 6",
 "texte":"""David fit venir l'arche de l'alliance à Jérusalem avec chants et danses. 
L'arche symbolisait la présence de Dieu au milieu du peuple. 
David se réjouit humblement devant l'Éternel, montrant que la vraie grandeur vient de l'adoration.""",
 "versets":[("2 Samuel 6 : 14","David dansait de toute sa force devant l'Éternel."),
            ("2 Samuel 6 : 17","Ils mirent l'arche de l'Éternel à sa place au milieu de la tente que David avait dressée.")],
 "vocab":[("Arche de l'alliance","Signe de la présence divine."),
          ("Adoration","Louange joyeuse envers Dieu."),
          ("Humilité","Reconnaissance que Dieu seul est grand.")],
 "sens":"La joie devant Dieu attire sa bénédiction ; l'adoration est au cœur du Royaume.",
 "questions":["Pourquoi David a-t-il dansé devant Dieu ?","Comment montres-tu ta joie spirituelle ?"]
},
{
 "titre":"📜 Promesse de Dieu à David","ref":"2 Samuel 7",
 "texte":"""David voulut bâtir un temple à Dieu, mais l'Éternel lui promit autre chose : une dynastie éternelle. 
De sa descendance naîtrait un roi dont le règne ne finirait jamais : le Messie. 
Dieu bénit David pour son cœur sincère.""",
 "versets":[("2 Samuel 7 : 16","Ta maison et ton règne seront pour toujours assurés devant moi."),
            ("2 Samuel 7 : 28","Seigneur Éternel, tes paroles sont vérité.")],
 "vocab":[("Messie","Roi promis, accomplissement parfait."),
          ("Alliance","Engagement de Dieu envers l'homme."),
          ("Éternité","Durée infinie du règne de Dieu.")],
 "sens":"Cette promesse s'accomplit en Jésus-Christ, le Fils de David et Roi éternel.",
 "questions":["Pourquoi David voulait-il bâtir un temple ?","Comment cette promesse annonce-t-elle Jésus ?"]
},
{
 "titre":"💎 Salomon et sa sagesse","ref":"1 Rois 3",
 "texte":"""Salomon demanda à Dieu non la richesse ni la victoire, mais la sagesse pour gouverner. 
Dieu lui accorda un cœur intelligent et le rendit plus sage que tous les hommes. 
Sa réputation se répandit dans toutes les nations.""",
 "versets":[("1 Rois 3 : 9","Donne à ton serviteur un cœur intelligent pour juger ton peuple."),
            ("1 Rois 3 : 12","Je te donne un cœur sage et intelligent ; nul ne fut ni ne sera comme toi.")],
 "vocab":[("Sagesse","Compréhension juste donnée par Dieu."),
          ("Discernement","Capacité de distinguer le bien du mal."),
          ("Bénédiction","Faveur accordée par Dieu.")],
 "sens":"Dieu honore ceux qui recherchent d'abord la sagesse plutôt que la richesse.",
 "questions":["Pourquoi Salomon a-t-il plu à Dieu ?","Que peux-tu demander à Dieu avant tout ?"]
},
{
 "titre":"🏗️ Construction du Temple","ref":"1 Rois 6–8",
 "texte":"""Salomon bâtit à Jérusalem un temple magnifique pour l'Éternel, selon les plans donnés à David. 
Quand le Temple fut achevé, une nuée remplit la maison, signe que Dieu habitait parmi son peuple. 
Salomon pria et bénit Israël ; ce fut le sommet du Royaume d'Israël.""",
 "versets":[("1 Rois 8 : 10–11","La nuée remplit la maison de l'Éternel ; les sacrificateurs ne purent y rester à cause de la gloire de l'Éternel."),
            ("1 Rois 8 : 56","Béni soit l'Éternel, qui a donné du repos à son peuple.")],
 "vocab":[("Temple","Maison de Dieu à Jérusalem."),
          ("Gloire","Manifestation visible de la présence divine."),
          ("Prière","Dialogue du cœur avec Dieu.")],
 "sens":"Le Temple rappelle que Dieu veut demeurer au milieu de son peuple et dans le cœur des croyants.",
 "questions":["Pourquoi Dieu a-t-Il choisi d'habiter dans le Temple ?","Comment être toi-même une demeure pour Dieu ?"]
}
]

# Génération des leçons
for i, lesson in enumerate(lessons):
    story.append(Paragraph(lesson["titre"], styles["Section"]))
    try:
        img_data = io.BytesIO(requests.get(images[i], timeout=20).content)
        story.append(Image(img_data, width=14*cm, height=8*cm))
    except Exception:
        story.append(Spacer(1, 8*cm))
    story.append(Paragraph("📖 " + lesson["ref"], styles["Texte"]))
    story.append(Paragraph(lesson["texte"], styles["Texte"]))
    for ref, txt in lesson["versets"]:
        story.append(Paragraph(ref + " — " + txt, styles["Verset"]))
    data = [["Mot","Définition"]] + lesson["vocab"]
    table = Table(data, colWidths=[4*cm,10*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
        ('GRID',(0,0),(-1,-1),0.5,colors.grey)
    ]))
    story.append(table)
    story.append(Paragraph("⚖️ " + lesson["sens"], styles["Texte"]))
    for q in lesson["questions"]:
        story.append(Paragraph("💬 " + q, styles["Texte"]))
    story.append(PageBreak())

# Conclusion
story.append(Paragraph("🏁 Conclusion spirituelle", styles["Section"]))
story.append(Paragraph(
"Dieu choisit des cœurs fidèles plutôt que des apparences. "
"Comme David, cherchons la présence de Dieu et la sagesse de son Esprit. "
"Le vrai Royaume est celui où Dieu règne dans le cœur de l'homme.",
styles["Texte"]))

# Génération du PDF
doc.build(story)
print(f"✅ PDF généré : {PDF_NAME}")