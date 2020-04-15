module.exports = {
  development: {
    dialect: 'sqlite',
    storage: '.data/database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory'
  },
  production: {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'postgres',
    logging: false
  }
};