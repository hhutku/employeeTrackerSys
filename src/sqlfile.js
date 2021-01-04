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



