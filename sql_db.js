import { Sequelize } from 'sequelize';
import UserModel from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const config =  {
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  dialect: {
    dialect: process.env.SQL_DIALECT,
    host: process.env.SQL_HOST,
    dialectOptions: {
      ssl: true
    }
  }
}
const sequelize = new Sequelize(config.database, config.username, config.password, config.dialect);

const User = UserModel(sequelize);

sequelize.sync().then(() => {
  console.log('Database and table synchronized');
});

// mongo_DB

import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


export {
  User
};