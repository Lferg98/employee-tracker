const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const connection = require('./connection')






// Prompt user to select action
function PrintMenuQuestions () {
    inquirer.prompt({
        
            
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices:[
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
            exit();
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
    const query = 'SELECT * FROM department';
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
        connection.query(sql, params, (err, results)=> {
            if (err) throw err;
                console.log(" Added " + answers.name + " to departments ");

                PrintMenuQuestions
        });
    });
};
// Add a role
// Add an employee
// Update an employee role
// Exit




PrintMenuQuestions();





