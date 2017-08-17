DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT(11) NOT NULL UNIQUE,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(7,2) default 0,
  stock_quantity INT(11),
  product_sales DECIMAL(10,2) default 0
);

CREATE TABLE departments(
  department_id INT(11) NOT NULL UNIQUE,
  department_name VARCHAR(30) NOT NULL,
  overhead_costs DECIMAL(10,2) default 0
);

INSERT INTO PRODUCTS (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES(12345, 'widgets', 'Hardware', 2.00, 1000, 1000),
(12346, 'sprockets', 'Hardware', 10.00, 1000, 2000),
(13123, 'wireless router', 'Electronics', 90.00, 100, 300),
(13124, 'usb drive', 'Electronics', 50.00, 300, 400),
(13125, 'wireless mouse', 'Electronics', 30.00, 500, 500),
(14567, 'erasable pens', 'Office', 3.50, 900, 600),
(14568, 'printer ink', 'Office', 35.00, 200, 700),
(14569, 'no 2 pencils', 'Office', 1.00, 100, 800),
(14570, 'bulk multipurpose paper', 'Office', 30.00, 50, 90),
(14571, 'file folders', 'Office', 7.00, 100, 1000);

INSERT INTO DEPARTMENTS (department_id, department_name, overhead_costs)
VALUES (12, 'Hardware', 1000  ),
(13, 'Electronics', 2000),
(14, 'Office', 3000);
