
const expr = require('express');
const aplicacion = expr();
aplicacion.use(require('./sites/companies'));

// Configuración  ------- Definición de la configuración del servidor (puerto , entorno , etc.).
aplicacion.set('port' , process.env.PORT || 1500); // creamos una variable global en la variable aplicación que define el puerto a que se va a conectar  . 



// Servidor : Start
aplicacion.listen( aplicacion.get('port'), () => {
    
    console.log('!! Server is up on port ',aplicacion.get('port'),' !!');

});
