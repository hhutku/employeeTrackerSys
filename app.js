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

start();