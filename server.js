const mysql = require("mysql");
const inquirer = require("inquirer");
const { response } = require("express");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add employee", "View department", "View role", "View employee", "Quit"],
        }
    ])
        .then(answers => {
            switch (answers.select) {
                case "Add department": {
                    addDepartment()
                } break;
                case "Add role": {
                    addRole()
                } break;
                case "Add employee": {
                    addEmployee()
                } break;
                case "View department": {
                    viewDepartment()
                } break;
                case "View role": {
                    viewRole()
                } break;
                case "View employee": {
                    viewEmployee()
                } break;
                case "Quit": {
                    connection.end()
                } break;
                default:
                    break;
            }
        });
};

function addEmployee() {
    connection.query("SELECT employee_role.title, employee_role.salary, department.dept_name FROM employee_role INNER JOIN department ON employee_role.department_id=department.id", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    return choiceArray;
                }
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: ["MGR1", "MGR2", "MGR3", "MGR4"]
            }
        ]).then(function (response) {
            if (response.role === "Intern") {
                response.role = "1";
            }
            if (response.role === "Aide") {
                response.role = "2";
            }
            if (response.role === "Writer") {
                response.role = "3";
            }
            if (response.role === "Accountant") {
                response.role = "4";
            }
            if (response.role === "Engineer") {
                response.role = "5";
            }
            if (response.role === "Sales") {
                response.role = "6";
            }
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                },
                function (err) {
                    if (err) throw err;
                    console.log("You updated employees.")
                    start();
                }
            )
        })
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter name for new department"
        }
    ]).then(function (response) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                dept_name: response.department,
            },
            function (err) {
                if (err) throw err;
                console.log("Success")
                start();
            }
        )
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter title of new role"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter salary of new role"
        },
        {
            type: "input",
            name: "dept_id",
            message: "Enter department ID"
        }
    ]).then(function (response) {
        connection.query(
            "INSERT INTO employee_role SET ?",
            {
                title: response.title,
                salary: response.salary,
                dept_id: response.dept_id
            },
            function (err) {
                if (err) throw err;
                console.log("Success");
                start();
            }
        )
    })
}

const viewDepartment = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(" ");
        console.table(res);
    })
}

const viewRole = () => {
    connection.query("SELECT employee_role.title, employee_role.salary, department.dept_name FROM employee_role INNER JOIN department ON employee_role.department_id=department.id", function (err, res) {
        if (err) throw err;
        console.log(" ");
        console.table(res);
    })
}