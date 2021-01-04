const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    //port
    port: "3306",
    //sql user name
    user: "root",
    //sql password
    password: "Ahmet1256.",
    //name of database
    database: "employeetrackerdb"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connect as id " + connection.threadId);
});
connection.query = util.promisify(connection.query);


class SqlQueries {
    constructor() {
    }

    viewAllData() {
        return connection.query(`SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, department.name AS department, role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) 
        AS manager FROM employee LEFT JOIN role 
        on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id 
        LEFT JOIN employee manager on manager.id = employee.manager_id;`)
    }

    end() {
        connection.end();
    }
}




module.exports = SqlQueries
