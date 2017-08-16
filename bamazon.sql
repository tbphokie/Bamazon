DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT(11) NOT NULL UNIQUE,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(5,2) default 0,
  stock_quantity INT(11),
  product_sales DECIMAL(5,2) default 0
);

CREATE TABLE departments(
  department_id INT(11) NOT NULL,
  deparatment_name VARCHAR(30) NOT NULL,
  overhead_costs DECIMAL(5,2) default 0
);
