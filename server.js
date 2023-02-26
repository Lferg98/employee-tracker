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
//const viewAllEmployees = () => {
    //const query(1)
//}

// Add a department
// Add a role
// Add an employee
// Update an employee role
// Exit




PrintMenuQuestions();





