var SqlQueries = require("./sqlfile");


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
   
];

var qAddRole = [


];

var qUpdateRole = [


];

var qUpdateManager=[
   
  
]


module.exports={questions,qUpdateManager,qUpdateRole,qAddEmployee,qAddRole

}