-- Script de création d'utilisateur sécurisé pour Bible Interactive
-- Exécuter ce script dans MySQL en tant qu'administrateur

-- Créer l'utilisateur dédié
CREATE USER IF NOT EXISTS 'bible_app_user'@'localhost' IDENTIFIED BY 'BibleApp2024!SecurePass';

-- Accorder les permissions minimales nécessaires
GRANT SELECT, INSERT, UPDATE ON bible_interactive.* TO 'bible_app_user'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;

-- Vérifier les permissions
SHOW GRANTS FOR 'bible_app_user'@'localhost';
