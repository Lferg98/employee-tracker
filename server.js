const mysql = require('mysql2');
const inquirer = require('inquirer');
const constTable = require('console.table');

// Create connection to database
const connected = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

startPrompt();

// Prompt user to select action
function startPrompt() {
    inquirer.prompt([
        {
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
                ,]
        }
    ])



