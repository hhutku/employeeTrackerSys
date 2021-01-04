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

    viewDepartments() {
        return connection.query("SELECT id ,name  FROM department;")
    }
    viewRoles() {
        return connection.query("SELECT id,title, salary, department_id FROM role;")
    }
    viewByRole() {
        return connection.query("SELECT title FROM role")
    }
    chooseRole(choice) {
        return connection.query(`SELECT first_name, last_name, role.salary, role.title, 
    department.name as department FROM employee INNER JOIN role ON employee.role_id = role.id 
    INNER JOIN department ON role.department_id = department.id WHERE role.title="${choice}"`)
    }
    viewByManager() {
        return connection.query(`SELECT employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) 
        AS manager, employee.first_name, employee.last_name,employee.id as emp_id,
        department.name as Dept_Name, role.title FROM employee LEFT JOIN role on role.id = employee.role_id 
        LEFT JOIN department ON department.id = role.department_id 
        LEFT JOIN employee manager on manager.id = employee.manager_id order by manager desc`)
    }
    addEmployee(firstName, lastName, roleId, managerId) {
        return connection.query(`INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?`,
            [firstName, lastName, roleId, managerId]);
    }
    nameFromDepartment() {
        return connection.query("SELECT name FROM department")
    }
    viewByDepartment(choice) {
        return connection.query(`SELECT first_name, last_name, role.salary, role.title, 
    department.name as department FROM employee INNER JOIN role ON 
    employee.role_id = role.id   INNER JOIN department 
    ON role.department_id = department.id WHERE department.name ="${choice}"`)
    }

    addDepartment(department) {
        return connection.query(`INSERT INTO department SET name ="${department}"`)
    }

    addRole(title, salary, department_id) {
        return connection.query("INSERT INTO role SET title = ?, salary = ?, department_id = ?",
            [title, salary, department_id])
    }

    updateEmpRole(roleId, employeeId) {
        return connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId])
    }

    updateEmpManager(managerId, employeeId) {
        return connection.query("UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId])
    }

    deleteDepartment(id) {
        return connection.query(`DELETE FROM department WHERE id ="${id}"`)
    }
    deleteRole(id) {
        return connection.query(`DELETE FROM role WHERE id ="${id}"`)
    }

    deleteEmployee(id) {
        return connection.query(`DELETE FROM employee WHERE id =${id}`)
    }

    managers() {
        return connection.query(`SELECT * FROM employee where manager_id is Null`)
    }

    roles() {
        return connection.query(`SELECT * FROM role;`)
    }

    departments() {
        return connection.query(` SELECT * FROM department;`)
    }

    employees() {
        return connection.query(`SELECT * FROM employeetrackerdb.employee`)
    }
    end() {
        connection.end();
    }
}




module.exports = SqlQueries