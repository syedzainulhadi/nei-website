-- =====================================================
-- schema.sql - Production Database Schema for NEI School
-- Compatible with Railway MySQL
-- =====================================================

USE railway;

-- =====================================================
-- TABLE: admin
-- Stores admin login credentials
-- =====================================================

CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: activities
-- Stores school activities/library entries
-- =====================================================

CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    pinned TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: staff
-- Stores staff members
-- =====================================================

CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    qualification VARCHAR(255),
    image_url VARCHAR(500),

    category ENUM(
        'executive',
        'teaching',
        'pta',
        'nonteaching'
    ) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: achievements
-- Stores toppers and achievements
-- =====================================================

CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class VARCHAR(100) NOT NULL,
    percentage VARCHAR(20),
    description VARCHAR(500),
    image_url VARCHAR(500),
    year VARCHAR(10) NOT NULL,

    category ENUM(
        'topper',
        'sports',
        'cultural',
        'academic'
    ) NOT NULL DEFAULT 'topper',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: testimonials
-- Stores student testimonials
-- =====================================================

CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    batch VARCHAR(10) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: videos
-- Stores school videos
-- =====================================================

CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    video_url VARCHAR(500) NOT NULL,

    type ENUM(
        'mp4',
        'youtube'
    ) NOT NULL DEFAULT 'mp4',

    pinned TINYINT(1) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: ncc_nss_activities
-- Stores NCC/NSS activities
-- =====================================================

CREATE TABLE IF NOT EXISTS ncc_nss_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),

    category ENUM('nccnss')
        NOT NULL DEFAULT 'nccnss',

    pinned TINYINT(1) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- SAMPLE TESTIMONIALS
-- =====================================================

INSERT INTO testimonials (name, batch, text)
SELECT * FROM (
    SELECT
        'Rahul Naik',
        '2010',
        'NEI gave me the foundation to succeed in life. The teachers here truly care about every student.'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM testimonials
    WHERE name = 'Rahul Naik'
) LIMIT 1;

INSERT INTO testimonials (name, batch, text)
SELECT * FROM (
    SELECT
        'Priya Dessai',
        '2015',
        'The values and education I received at NEI shaped my character and career in ways I will always be grateful for.'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM testimonials
    WHERE name = 'Priya Dessai'
) LIMIT 1;

INSERT INTO testimonials (name, batch, text)
SELECT * FROM (
    SELECT
        'Amit Gaonkar',
        '2018',
        'A wonderful institution with dedicated staff. My years at NEI were the best years of my life.'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM testimonials
    WHERE name = 'Amit Gaonkar'
) LIMIT 1;

-- =====================================================
-- SAMPLE ACHIEVEMENTS
-- =====================================================

INSERT INTO achievements (
    name,
    class,
    percentage,
    description,
    year,
    category
)
SELECT * FROM (
    SELECT
        'Sneha Naik',
        'Class X',
        '98.6%',
        'School topper in SSC Board Exams',
        '2024',
        'topper'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM achievements
    WHERE name = 'Sneha Naik'
) LIMIT 1;

INSERT INTO achievements (
    name,
    class,
    percentage,
    description,
    year,
    category
)
SELECT * FROM (
    SELECT
        'Rohit Dessai',
        'Class XII',
        '96.2%',
        'First rank in HSC Science stream',
        '2024',
        'topper'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM achievements
    WHERE name = 'Rohit Dessai'
) LIMIT 1;

INSERT INTO achievements (
    name,
    class,
    percentage,
    description,
    year,
    category
)
SELECT * FROM (
    SELECT
        'Priya Gaonkar',
        'Class X',
        '97.4%',
        'Second rank in SSC Board Exams',
        '2024',
        'topper'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM achievements
    WHERE name = 'Priya Gaonkar'
) LIMIT 1;

INSERT INTO achievements (
    name,
    class,
    percentage,
    description,
    year,
    category
)
SELECT * FROM (
    SELECT
        'Amit Kamat',
        'Class VIII',
        NULL,
        'Won Gold Medal in State Level Swimming',
        '2024',
        'sports'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM achievements
    WHERE name = 'Amit Kamat'
) LIMIT 1;

INSERT INTO achievements (
    name,
    class,
    percentage,
    description,
    year,
    category
)
SELECT * FROM (
    SELECT
        'Sunita Vernekar',
        'Class X',
        NULL,
        'First place in District Cultural Festival',
        '2024',
        'cultural'
) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM achievements
    WHERE name = 'Sunita Vernekar'
) LIMIT 1;