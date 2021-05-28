import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import { connect } from "./database_models/db.mjs";
import { createRouter as createAuthRouter } from './routers/auth.router.mjs';
import { createRouter as createJobsRouter } from './routers/jobs.router.mjs';

const server = express();
server.use(express.json());
server.use(express.static('public'));
server.use('/api/v1/auth', createAuthRouter());
server.use('/api/v1/jobs', createJobsRouter());

function cuandoEsteListo() {
  console.log('server is ready...');
};

dotenv.config();

connect().then(() => {
  server.listen(process.env.PORT || 3000, cuandoEsteListo);
});





