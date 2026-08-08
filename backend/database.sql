-- MySQL Database Schema for AI Voice Studio Backend Website & Admin Panel
-- Database Name: ai_voice_studio

CREATE DATABASE IF NOT EXISTS `ai_voice_studio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ai_voice_studio`;

-- 1. App Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_token` VARCHAR(64) UNIQUE NOT NULL,
  `full_name` VARCHAR(100) DEFAULT 'App User',
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `subscription_plan` ENUM('FREE', 'PRO', 'VIP') DEFAULT 'FREE',
  `credits_remaining` INT DEFAULT 50,
  `status` ENUM('ACTIVE', 'BLOCKED') DEFAULT 'ACTIVE',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN', 'EDITOR') DEFAULT 'SUPER_ADMIN',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. API Tokens Table (For Secure Auth)
CREATE TABLE IF NOT EXISTS `api_tokens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `token` VARCHAR(128) UNIQUE NOT NULL,
  `device_name` VARCHAR(100) DEFAULT 'Android Device',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `expires_at` DATETIME NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Voice Characters Table (Controlled via Admin Panel)
CREATE TABLE IF NOT EXISTS `characters` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `char_code` VARCHAR(50) UNIQUE NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `gender` ENUM('Male', 'Female', 'Neutral') DEFAULT 'Male',
  `category` VARCHAR(50) DEFAULT 'Anime & Story',
  `avatar` VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  `description` TEXT,
  `style_count` INT DEFAULT 4,
  `is_popular` TINYINT(1) DEFAULT 0,
  `is_premium` TINYINT(1) DEFAULT 0,
  `pitch_offset` FLOAT DEFAULT 0.0,
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. AI Voice Providers & Keys
CREATE TABLE IF NOT EXISTS `providers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `provider_id` VARCHAR(50) UNIQUE NOT NULL,
  `provider_name` VARCHAR(100) NOT NULL,
  `base_url` VARCHAR(255) NOT NULL,
  `api_key` VARCHAR(255) NOT NULL,
  `is_enabled` TINYINT(1) DEFAULT 1,
  `is_default` TINYINT(1) DEFAULT 0,
  `max_text_length` INT DEFAULT 5000,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Voice Generations Log & History
CREATE TABLE IF NOT EXISTS `generations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `prompt_text` TEXT NOT NULL,
  `char_code` VARCHAR(50) NOT NULL,
  `language_code` VARCHAR(10) DEFAULT 'en-US',
  `style_id` VARCHAR(50) DEFAULT 'default',
  `audio_url` VARCHAR(255),
  `duration_seconds` FLOAT DEFAULT 0.0,
  `file_size_formatted` VARCHAR(20) DEFAULT '1.2 MB',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Subscription Plans
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `plan_code` VARCHAR(50) UNIQUE NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `price_formatted` VARCHAR(20) NOT NULL,
  `credits_per_month` INT NOT NULL,
  `features` TEXT NOT NULL,
  `is_popular` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. APK Releases & Version Info
CREATE TABLE IF NOT EXISTS `apk_releases` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `version_name` VARCHAR(20) NOT NULL,
  `version_code` INT NOT NULL,
  `download_url` VARCHAR(255) NOT NULL,
  `release_notes` TEXT,
  `is_force_update` TINYINT(1) DEFAULT 0,
  `released_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. App Settings Table
CREATE TABLE IF NOT EXISTS `app_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) UNIQUE NOT NULL,
  `setting_value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data
INSERT INTO `app_settings` (`setting_key`, `setting_value`) VALUES
('app_name', 'AI Voice Studio'),
('maintenance_mode', '0'),
('min_app_version', '1.0.0'),
('free_credits_new_user', '50'),
('banner_ad_unit_id', 'ca-app-pub-3940256099942544/6300978111'),
('interstitial_ad_unit_id', 'ca-app-pub-3940256099942544/1033173712');

INSERT INTO `subscriptions` (`plan_code`, `title`, `price_formatted`, `credits_per_month`, `features`, `is_popular`) VALUES
('FREE', 'Free Tier', '$0 / month', 50, 'Standard Quality, 4 Voices', 0),
('PRO', 'Pro Creator', '$9.99 / month', 1000, 'Ultra HD Quality, All Voices, Commercial License', 1),
('VIP', 'Studio VIP', '$24.99 / month', 5000, 'Unlimited Speed, Priority Processing, Dedicated Support', 0);

INSERT INTO `characters` (`char_code`, `name`, `gender`, `category`, `avatar`, `description`, `style_count`, `is_popular`, `is_premium`) VALUES
('narrator_deep', 'Deep Morgan', 'Male', 'Documentary', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Resonant documentary voice suitable for storytelling.', 5, 1, 0),
('anime_female', 'Aria Harmony', 'Female', 'Anime & Story', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Expressive anime voice with dramatic audio inflections.', 6, 1, 0),
('robot_tech', 'Cyber 9000', 'Neutral', 'Sci-Fi Synth', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150', 'Futuristic AI voice for gaming and tech content.', 3, 0, 0),
('kids_cartoon', 'Bobbly Joy', 'Male', 'Cartoons', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Energetic cheerful voice for children animations.', 4, 1, 1);

INSERT INTO `providers` (`provider_id`, `provider_name`, `base_url`, `api_key`, `is_enabled`, `is_default`) VALUES
('google_ai_studio', 'Google AI Studio (Gemini)', 'https://generativelanguage.googleapis.com/v1beta/', 'YOUR_GEMINI_API_KEY', 1, 1),
('elevenlabs', 'ElevenLabs Voice AI', 'https://api.elevenlabs.io/v1/', 'YOUR_ELEVENLABS_KEY', 1, 0),
('fish_audio', 'Fish Audio TTS', 'https://api.fish.audio/v1/', 'YOUR_FISH_AUDIO_KEY', 1, 0);

INSERT INTO `apk_releases` (`version_name`, `version_code`, `download_url`, `release_notes`, `is_force_update`) VALUES
('1.0.0', 100, 'https://yourwebsite.com/downloads/ai-voice-studio-v1.0.0.apk', 'Initial official release with dynamic REST API sync support.', 0);
