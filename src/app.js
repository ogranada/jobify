const express = require('express');
const server = express();
server.use(express.json());

server.use(express.static('public'));

const fetch = require('node-fetch');
const fs = require('fs');

const usuarios = [
    {
        
        userName: "Oscar",
        password: "123"  
    },
    {
        
        userName: "Aldana",
        password: "321" 
    },
    {
        
        userName: "Lucia",
        password: "456"   
    }
];


server.get('/api/v1/auth/', (request, response) => {
    const  index = usuarios.findIndex(usuario=> (usuario.userName === request.body.userName) && (request.password === request.body.pass)   ); 

    if (index !== -1) {
        return  response
        .status(200)
        .json({ status: "OK"})      
    };

    response
        .status(401)
        .json({ status: "NO-OK"})    

});


//function obtener jobs

server.get('/api/v1/jobs', (request, response) => {
 
    let db_rawdata = fs.readFileSync('./src/db.json');

    let jobss = JSON.parse(db_rawdata);
    
    response
    .status(200)
    .json(jobss);


})





function cuandoEsteListo(){
    console.log('server is ready...');
};


server.listen(3000, cuandoEsteListo);




