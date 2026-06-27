CREATE TABLE IF NOT EXISTS iqra_courses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_key VARCHAR(191) NOT NULL,
  slug VARCHAR(191) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  access_level VARCHAR(64) NOT NULL DEFAULT 'members',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_course_owner_slug (owner_key, slug),
  KEY idx_course_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iqra_modules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_module_course_position (course_id, position),
  CONSTRAINT fk_module_course FOREIGN KEY (course_id) REFERENCES iqra_courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iqra_lessons (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  module_id BIGINT UNSIGNED NOT NULL,
  slug VARCHAR(191) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NULL,
  content_type VARCHAR(32) NOT NULL DEFAULT 'video',
  position INT UNSIGNED NOT NULL DEFAULT 0,
  duration_seconds INT UNSIGNED NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  is_preview TINYINT(1) NOT NULL DEFAULT 0,
  release_after_days INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lesson_module_slug (module_id, slug),
  KEY idx_lesson_module_position (module_id, position),
  CONSTRAINT fk_lesson_module FOREIGN KEY (module_id) REFERENCES iqra_modules(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iqra_media_assets (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lesson_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(32) NOT NULL,
  provider_asset_id VARCHAR(191) NULL,
  playback_id VARCHAR(191) NULL,
  upload_status VARCHAR(32) NOT NULL DEFAULT 'waiting',
  duration_seconds INT UNSIGNED NULL,
  thumbnail_url TEXT NULL,
  captions_url TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_media_lesson (lesson_id),
  KEY idx_media_provider_asset (provider, provider_asset_id),
  CONSTRAINT fk_media_lesson FOREIGN KEY (lesson_id) REFERENCES iqra_lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iqra_enrollments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT UNSIGNED NOT NULL,
  member_key VARCHAR(191) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NULL,
  UNIQUE KEY uq_enrollment_course_member (course_id, member_key),
  KEY idx_enrollment_member (member_key),
  CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES iqra_courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iqra_lesson_progress (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lesson_id BIGINT UNSIGNED NOT NULL,
  member_key VARCHAR(191) NOT NULL,
  watched_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  completed_at DATETIME NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_progress_lesson_member (lesson_id, member_key),
  KEY idx_progress_member (member_key),
  CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES iqra_lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
