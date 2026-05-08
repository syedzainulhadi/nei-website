-- =====================================================
-- schema.sql - Complete Database Schema for NEI School
-- Run this file in MySQL Workbench or phpMyAdmin
-- =====================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS nei_school;
USE nei_school;

-- =====================================================
-- TABLE 1: admin
-- Stores admin login credentials
-- =====================================================
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,   -- will store hashed password
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 2: activities
-- Stores school activities/library entries
-- =====================================================
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),           -- path to uploaded image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 3: staff
-- Stores all staff members with their category
-- =====================================================
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  qualification VARCHAR(255),
  image_url VARCHAR(500),
  -- Category options:
  -- 'executive' | 'teaching' | 'pta' | 'nonteaching'
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
-- Insert a default admin account
-- Username: admin
-- Password: admin123 (we'll hash this via a script)
-- =====================================================
-- NOTE: Do NOT insert plain password here.
-- We will create admin via a separate setup script.