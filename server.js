const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');





// Prompt user to select action
function PintMenuQuestions () {
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

        if (choices === 'View all departments') {
            viewAllDepartments();
        }
        if (choices === 'View all roles') {
            viewAllRoles();
        }
        if (choices === 'View all employees') {
            viewAllEmployees();
        }
        if (choices === 'Add a department') {
            addDepartment();
        }
        if (choices === 'Add a role') {
            addRole();
        }
        if (choices === 'Add an employee') {
            addEmployee();
        }
        if (choices === 'Update an employee role') {
            updateEmployeeRole();
        }
        if (choices === 'Exit') {
            console.log('Goodbye!')
            exit();
        }
    });
};


// functions remaining to be written:
// View all departments
// View all roles
// View all employees
// Add a department
// Add a role
// Add an employee
// Update an employee role
// Exit










