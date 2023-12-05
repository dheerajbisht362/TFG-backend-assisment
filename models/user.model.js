import { STRING } from 'sequelize';

export default (sequelize) => {
    const User = sequelize.define('User', {
      username: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      lastOnline: {
        type: STRING,
        allowNull: true,
      },
      fullName: {
        type: STRING,
        allowNull: true,
      }
      });
  
    return User;
  };