# joaquinpuerto
# JOAQUIN-PUERTO-MARTINES-20-21
Despliegues de proyectos 2020-2021 

////////// TECNOLOGIA USADA  //////////
 
Lenguaje :  Nodejs ( javascript ) ; 
Base de datos  : MSQL WORKBENCH  ,
Tecnologia : Postman ,  XAMP  . 

/////////////////////////// base de datos  ////////////////// 
Para empezar la base de datos  hay que descargarse xamp y mysql workbench  , iniciar xam con la parte mysql . 
Una vez hecho esto iniciar un nueva base de datos en el  ' + ' y copiar los scripts de  la carpeta ScriptDB  ( No ejecutar el de drop ). 

//////////////////  MISION 1 ///////////////////////////

 - 1a funcionalidad  ( Get generico ) (MISION 1  : C)
        Esta funcionalidad se centra en llistar todas y cada unas de las empresas añadidas a la base de datos  , Con postman se comprueba con GET : /companies 
 - 2a funcionalidad  ( Get por id ) (Aportación propia .)
        Esta funcionalidad se centra en la busqueda de compañia por id  , en Postman se puede probar pasandole el id por la peticion en la url . GET : /companies/x 
        Donde x es un id cualquiera . 

 - 3a funcionalidad  (Añadir compañia ) (MISION 1 : A)
        esta funcionalidad se centra en una petición post que lo que hace es añadir una compañia nueva a la base de datos respetando las restricciones de parseado de los elelmentos  . 
        En postman hay que añadirle todos los datos  mediante el Body con una petición post . 
 -4a funcionalidad  ( Modificar empresa ) (MISION 1 : B) 
        Esta funcionalidad se centra en modificar empresas existentes , sin poder modificar elementos prohibidos como el email  , el cif , etc..
        Por postman se puede comprobar  con un PUt pasandole el id por la url /companies/x
        donde x es el id y pasandole por el body los demas datos excepto los prohibidos que en tal caso ignora la petición . 


- 5a funcionalidad  ( Borrar compañia por id ) (Aportación propia )
    Se trata de una peticion delete en la cual se le pasa el id por el body para añadir seguridad  , de la petición y borra la empresa con el id elegido  si existe . 

-6a funcionalidad  ( Buscar por patron de texto  ) (MISION 1 : D )
    Se trata e la funcionalidad por la cual se le pasa el elemento description con un texto por el bodi de la petición GET  y busca  empresas que tenga ese elemento en su propia description . 

/////////////// FIN MISION 1 ///////////////////////////////////

///////////////////////// MISIÓN 2 ////////////////////////////////


- 1a funcionalidad  (Consumir api externa y devolver resultados  ) ( MISION 2 : A )

        Esta funcionalidad lo que hace es hacer una peticion a una api externa y devolver los usuarios ,  con la peculiaridad  que hay que pasarle la pagina que se quiere ver en la url , en dichas paginas hay 20 usuarios  . 
        Para probarlo hay que hacer un GET : /ouwners?page=x donde la x es la pagina que quieres ver  . 

-2a funcionalidad   (Agregar favoritos )  (MISION 2 : B )
        En esta funcionalidad primero se comprueba que el idd ( id del usuario  ) y el idc (id de la compañia  ) existan , si existen se agrega la seleccion del usuario a favoritos por los id  . 
        Para probarlo en Postmann hay que hacer  POST : /favorites  y pasarle en el body el idd y el idc . 

-3a funcionalidad  ( Parsear el json como en el ejemplo ) ( MISION 2 : C  )

    En esta funcionalidad recoge el idd por el bodi de la peticion  get  , y se hace una peticion a usuarios y a los post con ese idd  , una vez se tiene se trata lo datos de los dos lados y se construye un nuevo json .
    Para probarlo en Postman -> GET : /owners y se le pasa en el body el idd . 

////// FIN MISION 2 //////////////


//////////////////////////////////////////////////////  MISION 3 ////////////////////////////////////////////////////////////////////////////////////////////





Todas las pruebas realizadas se pueden ver en  mis pruebas de postman  : 
https://web.postman.co/collections/6899262-c95ce5b3-96f2-430a-a2c0-9cafd38fb562?version=latest&workspace=769f2092-d1be-4827-88d1-d28131b30b54
