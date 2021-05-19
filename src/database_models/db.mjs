import Sequelize from 'sequelize';
import { createModel as createUsersModel } from './users.mjs';
import { createModel as createJobsModel } from './jobs.mjs';
import { DBError } from '../common/errors.mjs';

const DB_MODELS = {};

export async function connect() {
  const {
    DB_PASS,
    DB_SCHEMA,
    DB_USERNAME,
    DB_HOST,
    DB_PORT,
    DB_NAME
  } = process.env;
  const AUTH = DB_USERNAME || DB_PASS
    ? `${DB_USERNAME}:${DB_PASS}@` 
    : '';
  const URL = `${DB_SCHEMA}://${AUTH}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  console.log(URL);
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mariadb'
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    DB_MODELS.Job = createJobsModel(sequelize);
    DB_MODELS.User = createUsersModel(sequelize);
    await sequelize.sync({ force: false })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export async function verifyUser(username, password) {
  try {
    /** @type {Sequelize.Model} */
    const User = DB_MODELS.User;
    const foundUser = await User.findOne({
      where: {
        username,
        password
      } 
    });
    return foundUser.toJSON();
  } catch (error) {
    let myError;
    switch (error.original.code) {
      case 'ECONNREFUSED':
        throw new DBError(`Failure accesing to the database`, 500);
      default:
        myError = new Error(`Critical database failure.`);
        myError.status = 500;
        throw myError;
    }
  }
}
