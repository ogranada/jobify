import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Job = sequelize.define('jobs', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locations: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });

  return Job;
};


  // {
  //   "time": "2014-03-20T04:08:51.598Z",
  //   "workType": "FullTime",
  //   "title": "Development Teacher",
  //   "company": "Acamica - Global",
  //   "locations": [
  //     "Colombia",
  //     "Argentina",
  //     "Peru",
  //     "España"
  //   ]
  // },