const expr = require('express');
const bodyParser = require('body-parser');
var js = bodyParser.json();
const request = require('request');

const router = expr.Router(); // Objeto que nos permite definir rutas para nuestro servidor . 

const DBconections = require("../sqlDB");
const { json } = require('body-parser');

//////////////////////////////// MISION 1 ///////////////////////////////////////////////////////////////



////////////////////////////    C   /////////////////////////////////////
//////////////////////// GET ////////////////////////////////////////////


// busqueda global de la tabla compañias . 
router.get('/companies' , (req, res) =>{

    DBconections.query('select * from companies',  (err,filas) => {
        if(err){
            console.log('Se ha capturado el siguiente error =>'+err);
        }else{
            res.json(filas);
        }
    });


});


//busqueda personalizada por id de la compañia  ( Añadido de mi parte  )

router.get('/companies/:id', (req,res) => {

 const {id} = req.params;
 DBconections.query( 'select * from companies  where id = ? ', [id] , (err, filas , campos) => {

    if ( err) {
        console.log("Se ha capturado un error => " + err);
    }else {
        res.json(filas);
    }

 }); 

});


//////////////////    A   ///////////////////////////////////
//////////////////// POST ///////////////////////////////
// Almacenar compañia . 
router.post('/companies',js, (req,res) => {
    
    const sql ='insert into companies set ?';

    const   dataObject = {
        name: req.body.name,
        cif: req.body.cif,
        shortdesc: req.body.shortdesc,
        description : req.body.description,
        ccc : req.body.ccc,
        fecha : req.body.fecha,
        stado : req.body.stado,
        logo : req.body.logo,
        email : req.body.email

    }
var aux = JSON.stringify(dataObject.cif); 

const exp = /[A-Z]+/


    console.log('Entramos en el if .'); 
    DBconections.query( sql , dataObject , (err,fila) => {

        if ( err) {
            console.log('Se ha capturado un error => '+err);
            res.json('Pruebe otra vez . ');
        }else{
            res.json('200 ok');
        } 


    });

});
///////////////////////// B ////////////////////////////////////////////////////////
///////////////////////// Actualizar compañia .//////////////////////////////////////// 
router.put('/companies/:id',js, (req,res) =>{

const { id }= req.params;
const {name ,cif,shortdesc,description,ccc,fecha,stado,logo,email} = req.body;
console.log(id);

 /*   console.log(cif);
    console.log(fecha);
    console.log(email);*/
    
    // comprobación de que no se esta intentando modificar alguno de los parámetros prohibidos . 
    if((cif == null || cif == undefined  ) && (fecha ==undefined) && (email==undefined )){    
        const parametro = `update companies set name = '${name}', 
        shortdesc = '${shortdesc}', description = '${description} ', CCC = '${ccc}' ,
        stado = '${stado}' , logo  = '${logo}'  where id = '${id}'; `;
            
        DBconections.query(parametro, (err,fila,dato)=>{
        if ( err){
          console.log('Error =>'+err);
         }else{
            res.json('!!200 ok!!');
              }
       });              
    } else {
        res.json("No se puede modificar ni el CIF ni la fecha ni el email ni el Id , pruebe otra vez respetando las restricciones . ");
    }
    
   
});
////////////////////// Borrar por ID //////////////////////////////// ( Añadido de mi parte . )

router.delete('/companies' ,js, (req,res) =>{
   const {id}  =  req.body;
    const sql = 'delete from companies where id = ? ;';

    DBconections.query(sql,[id],(err, fila) =>{

        if (err){
            console.log("Se ha capturado el error => "+err );
        }else{
            res.json ( ' !! 200 ok !!' );
        }
    });
} );


 ///////////////////////////////////////  D //////////////////////////////////////////////////////////////
///////////////////// Busqueda por cadena de texto //////////////////////////////
// He cambiado la ruta a /companies2 por que hace colisión con la busqueda genérica  , si endo esta la que se va a ejecutar . 
router.get( '/companies2',js,(req,res) =>{

    const {description} = req.body ; 

    const sql = 'select * from companies where  description regexp ? ;';

    DBconections.query(sql , [description] , (err , filas ) => {

        if (err){
            console.log('Se ha capturado el error => '+err);
        }else{

            res.json(filas);
        }

    });

});
//////////////////////////////////////// MISIÓN 1 /////////////////////////////////////////////////




//////////////////////////////////////// MISIÓN 2 ////////////////////////////////////////////////

/////////////////////////////////////////// A //////////////////////////////////////////////////////

// Con el parametro pague el usuario dice la pagina de 20 usuarios quiere consultar  . 
// Claro que siempre se puede enviar la pagina desde el body y quitarlo de la url . 

router.get ('/owners/:page', js , (req ,  res ) => {
    const x = req.params; 
// Para consumir los datos de la api publica me he dado cuenta que no hace falta usar ningun token ,se puede consumir si mas . ////
//Esta constante almacenaba los parametros de la url con el token de seguridad .   
/* const op = {
        'url' : 'https://gorest.co.in',
        'method' : 'GET' , 
         'path ' : '/public-api/users',
         'Authorization' : 'Bearer e36c6c2c9337f428a49096a6b5ada1a154aeecd306e8ec4c85e783829695a1d5'
    };*/

  //  const url  ='https://gorest.co.in/public-api/users Authorization= Bearer e36c6c2c9337f428a49096a6b5ada1a154aeecd306e8ec4c85e783829695a1d5' ;
   
    function respuesta( values ){
      // Parseamos los datos a JSON ya que no viene en un formato procesable y luego recuperamos el arreglo "data"  ;          
       var datos = JSON.parse(values.body).data;
       
           console.log(datos);
     res.json(datos); 
    }; 
    
    // console.log('Entramos en el request');
        request.get('https://gorest.co.in/public-api/users?page='+x , (err ,filas ) => {
                //console.log('Pasado el request .');
                if ( err) {
                    console.log('ERROR => '+err);
                }else{
                    //console.log(filas);
                    respuesta(filas);
                    
                }

            });


} );

////////////////////////////////////////////////////// B /////////////////////////////////////////////////
// Funcionalidad de la tabla de favoritoss //

router.post('/favorites', js , (req,res ) => {
// por el body de la petición se pasará el id del usuario y el id de la empresa que ha marcado como favorito.

const { idd , idc} = req.body ;
console.log(idd);
console.log(idc);
function variable(variables){

    var  datos = JSON.parse(variables.body).data;
    console.log(datos);

    if(JSON.stringify(datos) != '[]'){
        
       // console.log('Se ha pasado el if');
      
        //Aqui se comprueba de que la compañia existe . 
        
        const sql = 'select * from companies  where id = ? ';
        DBconections.query(sql,[idc],(err, fila) =>{
           
            //console.log('Se ha recogido');
          
            if (err){
           
                console.log("Se ha capturado el error => "+err );
           
            }else{
               
               /// console.log('Se ha entrado en el else .');
                if (JSON.stringify(fila) == '[]'){
                   // console.log('Se ha entrado en el igual a []' );
                    res.json('Compañia inexistente .');
                }else {
                    
                    const insertar = `insert into favorites (idd,idc) values ('${idd}','${idc}') ;`;

                    DBconections.query(insertar, (err,) => {

                        if (err){
                            console.log('Se ha producido el error =>'+err);
                        }else{
                            res.json(' Se ha agregado la preferencia correctamente .');
                        }

                    })

                
                    
                } 
            }
        });
    }else{
        res.json('Dueño inexistente .');
    }

}
// Se van a comprobar a continuación que existe el dueño .

        request.get ( 'https://gorest.co.in/public-api/users?id='+idd,(err , filas ) => {
        
        console.log('Se ha entrado en el request . ');

        if (err){
            console.log('Se ha capturado el error => '+err);
        
        }else{
        
            console.log('No ha habido error en el request . ');
        
            variable(filas);
             }



        });




});

///////////////////////////////////     C     //////////////////////////////////////////////////////////
//////////////////////////////////
router.get('/owners' , js ,(req , res ) => {
// En vez de pasar el id por la url se le pasa por el body de la peticion así se consigue un poco mas de seguridad . 
 const {idd}= req.body; 
 console.log(idd);
///////// primera función para recoger los datos  del usuarios  .
 function variable(variables){

    // voy a coger  el unico elemento del array obtenido  de la consulta. 
    var  datos = JSON.parse(variables.body).data[0];
   // console.log(datos);
    
   
 

    ///////// segunda funcion para que recoja los datos de los post de la persona . 
    function variable2(variables2){

        var  datos2 = JSON.parse(variables2.body).data;
        //console.log(datos2);
        // saco cada uno de los parametros del objeto para formar posteriormente el json data . 
        var  {id ,name,email,gender,status,created_at,updated_at} = datos;
       
    // construyo el json data  .
        var json1 = {

            "id" : id,
            "name" : name,
            "email" : email,
            "gender" :gender, 
            "status" : status,
            "created_at": created_at,
            "updated_at" : updated_at,
            "posts" : datos2

        };
       // console.log(jsonB);
    ///// construyo el JSON resultante  con los campos CODE Y DATA  . //////////////////////
        var json2 = {
            "code" : 200,
            "data" : json1
        }
   
      //console.log(json2);
         res.json(json2); 
    //////////////////////////////////////////////////////////////////////////////
    }
   if ( JSON.stringify(JSON.parse(variables.body).data) == "[]"){
       res.json('No existe ese usuario .');
  
    }else{  
        request.get ( 'https://gorest.co.in/public-api/posts?user_id='+idd,(err , filas ) => {
     //   console.log('Se ha entrado en el request  2 . ');
        if (err){
            console.log('Se ha capturado el error => '+err);
        }else{
          //  console.log('No ha habido error en el request 2. ');
            variable2(filas);
            }

    });
   }
 }
   request.get ( 'https://gorest.co.in/public-api/users?id='+idd,(err , filas ) => {
  //  console.log('Se ha entrado en el request . ');
    if (err){
        console.log('Se ha capturado el error => '+err);
    }else{
       // console.log('No ha habido error en el request . ');
        variable(filas);
         }
   
        });

});
//////////////////////////////////////// MISION 2 /////////////////////////////////////////////////////



//////////////////////////////////////// MISION 3 /////////////////////////////////////////////////////




//////////////////////////////////////// MISION 3 //////////////////////////////////////////////////////

module.exports = router ;