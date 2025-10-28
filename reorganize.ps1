#!/usr/bin/env pwsh
# Script de réorganisation intelligente du projet

$baseDir = "C:\Users\sheno\OneDrive\Bureau\site  Biblique"
Set-Location $baseDir

Write-Host "🚀 Début de la réorganisation intelligente..." -ForegroundColor Cyan

# ===== PHASE 1: Documentation =====
Write-Host "`n📚 Phase 1: Réorganisation de la documentation" -ForegroundColor Yellow

$docMoves = @{
    "CHANGELOG_SERMONS.md" = "docs\"
    "FRISE_CHRONOLOGIQUE_ADAM_EVE.md" = "docs\features\"
    "GUIDE_TEST_RESPONSIVE.md" = "docs\guides\"
    "INTEGRATION_ADAM_EVE_FINALE.md" = "docs\integration\"
    "INTEGRATION_API_FINALE.md" = "docs\integration\"
    "INTEGRATION_API_REUSSIE.md" = "docs\integration\"
    "INTEGRATION_RESUME.md" = "docs\integration\"
    "NOUVELLE_LEÇON_ADAM_EVE.md" = "docs\features\"
    "README_SERMONS.md" = "docs\"
    "RESUME_AMELIORATIONS_COMPLETEES.md" = "docs\"
    "RESUME_AMELIORATIONS_RESPONSIVE.md" = "docs\"
    "bible site.md" = "docs\"
}

foreach ($file in $docMoves.Keys) {
    if (Test-Path $file) {
        Move-Item $file $docMoves[$file] -Force
        Write-Host "  ✓ $file → $($docMoves[$file])" -ForegroundColor Green
    }
}

# ===== PHASE 2: Scripts =====
Write-Host "`n🛠️  Phase 2: Réorganisation des scripts" -ForegroundColor Yellow

# Génération
$genScripts = @(
    "scripts\generate-lessons-simple.cjs",
    "scripts\generate-missing-lessons.ts",
    "scripts\extract-bible-data.js",
    "scripts\extract-french-bible.js",
    "scripts\simple-extract.js"
)

foreach ($script in $genScripts) {
    if (Test-Path $script) {
        $name = Split-Path $script -Leaf
        Move-Item $script "scripts\generation\$name" -Force
        Write-Host "  ✓ $name → scripts\generation\" -ForegroundColor Green
    }
}

# Validation
$valScripts = @(
    "scripts\test-lessons.cjs",
    "scripts\validate_content_jsons.js",
    "scripts\check_bible_json.js"
)

foreach ($script in $valScripts) {
    if (Test-Path $script) {
        $name = Split-Path $script -Leaf
        Move-Item $script "scripts\validation\$name" -Force
        Write-Host "  ✓ $name → scripts\validation\" -ForegroundColor Green
    }
}

# Déploiement
$deployScripts = @(
    "scripts\deploy-secure.js",
    "scripts\setup-security.js"
)

foreach ($script in $deployScripts) {
    if (Test-Path $script) {
        $name = Split-Path $script -Leaf
        Move-Item $script "scripts\deployment\$name" -Force
        Write-Host "  ✓ $name → scripts\deployment\" -ForegroundColor Green
    }
}

# Maintenance
$maintScripts = @(
    "scripts\cleanup.js",
    "scripts\fix-lesson-formats.cjs",
    "scripts\fix-vulnerabilities.js",
    "scripts\security-audit.js",
    "scripts\monitor-security.js",
    "scripts\test-security.js",
    "scripts\analyze-structure.js"
)

foreach ($script in $maintScripts) {
    if (Test-Path $script) {
        $name = Split-Path $script -Leaf
        Move-Item $script "scripts\maintenance\$name" -Force
        Write-Host "  ✓ $name → scripts\maintenance\" -ForegroundColor Green
    }
}

# PDF
$pdfScripts = @(
    "generate_bible_timeline_pdf.py",
    "conquete_pdf.py",
    "royaume_pdf.py",
    "volume2_liberation.py"
)

foreach ($script in $pdfScripts) {
    if (Test-Path $script) {
        Move-Item $script "scripts\pdf\$script" -Force
        Write-Host "  ✓ $script → scripts\pdf\" -ForegroundColor Green
    }
}

# ===== PHASE 3: Composants =====
Write-Host "`n🧩 Phase 3: Réorganisation des composants" -ForegroundColor Yellow

# Jeux
$gameComponents = @(
    "src\components\GoldGame.tsx",
    "src\components\OrderGame.tsx",
    "src\components\InteractiveQuiz.tsx",
    "src\components\PhaserGame.tsx"
)

foreach ($comp in $gameComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\games\$name" -Force
        Write-Host "  ✓ $name → src\components\games\" -ForegroundColor Green
    }
}

# Timeline
$timelineComponents = @(
    "src\components\Timeline.tsx",
    "src\components\CompleteTimeline.tsx",
    "src\components\AbrahamTimelineGame.tsx",
    "src\components\AdamEveTimelineGame.tsx",
    "src\components\BabelTimelineGame.tsx",
    "src\components\CainAbelTimelineGame.tsx",
    "src\components\CreationTimelineGame.tsx",
    "src\components\NaissanceJesusTimelineGame.tsx"
)

foreach ($comp in $timelineComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\timeline\$name" -Force
        Write-Host "  ✓ $name → src\components\timeline\" -ForegroundColor Green
    }
}

# Bible
$bibleComponents = @(
    "src\components\BibleVerse.tsx",
    "src\components\VerseSearch.tsx",
    "src\components\BibleApiTest.tsx",
    "src\components\FrenchBibleSelector.tsx",
    "src\components\TranslationSelector.tsx",
    "src\components\GreekText.tsx"
)

foreach ($comp in $bibleComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\bible\$name" -Force
        Write-Host "  ✓ $name → src\components\bible\" -ForegroundColor Green
    }
}

# Profile
$profileComponents = @(
    "src\components\ProfileDialog.tsx",
    "src\components\ProfileWidget.tsx",
    "src\components\ProfileDashboard.tsx",
    "src\components\AchievementManager.tsx",
    "src\components\LevelUpManager.tsx",
    "src\components\BadgeChest.tsx",
    "src\components\Badge.tsx"
)

foreach ($comp in $profileComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\profile\$name" -Force
        Write-Host "  ✓ $name → src\components\profile\" -ForegroundColor Green
    }
}

# Media
$mediaComponents = @(
    "src\components\AudioPlayer.tsx",
    "src\components\AudioControls.tsx",
    "src\components\SermonPlayer.tsx",
    "src\components\SermonSection.tsx"
)

foreach ($comp in $mediaComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\media\$name" -Force
        Write-Host "  ✓ $name → src\components\media\" -ForegroundColor Green
    }
}

# Navigation
$navComponents = @(
    "src\components\Menu.tsx",
    "src\components\MobileNavigation.tsx"
)

foreach ($comp in $navComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\navigation\$name" -Force
        Write-Host "  ✓ $name → src\components\navigation\" -ForegroundColor Green
    }
}

# Lessons
$lessonComponents = @(
    "src\components\LessonCard.tsx",
    "src\components\Journal.tsx"
)

foreach ($comp in $lessonComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\lessons\$name" -Force
        Write-Host "  ✓ $name → src\components\lessons\" -ForegroundColor Green
    }
}

# Content
$contentComponents = @(
    "src\components\PsalmOfTheDay.tsx",
    "src\components\DailyChallenge.tsx",
    "src\components\TopicsExplorer.tsx"
)

foreach ($comp in $contentComponents) {
    if (Test-Path $comp) {
        $name = Split-Path $comp -Leaf
        Move-Item $comp "src\components\content\$name" -Force
        Write-Host "  ✓ $name → src\components\content\" -ForegroundColor Green
    }
}

# UI (déjà dans ui/, on ne déplace rien)
Write-Host "  ℹ️  Composants UI déjà bien organisés" -ForegroundColor Cyan

Write-Host "`n✅ Réorganisation terminée!" -ForegroundColor Green
Write-Host "`n⚠️  ATTENTION: Vous devez maintenant:" -ForegroundColor Yellow
Write-Host "  1. Mettre à jour les imports dans le code" -ForegroundColor White
Write-Host "  2. Mettre à jour les chemins dans vite.config.ts" -ForegroundColor White
Write-Host "  3. Tester que tout fonctionne: npm run dev" -ForegroundColor White
Write-Host "`n📖 Consultez REORGANISATION_PLAN.md pour plus de détails" -ForegroundColor Cyan
