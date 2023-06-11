import mysql from "mysql";

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Zuko@123',
    database:"USERFORM",
});




export default db;