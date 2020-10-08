CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

-- department:
CREATE TABLE department (
-- id - INTEGER PRIMARY KEY
id INTEGER NOT NULL AUTO_INCREMENT,
-- name - VARCHAR(30) to hold department name
dept_name VARCHAR(30),
PRIMARY KEY (id)
);

-- role:
CREATE TABLE employee_role (
-- id - INTEGER PRIMARY KEY
id INTEGER NOT NULL AUTO_INCREMENT,
-- title - VARCHAR(30) to hold role title
title VARCHAR(30),
-- salary - DECIMAL to hold role salary
salary DECIMAL,
-- department_id - INTEGER to hold reference to department role belongs to
department_id INTEGER,
PRIMARY KEY (id)
);

-- employee:
CREATE TABLE employee (
-- id - INTEGER PRIMARY KEY
id INTEGER NOT NULL AUTO_INCREMENT,
-- first_name - VARCHAR(30) to hold employee first name
first_name VARCHAR(30),
-- last_name - VARCHAR(30) to hold employee last name
last_name VARCHAR(30),
-- role_id - INTEGER to hold reference to role employee has
role_id INTEGER,
-- manager_id - INTEGER to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
manager_id INTEGER DEFAULT NULL,
PRIMARY KEY (id)
);

