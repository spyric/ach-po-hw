const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./database')

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
})

module.exports = { User }
