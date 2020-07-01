DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INTEGER(100),
    stock_quantity INTEGER(100)
    
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Fishing Rod", "Out Doors", 35, 20);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Multi Tool", "Out Doors", 25, 30);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "King Cobra Driver", "Golf", 300, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Pro V 1 Golf Balls", "Golf", 50, 39);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Callaway Wedge", "Golf", 89, 35);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Under Armour Shirt", "Apparel", 65, 30);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Nike Basketball Shorts", "Apparel", 44, 40);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Air Jordans", "Shoes", 95, 35);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Foot Joy Spikes", "Shoes", 119, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Adidas", "Shoes", 125, 45);



SELECT * FROM products;