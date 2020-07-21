const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URI) // Example for postgres

module.exports = { sequelize }
