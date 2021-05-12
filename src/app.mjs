import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import { connect } from "./database_models/db.mjs";

const server = express();
//const { connect } = require('./database_models/db.mjs');
//const express = require('express');
//const fs = require('fs');


server.use(express.json());
server.use(express.static('public'));



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


server.post('/api/v1/auth/', (request, response) => {
  const index = usuarios.findIndex(usuario => (usuario.userName === request.body.userName) && (usuario.password === request.body.password));

  if (index !== -1) {
    return response
      .status(200)
      .json({ status: "OK" })
  };

  response
    .status(401)
    .json({ status: "NO-OK" })

});

server.post('/api/v1/newjob', (request, response) => {
  let jobs = [];
  let db_rawdata = fs.readFileSync('./src/db.json');
  jobs = JSON.parse(db_rawdata);
  let nuevo = request.body;
  jobs = [nuevo, ...jobs];

  fs.writeFileSync('./src/db.json', JSON.stringify(jobs, null, 2));

  response
    .status(200)
    .json({
      status: 'saved'
    })
    ;
})



//function obtener jobs

server.get('/api/v1/jobs', (request, response) => {

  let db_rawdata = fs.readFileSync('./src/db.json');

  let jobss = JSON.parse(db_rawdata);

  response
    .status(200)
    .json(jobss);
})


//OBTENER JOBS VERSIÓN ALDI:
// server.get('/api/v1/jobs', (request, response) => {
//   fs.readFile("src/db.json", (err, jobsDb) => {

//     if (err) {
//       console.log("File reading failed:", err)
//       return
//     }
//     const parsedData = JSON.parse(jobsDb);
//     response.json(parsedData);
//   })
// })


function cuandoEsteListo() {
  console.log('server is ready...');
};

dotenv.config();

connect().then(() => {
  server.listen(3000, cuandoEsteListo);
});





