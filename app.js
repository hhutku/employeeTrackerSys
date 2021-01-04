var inquirer = require("inquirer");
var SqlQueries = require("./src/sqlfile");
var db = new SqlQueries();
var quest = require("./src/questions");

async function start() {
    const answers = await inquirer.prompt(quest.questions)

    switch (answers.action) {
        case "VIEW ALL EMPLOYEES": 
        viewAllEmployees();
            break;
        case "VIEW DEPARTMENTS": 
        viewDepartments();
            break;
        case "VIEW ROLES": 
        viewRoles();
            break;
        case "VIEW EMPLOYEES BY DEPARTMENT": 
        viewByDepartment();
            break;
        case "VIEW EMPLOYEES BY ROLE": 
        viewByRole();
            break;
        case "VIEW EMPLOYEES BY MANAGER": 
        viewByManager();
            break;
        case "ADD EMPLOYEE": 
        addEmployee();
            break;
        case "ADD DEPARTMENT": 
        addDepartment();
            break;
        case "ADD ROLE": 
        addRole();
            break;
        case "UPDATE EMPLOYEE ROLE": 
        updateEmpRole();
            break;
        case "UPDATE EMPLOYEE MANAGER": 
        updateEmpManager();
            break;
        case "DELETE DEPARTMENT": 
        deleteDepartment();
            break;
        case "DELETE ROLE": 
        deleteRole();
            break;
        case "REMOVE EMPLOYEE": 
        deleteEmployee();
            break;
        case "QUIT": 
        db.end();
            break;
    }
    ;
}


async function viewAllEmployees() {
    try {
        const table = await db.viewAllData();
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}

async function viewDepartments() {
    try {
        const table = await db.viewDepartments();
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}


async function viewRoles() {
    try {
        const table = await db.viewRoles();
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}
async function viewByRole() {
    try {
        const table = await db.viewByRole();
        // console.table(table);
        var choices = table.map(role => `${role.title}`);
    } catch (err) {
        console.log(err)
    }
    const answers = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            choices: choices,
            message: "CHOOSE ROLE :",
        },
    ]);
    try {
        const table = await db.chooseRole(answers.choice);
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}

start();