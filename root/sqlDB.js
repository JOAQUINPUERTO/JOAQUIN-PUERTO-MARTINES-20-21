// Archivo para la conexión de la aplicación con la base de datos .
const DBmysql = require('mysql');

const DBconections = DBmysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database:'pixomaticjpm'
    


});

DBconections.connect(function(err){
    if (err){
        console.log("se ha capturado un error => "+err);
        return;
    } else {
        console.log("Conenction successful .");
    }
});
module.exports = DBconections;