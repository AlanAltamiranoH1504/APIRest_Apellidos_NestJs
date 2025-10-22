CREATE DATABASE rest_api_apellidos_nestjs;
USE api_rest_nestjs;

-- Products Table
DROP TABLE products;
CREATE TABLE products(
	id_product          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_product        VARCHAR(255) UNIQUE NOT NULL,
    description_product VARCHAR(255) NULL,
    price               DOUBLE NOT NULL,
    status              BOOLEAN DEFAULT true,
    quantity            INT NOT NULL DEFAULT 1,
    categoryId          INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);

-- Customers Table
DROP TABLE tbl_customers;
CREATE TABLE tbl_customers(
	id_customer       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_customer     VARCHAR(100) NOT NULL,
    lastname_customer VARCHAR(100) NULL,
    email_customer    VARCHAR(60) NOT NULL UNIQUE,
    password_customer VARCHAR(255) NOT NULL,
    status            BOOLEAN DEFAULT TRUE
);
SELECT * FROM tbl_customers;