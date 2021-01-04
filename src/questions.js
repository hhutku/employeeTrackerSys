var SqlQueries = require("./sqlfile");
var db = new SqlQueries();

var questions = {
    type: "list",
    name: "action",
    message: "WHAT WOULD YOU LIKE TO MANAGE?",
    choices: [
        "VIEW ALL EMPLOYEES",
        "VIEW DEPARTMENTS",
        "VIEW ROLES",
        "VIEW EMPLOYEES BY DEPARTMENT",
        "VIEW EMPLOYEES BY ROLE",
        "VIEW EMPLOYEES BY MANAGER",
        "ADD EMPLOYEE",
        "ADD DEPARTMENT",
        "ADD ROLE",
        "UPDATE EMPLOYEE ROLE",
        "UPDATE EMPLOYEE MANAGER",
        "DELETE DEPARTMENT",
        "DELETE ROLE",
        "REMOVE EMPLOYEE",
        "QUIT"]

};

var qAddEmployee = [
    {
        name: "firstName",
        type: "input",
        message: "ENTER EMPLOYEE FIRST NAME?",
        validate: val => /[0-9a-zA-Z-_.]/gi.test(val)
    },
    {
        name: "lastName",
        type: "input",
        message: "ENTER EMPLOYEE LAST NAME?",
        validate: val => /[0-9a-zA-Z-_.]/gi.test(val)
    },
    {
        name: "roleId",
        type: "list",
        message: "ENTER THE ROLE ",
        choices: async function () {
            const table = await db.roles();
        var roles = table.map(role => `${role.id} ${role.title} `);
        return roles;
        }
      
    },
    {
        name: "managerId",
        type: "list",
        message: "ENTER MANAGER ",
        choices: async function () {
            const table = await db.managers();
        var managers = table.map(manager=> `${manager.id} ${manager.last_name}`);
        return  managers;
        }
      
    }
];

var qAddRole = [
    {
        name: "title",
        type: "input",
        message: "ENTER ROLE TITLE",
        validate: val => /[0-9a-zA-Z-_.]/gi.test(val),
    },
    {
        name: "salary",
        type: "input",
        message: "ENTER ROLE SALARY",
        validate: val => /[0-9]/gi.test(val),
    },
      {
        name: "departmentId",
        type: "list",
        message: "Choose a DEPARTMENT : ",
        choices: async function () {
            const table = await db.departments();
        var departments = table.map(department=> `${department.id} ${department.name}`);
        return  departments;
        }
      
    }

];

var qUpdateRole = [
    {
        name: "employeeId",
        type: "list",
        message: "Choose an employee : ",
        choices: async function () {
            const table = await db.employees();
        var employees = table.map(employee=> `${employee.id} ${employee.first_name} ${employee.last_name}`);
        return  employees;
        }
      
    },
    {
        name: "roleId",
        type: "list",
        message: "Choose a role : ",
        choices: async function () {
            const table = await db.roles();
        var roles = table.map(role => `${role.id} ${role.title} `);
        return roles;
        }
      
    }

];

var qUpdateManager=[
    {
        name: "employeeId",
        type: "list",
        message: "Choose an employee : ",
        choices: async function () {
            const table = await db.employees();
        var employees = table.map(employee=> `${employee.id} ${employee.first_name} ${employee.last_name}`);
        return  employees;
        }
      
    },
    {
        name: "managerId",
        type: "list",
        message: "ENTER MANAGER ",
        choices: async function () {
            const table = await db.managers();
        var managers = table.map(manager=> `${manager.id} ${manager.last_name}`);
        return  managers;
        }
      
    }
  
]

module.exports={questions,qUpdateManager,qUpdateRole,qAddEmployee,qAddRole

}