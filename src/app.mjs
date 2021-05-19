import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import { connect } from "./database_models/db.mjs";
import { createRouter as createAuthRouter } from './routers/auth.router.mjs';

const server = express();
server.use(express.json());
server.use(express.static('public'));
server.use('/api/v1/auth', createAuthRouter());

server.post('/api/v1/job', (request, response) => {
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


server.get('/api/v1/jobs', (request, response) => {
  let db_rawdata = fs.readFileSync('./src/db.json');
  let jobss = JSON.parse(db_rawdata);
  response
    .status(200)
    .json(jobss);
})

function cuandoEsteListo() {
  console.log('server is ready...');
};

dotenv.config();

connect().then(() => {
  server.listen(3000, cuandoEsteListo);
});





