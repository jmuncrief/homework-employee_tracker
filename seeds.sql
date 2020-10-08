USE employee_db;

INSERT INTO department (dept_name)
VALUES ("Accounting"), ("Sales"), ("Engineering"), ("Management"), ("HR");

INSERT INTO employee_role (title)
VALUES ("Engineer"), ("Manager"), ("Accountant"), ("Sales Rep");

INSERT INTO employee_role (salary)
VALUES (60000.00), (100000.00), (45000.00);

INSERT INTO employee (first_name)
VALUES ("John");

INSERT INTO employee (last_name)
VALUES ("Smith");

INSERT INTO employee (role_id)
VALUES ("Manager");

