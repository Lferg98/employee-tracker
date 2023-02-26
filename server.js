const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const connection = require('./connection')
// npm .env

//connection heading
console.log ('WELCOME TO EMPLOYEE TRACKER')

// Prompt user to select action
function PrintMenuQuestions() {
    inquirer.prompt({


        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
        ],
    })


        // answers is the object that contains the user's answers
        .then((answers) => {

            const { choice } = answers;

            if (choice === 'View all departments') {
                viewAllDepartments();
            }
            if (choice === 'View all roles') {
                viewAllRoles();
            }
            if (choice === 'View all employees') {
                viewAllEmployees();
            }
            if (choice === 'Add a department') {
                addDepartment();
            }
            if (choice === 'Add a role') {
                addRole();
            }
            if (choice === 'Add an employee') {
                addEmployee();
            }
            if (choice === 'Update an employee role') {
                updateEmployeeRole();
            }
            if (choice === 'Exit') {
                console.log('Goodbye!')
                connection.end();
            }
        });
};


// functions remaining to be written:
// View all departments
const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    PrintMenuQuestions();
};
// View all roles
const viewAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    PrintMenuQuestions();
};
// View all employees
const viewAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    PrintMenuQuestions();
}
// Add a department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the new department name',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        return console.log("Entry is invalid, please try again.");
                    }
                },
            },
        ])

        .then((answers) => {
            const sql = 'INSERT INTO department (name) VALUES (?)';
            const params = [answers.name];
            connection.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log(" Added " + answers.name + " to departments ");

                PrintMenuQuestions();
            });
        });
};
//Add a role
function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => {
            return {
                name: department.name,
                value: department.id,
            }
        });

        console.log(departmentChoices)

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter title of the new role.'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary of the new role.',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select department',
                    choices: departmentChoices,
                },
            ])
            .then((answers) => {
                const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
                const params = [answers.title, answers.salary, answers.department_id]
                connection.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log('added new role!');

                    PrintMenuQuestions();
                });
            })
    })
}
//Add an employee
function addEmployee() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        const roleChoices = res.map((role) => {
            return {
                name: role.title,
                value: role.id,
            }
        });
        console.log(roleChoices)

        connection.query("SELECT * FROM employee", (err, res) => {
            const managerChoices = res.map((employee) => {
                return {
                    name: employee.first_name + employee.last_name,
                    value: employee.manager_id
                }
            });
            console.log(managerChoices)

            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter first name of new employee.'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter last name of new employee.',
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Enter new employee role.',
                        choices: roleChoices,
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'select a employees manager.',
                        choices: managerChoices,
                    },

                ])
            then((answers) => {
                const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
                const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
                connection.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log("Employee " + answers.first_name + answers.last_name + " has been added.")
                    PrintMenuQuestions();
                });
            });
        })
    })
}




//Update an employee role
const updateEmployeeRole = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw (err);
        const employeeChoices = res.map((employee) => {
            return {
                name: employee.first_name + employee.last_name,
                value: employee.id,
            }
        });
        console.log(employeeChoices)

        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            const updateRoleResults = res.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
            console.log(updateRoleResults)
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee_id',
                        message: 'Select employee to update.',
                        choices: employeeChoices,
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Select employee role.',
                        choices: updateRoleResults,
                    },
                ])
                .then((answers) => {
                    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
                    const params = [answers.role_id, answers.employee_id];
                    connection.query(sql, params, (err, res) => {
                        if (err) throw err;

                        console.log('Employee role updated');
                        PrintMenuQuestions();
                    });
                });
        })
    })
}










//Exit




PrintMenuQuestions();







