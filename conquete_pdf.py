# -*- coding: utf-8 -*-
"""
Volume 3 : Conquête – Installation en Terre Promise
Version Louis Segond 1910 – Adaptée pour enfants
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import cm
import io, requests, os

# -------- création du document --------
pdf_path = "Conquete_-_Installation_en_Terre_Promise.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=A4,
                        rightMargin=2*cm, leftMargin=2*cm,
                        topMargin=2*cm, bottomMargin=2*cm)

# -------- styles --------
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

# -------- couverture --------
story.append(Spacer(1, 3*cm))
story.append(Paragraph("⚔️ Conquête – Installation en Terre Promise", styles["Titre"]))
story.append(Paragraph("1200–1050 av. J.-C.", styles["SousTitre"]))

cover_url = "https://cdn.pixabay.com/photo/2018/08/16/19/32/bible-3610915_1280.jpg"
img_data = io.BytesIO(requests.get(cover_url).content)
story.append(Image(img_data, width=14*cm, height=9*cm))
story.append(PageBreak())

# -------- avertissement --------
warn = """
<b>Sources :</b><br/>
Texte biblique : Louis Segond 1910 – domaine public.<br/>
Images : Pixabay – libres de droits pour usage non commercial.<br/>
Créé pour le projet Bible Interactive – usage éducatif.
"""
story.append(Paragraph(warn, styles["Texte"]))
story.append(PageBreak())

# --- suite : ajouter les histoires ici ---

# ===================== HISTOIRES =====================

# Liste d'images symboliques pour chaque histoire
images = [
 "https://cdn.pixabay.com/photo/2018/05/07/14/12/jordan-river-3380616_1280.jpg", # Jourdain
 "https://cdn.pixabay.com/photo/2017/09/23/19/38/jericho-2778386_1280.jpg", # Jéricho
 "https://cdn.pixabay.com/photo/2018/03/22/19/45/sunset-3252034_1280.jpg", # Aï
 "https://cdn.pixabay.com/photo/2018/09/23/19/54/handshake-3692170_1280.jpg", # Gabaonites
 "https://cdn.pixabay.com/photo/2018/05/29/21/22/sun-3434964_1280.jpg", # Soleil arrêté
 "https://cdn.pixabay.com/photo/2019/10/30/19/02/desert-4589858_1280.jpg", # Conquête nord/sud
 "https://cdn.pixabay.com/photo/2019/06/04/13/13/landscape-4253984_1280.jpg", # Partage
 "https://cdn.pixabay.com/photo/2015/03/27/19/39/shelter-695887_1280.jpg", # Villes refuge
 "https://cdn.pixabay.com/photo/2019/12/13/08/24/stone-4693047_1280.jpg", # Sichem
 "https://cdn.pixabay.com/photo/2017/03/27/14/56/bible-2178590_1280.jpg", # Juges
 "https://cdn.pixabay.com/photo/2020/05/07/16/31/bible-5142965_1280.jpg"  # Samuel
]

# Tableau de toutes les leçons
lessons = [
{
 "titre":"🌊 Traversée du Jourdain","ref":"Josué 3–4",
 "texte":"""Après la mort de Moïse, Josué conduisit Israël vers la Terre promise. 
Le peuple arriva au Jourdain en crue. Dieu ordonna aux prêtres portant l'arche de poser leurs pieds dans l'eau. 
Le fleuve s'arrêta aussitôt, et tout Israël traversa à pied sec. 
Douze pierres furent prises du lit du fleuve pour servir de souvenir des merveilles de Dieu.""",
 "versets":[("Josué 3:17","Les sacrificateurs qui portaient l'arche s'arrêtèrent sur le sec, et tout Israël passa à pied sec."),
            ("Josué 4:7","Ces pierres seront un souvenir pour les enfants d'Israël.")],
 "vocab":[("Jourdain","Fleuve séparant le désert de la Terre promise."),
          ("Arche de l'alliance","Symbole de la présence de Dieu."),
          ("Souvenir","Signe visible de la fidélité de Dieu."),
          ("Foi","Confiance que Dieu ouvre le chemin.")],
 "sens":"Dieu ouvre les chemins impossibles pour ceux qui marchent dans la foi.",
 "questions":["Pourquoi Dieu a-t-il voulu un signe avec les pierres ?","Que représente le Jourdain pour toi ?"]
},
{
 "titre":"🧱 Prise de Jéricho","ref":"Josué 6",
 "texte":"""Dieu ordonna à Josué de faire le tour de Jéricho une fois par jour pendant six jours, puis sept fois le septième jour. 
Au signal des trompettes, le peuple cria et les murailles s'écroulèrent. 
Israël entra dans la ville et offrit tout à Dieu, montrant que la victoire venait de Lui seul.""",
 "versets":[("Josué 6:20","Le peuple poussa des cris, et les murailles s'écroulèrent."),
            ("Josué 6:27","L'Éternel fut avec Josué, et sa renommée se répandit dans tout le pays.")],
 "vocab":[("Jéricho","Première ville conquise en Canaan."),
          ("Trompette","Instrument du signal de Dieu."),
          ("Obéissance","Foi mise en action."),
          ("Victoire","Résultat de la confiance en Dieu.")],
 "sens":"L'obéissance apporte la victoire : Dieu renverse les murs que la foi affronte.",
 "questions":["Pourquoi Josué a-t-il obéi à des ordres étranges ?","Que t'apprend cette victoire ?"]
},
{
 "titre":"⚔️ Bataille d'Aï","ref":"Josué 7–8",
 "texte":"""Après Jéricho, Israël fut battu à Aï à cause du péché d'Acan, qui avait volé des biens consacrés à Dieu. 
Quand le peuple confessa sa faute, Dieu rendit la victoire à Israël. 
Cette bataille montra que le péché non confessé empêche la bénédiction.""",
 "versets":[("Josué 7:11","Israël a péché ; ils ont pris de l'interdit."),
            ("Josué 8:1","Ne crains point ; lève-toi et monte contre Aï, car je livre le roi d'Aï entre tes mains.")],
 "vocab":[("Aï","Ville conquise après la repentance."),
          ("Péché","Désobéissance à la parole de Dieu."),
          ("Repentance","Reconnaître et abandonner le mal.")],
 "sens":"La repentance restaure la relation avec Dieu et ouvre la voie à la victoire.",
 "questions":["Pourquoi Israël a-t-il perdu d'abord ?","Que fait Dieu après le pardon ?"]
},
{
 "titre":"🤝 Alliance avec les Gabaonites","ref":"Josué 9",
 "texte":"""Les habitants de Gabaon trompèrent Josué : ils se déguisèrent en voyageurs venus de loin pour obtenir une alliance de paix. 
Israël signa un traité sans consulter Dieu. 
Malgré cette erreur, Dieu transforma la situation et fit des Gabaonites des serviteurs du sanctuaire.""",
 "versets":[("Josué 9:14","Ils ne consultèrent point l'Éternel."),
            ("Josué 9:27","Josué les fit bûcherons et porteurs d'eau pour l'autel de l'Éternel.")],
 "vocab":[("Alliance","Accord entre deux parties."),
          ("Tromperie","Mensonge par ruse."),
          ("Discernement","Sagesse spirituelle pour choisir le bien.")],
 "sens":"Avant chaque décision, il faut consulter Dieu : Sa volonté évite les pièges.",
 "questions":["Pourquoi Josué a-t-il été trompé ?","Comment éviter nos erreurs spirituelles ?"]
},
{
 "titre":"🌞 Soleil arrêté à Gabaon","ref":"Josué 10",
 "texte":"""Cinq rois attaquèrent Gabaon. Josué marcha toute la nuit et Dieu jeta la confusion parmi les ennemis. 
Josué pria, et le soleil s'arrêta au milieu du ciel jusqu'à la victoire d'Israël. 
Jamais jour ne fut pareil, car Dieu écouta la voix d'un homme qui priait avec foi.""",
 "versets":[("Josué 10:12","Soleil, arrête-toi sur Gabaon, et toi, lune, sur la vallée d'Ajalon !"),
            ("Josué 10:14","L'Éternel combattait pour Israël.")],
 "vocab":[("Miracle","Action surnaturelle de Dieu."),
          ("Courage","Force donnée par la foi."),
          ("Victoire","Bénédiction issue de la prière.")],
 "sens":"Quand Dieu combat pour nous, aucune force ne peut nous résister.",
 "questions":["Pourquoi Dieu a-t-Il arrêté le soleil ?","Que montre cette prière de Josué ?"]
},
{
 "titre":"🛡️ Conquête du Sud et du Nord","ref":"Josué 10–11",
 "texte":"""Josué mena deux grandes campagnes : d'abord dans le sud, puis dans le nord du pays. 
Partout, Dieu donna la victoire. 
Aucune armée ne put résister à Israël, car Josué suivait fidèlement les ordres de l'Éternel.""",
 "versets":[("Josué 11:6","Ne les crains point, car je les livre entre tes mains."),
            ("Josué 11:23","Josué prit tout le pays selon tout ce que l'Éternel avait dit à Moïse.")],
 "vocab":[("Hatsor","Grande cité du Nord."),
          ("Persévérance","Foi constante malgré la fatigue."),
          ("Obéissance","Soumission à Dieu.")],
 "sens":"La victoire vient à ceux qui persévèrent avec Dieu dans la fidélité.",
 "questions":["Pourquoi Josué n'a-t-il jamais cessé de combattre ?","Que t'apprend sa persévérance ?"]
},
{
 "titre":"🪔 Partage de la Terre promise","ref":"Josué 13–21",
 "texte":"""Après les conquêtes, Josué partagea le pays entre les douze tribus. 
Chaque tribu reçut son héritage selon la promesse faite à Abraham. 
Ainsi s'accomplit la parole donnée des siècles plus tôt.""",
 "versets":[("Josué 21:43","L'Éternel donna à Israël tout le pays qu'il avait juré de donner à leurs pères.")],
 "vocab":[("Tribu","Famille descendant d'un même ancêtre."),
          ("Héritage","Part reçue par promesse."),
          ("Paix","Repos donné par Dieu.")],
 "sens":"Dieu accomplit toujours ce qu'il promet : chacun reçoit sa part en temps voulu.",
 "questions":["Pourquoi Dieu partage-t-il le pays ?","Que nous apprend ce partage sur la fidélité divine ?"]
},
{
 "titre":"🏙️ Villes de refuge","ref":"Josué 20",
 "texte":"""Dieu ordonna d'établir six villes de refuge pour protéger ceux qui avaient tué involontairement. 
Ces lieux assuraient justice et miséricorde, montrant que Dieu protège les innocents.""",
 "versets":[("Josué 20:2-3","Établissez des villes de refuge où pourra fuir le meurtrier qui aura tué involontairement.")],
 "vocab":[("Refuge","Lieu sûr offert par Dieu."),
          ("Justice","Jugement équitable."),
          ("Miséricorde","Pardon et compassion de Dieu.")],
 "sens":"Dieu offre un refuge à ceux qui cherchent la grâce et la vérité.",
 "questions":["Pourquoi Dieu voulait-il ces villes ?","Comment Dieu est-il ton refuge aujourd'hui ?"]
},
{
 "titre":"🕊️ Assemblée de Sichem","ref":"Josué 24",
 "texte":"""Avant de mourir, Josué réunit Israël à Sichem. 
Il rappela les œuvres de Dieu et appela le peuple à choisir : 
« Choisissez aujourd'hui qui vous voulez servir. Moi et ma maison, nous servirons l'Éternel. » 
Le peuple renouvela l'alliance et s'engagea à rester fidèle.""",
 "versets":[("Josué 24:15","Moi et ma maison, nous servirons l'Éternel.")],
 "vocab":[("Alliance","Engagement avec Dieu."),
          ("Choix","Décision de cœur."),
          ("Fidélité","Persévérance à servir Dieu.")],
 "sens":"Chaque croyant est appelé à renouveler sa fidélité au Seigneur.",
 "questions":["Pourquoi Josué rappelle-t-il les bienfaits de Dieu ?","Comment choisir de servir Dieu aujourd'hui ?"]
},
{
 "titre":"⚖️ Période des Juges","ref":"Juges 2:10-19",
 "texte":"""Après la mort de Josué, Israël oublia Dieu et fit ce qui est mal. 
Alors Dieu suscita des Juges pour les délivrer de leurs ennemis. 
Mais à chaque génération, le peuple retombait dans l'idolâtrie. 
Dieu resta fidèle et continua de leur envoyer des libérateurs.""",
 "versets":[("Juges 2:16","L'Éternel suscita des juges pour les délivrer de leurs ennemis."),
            ("Juges 2:19","Quand le juge mourait, ils se corrompaient plus que leurs pères.")],
 "vocab":[("Juge","Chef envoyé par Dieu pour délivrer."),
          ("Idolâtrie","Adorer autre chose que Dieu."),
          ("Miséricorde","Pardon malgré la faute.")],
 "sens":"Dieu est patient : Il corrige mais ne rejette pas son peuple.",
 "questions":["Pourquoi Dieu a-t-Il envoyé des juges ?","Que montre sa patience ?"]
},
{
 "titre":"👑 Samuel, le dernier juge","ref":"1 Samuel 1–8",
 "texte":"""Anne, femme stérile, pria Dieu et reçut un fils, Samuel. 
Elle le consacra à Dieu. 
Samuel grandit dans le temple et devint prophète. 
Il jugea Israël fidèlement, annonçant la transition vers la royauté sous Saül.""",
 "versets":[("1 Samuel 3:10","L'Éternel appela Samuel, et il répondit : Parle, car ton serviteur écoute."),
            ("1 Samuel 7:15","Samuel jugea Israël pendant toute sa vie.")],
 "vocab":[("Prophète","Porte-parole de Dieu."),
          ("Appel","Invitation divine à servir."),
          ("Transition","Passage vers une nouvelle étape du plan de Dieu.")],
 "sens":"Dieu appelle des cœurs simples et obéissants pour conduire son peuple.",
 "questions":["Comment Samuel a-t-il entendu Dieu ?","Pourquoi son écoute est-elle un exemple ?"]
}
]

# -------- génération des sections --------
for i, lesson in enumerate(lessons):
    story.append(Paragraph(lesson["titre"], styles["Section"]))
    try:
        img_data = io.BytesIO(requests.get(images[i]).content)
        story.append(Image(img_data, width=14*cm, height=8*cm))
    except Exception:
        pass
    story.append(Paragraph("📖 " + lesson["ref"], styles["Texte"]))
    story.append(Paragraph(lesson["texte"], styles["Texte"]))
    for ref, vtxt in lesson["versets"]:
        story.append(Paragraph(ref + " — " + vtxt, styles["Verset"]))
    data = [["Mot","Définition"]] + lesson["vocab"]
    table = Table(data, colWidths=[4*cm,10*cm])
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
                               ('GRID',(0,0),(-1,-1),0.5,colors.grey)]))
    story.append(table)
    story.append(Paragraph("⚖️ " + lesson["sens"], styles["Texte"]))
    for q in lesson["questions"]:
        story.append(Paragraph("💬 " + q, styles["Texte"]))
    story.append(PageBreak())

# -------- conclusion --------
story.append(Paragraph("🏁 Conclusion spirituelle", styles["Section"]))
story.append(Paragraph(
"Dieu conduit son peuple vers la victoire quand il garde la foi et l'obéissance. "
"Comme Josué, soyons forts et courageux : le Seigneur marche devant nous.",
styles["Texte"]))

# -------- génération du PDF --------
doc.build(story)
print("✅ PDF généré :", pdf_path)