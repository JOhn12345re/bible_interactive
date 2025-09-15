-- Base de données pour Bible Interactive
-- À exécuter dans phpMyAdmin ou MySQL

CREATE DATABASE IF NOT EXISTS bible_interactive CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bible_interactive;

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL CHECK (age > 0 AND age <= 120),
    church VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_name (first_name, last_name),
    INDEX idx_church (church)
);

-- Table des favoris (liée aux profils)
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book VARCHAR(50) NOT NULL,
    chapter INT NOT NULL,
    verse_start INT,
    verse_end INT,
    verse_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    INDEX idx_user_book (user_id, book, chapter),
    UNIQUE KEY unique_favorite (user_id, book, chapter, verse_start, verse_end)
);

-- Table des progrès des leçons
CREATE TABLE IF NOT EXISTS lesson_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lesson_id VARCHAR(100) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    badge_earned VARCHAR(100),
    score INT DEFAULT 0,
    time_spent INT DEFAULT 0, -- en secondes
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_lesson_progress (user_id, lesson_id),
    INDEX idx_user_lessons (user_id),
    INDEX idx_lesson (lesson_id)
);

-- Table des statistiques d'usage
CREATE TABLE IF NOT EXISTS usage_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type VARCHAR(50) NOT NULL, -- 'verse_search', 'lesson_complete', 'bible_read', etc.
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    INDEX idx_user_action (user_id, action_type),
    INDEX idx_created_at (created_at)
);

-- Insérer quelques données de test (optionnel)
INSERT INTO user_profiles (first_name, last_name, age, church, email) VALUES
('Jean', 'Dupont', 25, 'Église Orthodoxe', 'jean.dupont@example.com'),
('Marie', 'Martin', 30, 'Église Catholique', 'marie.martin@example.com'),
('Pierre', 'Durand', 22, 'Église Protestante', 'pierre.durand@example.com');

-- Afficher les tables créées
SHOW TABLES;
