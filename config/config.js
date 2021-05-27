require('dotenv').config()

module.exports = {
  development: {
    username: process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.USERNAMEDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host:  process.env.HOST,
    dialect: 'postgres'
  }
}
