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


async function viewByManager() {
    try {
        const table = await db.viewByManager();
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}


async function addEmployee() {
    const answers = await inquirer.prompt(quest.qAddEmployee);
    try {
        const table = await db.addEmployee(answers.firstName, answers.lastName, answers.roleId.split(" ")[0], answers.managerId.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }
}


async function viewByDepartment() {
    try {
        const table = await db.nameFromDepartment();
    
        var choices = table.map(department => `${department.name}`);
    } catch (err) {
        console.log(err)
    }
    const answers = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            choices: choices,
            message: "CHOOSE DEPARTMENT :",
        },
    ]);

    try {
        const table = await db.viewByDepartment(answers.choice);
        console.table(table);
        start();
    } catch (err) {
        console.log(err)
    }
}


async function addDepartment() {
    const answers = await inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "ENTER DEPARTMENT NAME",
            validate: val => /[0-9a-zA-Z-_.]/gi.test(val),
        },

    ])
    try {
        const table = await db.addDepartment(answers.department);

        start();
    } catch (err) {
        console.log(err)
    }

}

async function addRole() {
    const answers = await inquirer.prompt(quest.qAddRole);
    try {
        const table = await db.addRole(answers.title, answers.salary, answers.departmentId.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }

}


async function updateEmpRole() {
    const answers = await inquirer.prompt(quest.qUpdateRole);
    try {
        const table = await db.updateEmpRole(answers.roleId.split(" ")[0], answers.employeeId.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }
}

async function updateEmpManager() {
    const answers = await inquirer.prompt(quest.qUpdateManager);
    try {
        const table = await db.updateEmpManager(answers.managerId.split(" ")[0], answers.employeeId.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }

}


async function deleteDepartment() {
    const answers = await inquirer.prompt([
        {
            name: "id",
            type: "list",
            message: "Choose DEPARTMENT : ",
            choices: async function () {
                const table = await db.departments();
                var departments = table.map(department => `${department.id}  ${department.name}`);
                return departments;
            }

        }
    ]);
    try {
        const table = await db.deleteDepartment(answers.id.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }

}

async function deleteRole() {
    const answers = await inquirer.prompt([
        {
            name: "id",
            type: "list",
            message: "Choose a role : ",
            choices: async function () {
                const table = await db.roles();
                var roles = table.map(role => `${role.id} ${role.title} `);
                return roles;
            }

        }
    ]);

    try {
        const table = await db.deleteRole(answers.id.split(" ")[0]);
        start();
    } catch (err) {
        console.log(err)
    }

}

start();