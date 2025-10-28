#!/bin/bash
# Script de réorganisation intelligente du projet

cd "/c/Users/sheno/OneDrive/Bureau/site  Biblique"

echo "🚀 Début de la réorganisation intelligente..."

# ===== PHASE 1: Documentation =====
echo ""
echo "📚 Phase 1: Réorganisation de la documentation"

[ -f "CHANGELOG_SERMONS.md" ] && mv "CHANGELOG_SERMONS.md" "docs/" && echo "  ✓ CHANGELOG_SERMONS.md → docs/"
[ -f "FRISE_CHRONOLOGIQUE_ADAM_EVE.md" ] && mv "FRISE_CHRONOLOGIQUE_ADAM_EVE.md" "docs/features/" && echo "  ✓ FRISE_CHRONOLOGIQUE_ADAM_EVE.md → docs/features/"
[ -f "GUIDE_TEST_RESPONSIVE.md" ] && mv "GUIDE_TEST_RESPONSIVE.md" "docs/guides/" && echo "  ✓ GUIDE_TEST_RESPONSIVE.md → docs/guides/"
[ -f "INTEGRATION_ADAM_EVE_FINALE.md" ] && mv "INTEGRATION_ADAM_EVE_FINALE.md" "docs/integration/" && echo "  ✓ INTEGRATION_ADAM_EVE_FINALE.md → docs/integration/"
[ -f "INTEGRATION_API_FINALE.md" ] && mv "INTEGRATION_API_FINALE.md" "docs/integration/" && echo "  ✓ INTEGRATION_API_FINALE.md → docs/integration/"
[ -f "INTEGRATION_API_REUSSIE.md" ] && mv "INTEGRATION_API_REUSSIE.md" "docs/integration/" && echo "  ✓ INTEGRATION_API_REUSSIE.md → docs/integration/"
[ -f "INTEGRATION_RESUME.md" ] && mv "INTEGRATION_RESUME.md" "docs/integration/" && echo "  ✓ INTEGRATION_RESUME.md → docs/integration/"
[ -f "NOUVELLE_LEÇON_ADAM_EVE.md" ] && mv "NOUVELLE_LEÇON_ADAM_EVE.md" "docs/features/" && echo "  ✓ NOUVELLE_LEÇON_ADAM_EVE.md → docs/features/"
[ -f "README_SERMONS.md" ] && mv "README_SERMONS.md" "docs/" && echo "  ✓ README_SERMONS.md → docs/"
[ -f "RESUME_AMELIORATIONS_COMPLETEES.md" ] && mv "RESUME_AMELIORATIONS_COMPLETEES.md" "docs/" && echo "  ✓ RESUME_AMELIORATIONS_COMPLETEES.md → docs/"
[ -f "RESUME_AMELIORATIONS_RESPONSIVE.md" ] && mv "RESUME_AMELIORATIONS_RESPONSIVE.md" "docs/" && echo "  ✓ RESUME_AMELIORATIONS_RESPONSIVE.md → docs/"
[ -f "bible site.md" ] && mv "bible site.md" "docs/" && echo "  ✓ bible site.md → docs/"

# ===== PHASE 2: Scripts =====
echo ""
echo "🛠️  Phase 2: Réorganisation des scripts"

# Génération
[ -f "scripts/generate-lessons-simple.cjs" ] && mv "scripts/generate-lessons-simple.cjs" "scripts/generation/" && echo "  ✓ generate-lessons-simple.cjs → scripts/generation/"
[ -f "scripts/generate-missing-lessons.ts" ] && mv "scripts/generate-missing-lessons.ts" "scripts/generation/" && echo "  ✓ generate-missing-lessons.ts → scripts/generation/"
[ -f "scripts/extract-bible-data.js" ] && mv "scripts/extract-bible-data.js" "scripts/generation/" && echo "  ✓ extract-bible-data.js → scripts/generation/"
[ -f "scripts/extract-french-bible.js" ] && mv "scripts/extract-french-bible.js" "scripts/generation/" && echo "  ✓ extract-french-bible.js → scripts/generation/"
[ -f "scripts/simple-extract.js" ] && mv "scripts/simple-extract.js" "scripts/generation/" && echo "  ✓ simple-extract.js → scripts/generation/"

# Validation
[ -f "scripts/test-lessons.cjs" ] && mv "scripts/test-lessons.cjs" "scripts/validation/" && echo "  ✓ test-lessons.cjs → scripts/validation/"
[ -f "scripts/validate_content_jsons.js" ] && mv "scripts/validate_content_jsons.js" "scripts/validation/" && echo "  ✓ validate_content_jsons.js → scripts/validation/"
[ -f "scripts/check_bible_json.js" ] && mv "scripts/check_bible_json.js" "scripts/validation/" && echo "  ✓ check_bible_json.js → scripts/validation/"

# Déploiement
[ -f "scripts/deploy-secure.js" ] && mv "scripts/deploy-secure.js" "scripts/deployment/" && echo "  ✓ deploy-secure.js → scripts/deployment/"
[ -f "scripts/setup-security.js" ] && mv "scripts/setup-security.js" "scripts/deployment/" && echo "  ✓ setup-security.js → scripts/deployment/"

# Maintenance
[ -f "scripts/cleanup.js" ] && mv "scripts/cleanup.js" "scripts/maintenance/" && echo "  ✓ cleanup.js → scripts/maintenance/"
[ -f "scripts/fix-lesson-formats.cjs" ] && mv "scripts/fix-lesson-formats.cjs" "scripts/maintenance/" && echo "  ✓ fix-lesson-formats.cjs → scripts/maintenance/"
[ -f "scripts/fix-vulnerabilities.js" ] && mv "scripts/fix-vulnerabilities.js" "scripts/maintenance/" && echo "  ✓ fix-vulnerabilities.js → scripts/maintenance/"
[ -f "scripts/security-audit.js" ] && mv "scripts/security-audit.js" "scripts/maintenance/" && echo "  ✓ security-audit.js → scripts/maintenance/"
[ -f "scripts/monitor-security.js" ] && mv "scripts/monitor-security.js" "scripts/maintenance/" && echo "  ✓ monitor-security.js → scripts/maintenance/"
[ -f "scripts/test-security.js" ] && mv "scripts/test-security.js" "scripts/maintenance/" && echo "  ✓ test-security.js → scripts/maintenance/"
[ -f "scripts/analyze-structure.js" ] && mv "scripts/analyze-structure.js" "scripts/maintenance/" && echo "  ✓ analyze-structure.js → scripts/maintenance/"

# PDF
[ -f "conquete_pdf.py" ] && mv "conquete_pdf.py" "scripts/pdf/" && echo "  ✓ conquete_pdf.py → scripts/pdf/"
[ -f "royaume_pdf.py" ] && mv "royaume_pdf.py" "scripts/pdf/" && echo "  ✓ royaume_pdf.py → scripts/pdf/"
[ -f "volume2_liberation.py" ] && mv "volume2_liberation.py" "scripts/pdf/" && echo "  ✓ volume2_liberation.py → scripts/pdf/"
[ -f "generate_bible_timeline_pdf.py" ] && mv "generate_bible_timeline_pdf.py" "scripts/pdf/" && echo "  ✓ generate_bible_timeline_pdf.py → scripts/pdf/"

# ===== PHASE 3: Composants =====
echo ""
echo "🧩 Phase 3: Réorganisation des composants"

# Jeux
[ -f "src/components/GoldGame.tsx" ] && mv "src/components/GoldGame.tsx" "src/components/games/" && echo "  ✓ GoldGame.tsx → src/components/games/"
[ -f "src/components/OrderGame.tsx" ] && mv "src/components/OrderGame.tsx" "src/components/games/" && echo "  ✓ OrderGame.tsx → src/components/games/"
[ -f "src/components/InteractiveQuiz.tsx" ] && mv "src/components/InteractiveQuiz.tsx" "src/components/games/" && echo "  ✓ InteractiveQuiz.tsx → src/components/games/"
[ -f "src/components/PhaserGame.tsx" ] && mv "src/components/PhaserGame.tsx" "src/components/games/" && echo "  ✓ PhaserGame.tsx → src/components/games/"

# Timeline
[ -f "src/components/Timeline.tsx" ] && mv "src/components/Timeline.tsx" "src/components/timeline/" && echo "  ✓ Timeline.tsx → src/components/timeline/"
[ -f "src/components/CompleteTimeline.tsx" ] && mv "src/components/CompleteTimeline.tsx" "src/components/timeline/" && echo "  ✓ CompleteTimeline.tsx → src/components/timeline/"
[ -f "src/components/AbrahamTimelineGame.tsx" ] && mv "src/components/AbrahamTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ AbrahamTimelineGame.tsx → src/components/timeline/"
[ -f "src/components/AdamEveTimelineGame.tsx" ] && mv "src/components/AdamEveTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ AdamEveTimelineGame.tsx → src/components/timeline/"
[ -f "src/components/BabelTimelineGame.tsx" ] && mv "src/components/BabelTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ BabelTimelineGame.tsx → src/components/timeline/"
[ -f "src/components/CainAbelTimelineGame.tsx" ] && mv "src/components/CainAbelTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ CainAbelTimelineGame.tsx → src/components/timeline/"
[ -f "src/components/CreationTimelineGame.tsx" ] && mv "src/components/CreationTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ CreationTimelineGame.tsx → src/components/timeline/"
[ -f "src/components/NaissanceJesusTimelineGame.tsx" ] && mv "src/components/NaissanceJesusTimelineGame.tsx" "src/components/timeline/" && echo "  ✓ NaissanceJesusTimelineGame.tsx → src/components/timeline/"

# Bible
[ -f "src/components/BibleVerse.tsx" ] && mv "src/components/BibleVerse.tsx" "src/components/bible/" && echo "  ✓ BibleVerse.tsx → src/components/bible/"
[ -f "src/components/VerseSearch.tsx" ] && mv "src/components/VerseSearch.tsx" "src/components/bible/" && echo "  ✓ VerseSearch.tsx → src/components/bible/"
[ -f "src/components/BibleApiTest.tsx" ] && mv "src/components/BibleApiTest.tsx" "src/components/bible/" && echo "  ✓ BibleApiTest.tsx → src/components/bible/"
[ -f "src/components/FrenchBibleSelector.tsx" ] && mv "src/components/FrenchBibleSelector.tsx" "src/components/bible/" && echo "  ✓ FrenchBibleSelector.tsx → src/components/bible/"
[ -f "src/components/TranslationSelector.tsx" ] && mv "src/components/TranslationSelector.tsx" "src/components/bible/" && echo "  ✓ TranslationSelector.tsx → src/components/bible/"
[ -f "src/components/GreekText.tsx" ] && mv "src/components/GreekText.tsx" "src/components/bible/" && echo "  ✓ GreekText.tsx → src/components/bible/"

# Profile
[ -f "src/components/ProfileDialog.tsx" ] && mv "src/components/ProfileDialog.tsx" "src/components/profile/" && echo "  ✓ ProfileDialog.tsx → src/components/profile/"
[ -f "src/components/ProfileWidget.tsx" ] && mv "src/components/ProfileWidget.tsx" "src/components/profile/" && echo "  ✓ ProfileWidget.tsx → src/components/profile/"
[ -f "src/components/ProfileDashboard.tsx" ] && mv "src/components/ProfileDashboard.tsx" "src/components/profile/" && echo "  ✓ ProfileDashboard.tsx → src/components/profile/"
[ -f "src/components/AchievementManager.tsx" ] && mv "src/components/AchievementManager.tsx" "src/components/profile/" && echo "  ✓ AchievementManager.tsx → src/components/profile/"
[ -f "src/components/LevelUpManager.tsx" ] && mv "src/components/LevelUpManager.tsx" "src/components/profile/" && echo "  ✓ LevelUpManager.tsx → src/components/profile/"
[ -f "src/components/BadgeChest.tsx" ] && mv "src/components/BadgeChest.tsx" "src/components/profile/" && echo "  ✓ BadgeChest.tsx → src/components/profile/"
[ -f "src/components/Badge.tsx" ] && mv "src/components/Badge.tsx" "src/components/profile/" && echo "  ✓ Badge.tsx → src/components/profile/"

# Media
[ -f "src/components/AudioPlayer.tsx" ] && mv "src/components/AudioPlayer.tsx" "src/components/media/" && echo "  ✓ AudioPlayer.tsx → src/components/media/"
[ -f "src/components/AudioControls.tsx" ] && mv "src/components/AudioControls.tsx" "src/components/media/" && echo "  ✓ AudioControls.tsx → src/components/media/"
[ -f "src/components/SermonPlayer.tsx" ] && mv "src/components/SermonPlayer.tsx" "src/components/media/" && echo "  ✓ SermonPlayer.tsx → src/components/media/"
[ -f "src/components/SermonSection.tsx" ] && mv "src/components/SermonSection.tsx" "src/components/media/" && echo "  ✓ SermonSection.tsx → src/components/media/"

# Navigation
[ -f "src/components/Menu.tsx" ] && mv "src/components/Menu.tsx" "src/components/navigation/" && echo "  ✓ Menu.tsx → src/components/navigation/"
[ -f "src/components/MobileNavigation.tsx" ] && mv "src/components/MobileNavigation.tsx" "src/components/navigation/" && echo "  ✓ MobileNavigation.tsx → src/components/navigation/"

# Lessons
[ -f "src/components/LessonCard.tsx" ] && mv "src/components/LessonCard.tsx" "src/components/lessons/" && echo "  ✓ LessonCard.tsx → src/components/lessons/"
[ -f "src/components/Journal.tsx" ] && mv "src/components/Journal.tsx" "src/components/lessons/" && echo "  ✓ Journal.tsx → src/components/lessons/"

# Content
[ -f "src/components/PsalmOfTheDay.tsx" ] && mv "src/components/PsalmOfTheDay.tsx" "src/components/content/" && echo "  ✓ PsalmOfTheDay.tsx → src/components/content/"
[ -f "src/components/DailyChallenge.tsx" ] && mv "src/components/DailyChallenge.tsx" "src/components/content/" && echo "  ✓ DailyChallenge.tsx → src/components/content/"
[ -f "src/components/TopicsExplorer.tsx" ] && mv "src/components/TopicsExplorer.tsx" "src/components/content/" && echo "  ✓ TopicsExplorer.tsx → src/components/content/"

# UI components restent dans ui/
echo "  ℹ️  Composants UI déjà organisés dans src/components/ui/"

echo ""
echo "✅ Réorganisation terminée!"
echo ""
echo "⚠️  ATTENTION: Vous devez maintenant:"
echo "  1. Mettre à jour les imports dans le code"
echo "  2. Tester que tout fonctionne: npm run dev"
echo ""
echo "📖 Consultez REORGANISATION_PLAN.md pour plus de détails"
