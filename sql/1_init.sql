CREATE DATABASE foodies;
CREATE USER 'foodies_user'@'%' IDENTIFIED BY 'FpI97UPdfQGXEzrboLa3H0';
GRANT ALL PRIVILEGES ON foodies.* TO 'foodies_user'@'%';
FLUSH PRIVILEGES;

USE foodies;

CREATE TABLE IF NOT EXISTS areas (
  id varchar(36) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id varchar(36) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ingredients (
  id varchar(36) NOT NULL,
  name varchar(255) NOT NULL,
  description text NOT NULL,
  image varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id varchar(36) NOT NULL,
  name varchar(255) NOT NULL,
  avatar varchar(255),
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS followers (
  id varchar(36) NOT NULL,
  follower varchar(36) NOT NULL,
  following varchar(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (follower) REFERENCES users(id),
  FOREIGN KEY (following) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS testimonials (
  id varchar(36) NOT NULL,
  owner varchar(36) NOT NULL,
  testimonial text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS recipes (
  id varchar(36) NOT NULL,
  title varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  owner varchar(36) NOT NULL,
  area varchar(255) NOT NULL,
  instructions text NOT NULL,
  description text NOT NULL,
  thumb varchar(255) NOT NULL,
  time varchar(255) NOT NULL,
  ingredients JSON NOT NULL,
  created_at bigint NOT NULL,
  updated_at bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
