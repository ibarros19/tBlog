const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection.js');

class User extends Model {

  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {

      async beforeCreate (data) {
        data.password = await bcrypt.hash(data.password, 10);
        return data;
      },

      async beforeUpdate (data) {
        data.password = await bcrypt.hash(data.password, 10);
        return data;
      }

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

module.exports = User;