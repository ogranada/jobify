import Sequelize from 'sequelize';
import { createModel as createUsersModel } from './users.mjs';
import { createModel as createJobsModel } from './jobs.mjs';

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
    // await DB_MODELS.Job.sync({ force: false });

    DB_MODELS.User = createUsersModel(sequelize);
    // await DB_MODELS.User.sync({ force: false });

    // DB_MODELS.Author = createAuthorsModel(sequelize);
    // // await DB_MODELS.Book.sync({ force: false });

    // DB_MODELS.Book = createBooksModel(sequelize);
    // // await DB_MODELS.Book.sync({ force: false });

    // DB_MODELS.Job.hasMany(DB_MODELS.User);
    // DB_MODELS.User.belongsTo(DB_MODELS.Rol);

    // DB_MODELS.Book.belongsToMany(DB_MODELS.Author, { through: 'authors_books'});
    // DB_MODELS.Author.belongsToMany(DB_MODELS.Book, { through: 'authors_books'});

    await sequelize.sync({ force: false })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
