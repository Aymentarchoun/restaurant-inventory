-- Alfreej Inventory — MySQL Schema
-- Run this once in Hostinger hPanel → phpMyAdmin

CREATE TABLE IF NOT EXISTS categories (
  id   INT          AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ingredients (
  id          VARCHAR(30)     NOT NULL PRIMARY KEY,
  name        VARCHAR(200)    NOT NULL,
  category    VARCHAR(100)    DEFAULT NULL,
  current_qty DECIMAL(10,3)   NOT NULL DEFAULT 0,
  min_limit   DECIMAL(10,3)   NOT NULL DEFAULT 0,
  unit        VARCHAR(30)     NOT NULL DEFAULT 'KG',
  bulk_unit   VARCHAR(100)    DEFAULT NULL,
  bulk_qty    DECIMAL(10,3)   NOT NULL DEFAULT 1,
  location    VARCHAR(100)    NOT NULL DEFAULT 'Maamoura Kitchen',
  created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usage_logs (
  id            VARCHAR(50)   NOT NULL PRIMARY KEY,
  ingredient_id VARCHAR(30)   DEFAULT NULL,
  qty_deducted  DECIMAL(10,3) NOT NULL,
  staff_name    VARCHAR(100)  DEFAULT NULL,
  location      VARCHAR(100)  DEFAULT NULL,
  timestamp     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
