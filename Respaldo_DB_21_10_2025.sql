CREATE DATABASE rest_api_apellidos_nestjs;
USE api_rest_nestjs;

-- Products Table
DROP TABLE products;
CREATE TABLE products
(
    id_product          INT                 NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_product        VARCHAR(255) UNIQUE NOT NULL,
    description_product VARCHAR(255)        NULL,
    price               DOUBLE              NOT NULL,
    status              BOOLEAN                      DEFAULT true,
    quantity            INT                 NOT NULL DEFAULT 1,
    categoryId          INT                 NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Address Table
DROP TABLE tbl_address;
CREATE TABLE tbl_address
(
    id_address   INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address      VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    city         VARCHAR(100) NOT NULL,
    zip_code     VARCHAR(10)  NOT NULL,
    created_At   DATETIME     NULL,
    updated_At   DATETIME     NULL
);
SELECT * FROM tbl_address;

-- Customers Table
DROP TABLE tbl_customers;
CREATE TABLE tbl_customers
(
    id_customer       INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_customer     VARCHAR(100) NOT NULL,
    lastname_customer VARCHAR(100) NULL,
    email_customer    VARCHAR(60)  NOT NULL UNIQUE,
    password_customer VARCHAR(255) NOT NULL,
    status            BOOLEAN DEFAULT TRUE,
    address_id        INT          NOT NULL,
    created_At        DATETIME     NULL,
    updated_At        DATETIME     NULL,

    -- FK
    FOREIGN KEY (address_id) REFERENCES tbl_address(id_address)
    ON UPDATE CASCADE ON DELETE CASCADE
);
SELECT * FROM tbl_customers;