DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Galaxy S 10", "Electronics",250, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP Laptop", "Electronics",750, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pearl Jame - Ten", "Music",20, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "Household",7, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap", "Household",1.50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diapers Size 3", "Baby",15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baby Wipes (Unsented)", "Baby",7, 320);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Wheels Car", "Toys",2, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pop Figures", "Toys",10, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Food",3, 1000);