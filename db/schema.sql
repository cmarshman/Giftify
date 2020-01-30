
DROP DATABASE IF EXISTS gifts_db;

CREATE DATABASE gifts_db;

USE gifts_db;

CREATE TABLE gifts(
    id INTEGER AUTO_INCREMENT,
    gift_name VARCHAR(255) NOT NULL,
    gift_sum VARCHAR(255),
    price INTEGER NOT NULL,
    PRIMARY KEY (id)
);
