const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const connection = require('./connection')
// npm .env



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
    const query = 'SELECT * FROM roles';
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

                PrintMenuQuestions();
        });
    });
};
 //Add a role
 const addRole = () => {
     connection.query('SELECT * FROM department', (err, departments) => {
         if (err) console.log(err);
         departments = departments.map((department) => {
             return {
                 name: department.name,
                 value: department.id,
             };
         });
         inquirer
         .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter title of the new role.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary of the new role.',
             },
             {
                type: 'input',
                name: 'department_id',
                message: 'Select department',
                choices: departments
             },
         ])
         .then((answers) => {
            const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
            const params = [answers.role, answers.salary, answers.department_id]
            connection.query(sql,params, (err, results)=> {
                if (err) throw err;
                console.log(" Added " + answer.role + " to roles!' ");

                PrintMenuQuestions;
            });
         })
     })
 }
 //Add an employee

 connection.query("SELECT * FROM role", (err, results) => {
    if (err) console.log(err);
    roles = roles.map((role) => {
        return {
            name: role.title,
            value: role.id,
        };
    });
    inquirer
    .prompt([
        {
            type: 'input',
            name:'firstName',
            message: 'Enter first name of new employee.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name of new employee.',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Enter new employee role.'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Enter new employee role.'
        },
        {
            type:'list',
            name:'manager_id',
            message: 'select a manager id.',
            choices: [1, 2, 3, 4, 5, 6, 7]  
        }
      
    ])
    then((answers)=> {
        console.log(data.role);
        connection.query(
            'INSERT INTO employee SET ?' ,
            {
                first_name: data.firstName,
                local_name: data.lastName,
                role_id: data.role,
                manager_id: data.manager_id
            },
            (err) => {
                if (err) throw err;
                console.log('Updated Employee database.');
                PrintMenuQuestions();
            }
        );
    });

 });

 //Update an employee role
 //Exit




PrintMenuQuestions();







