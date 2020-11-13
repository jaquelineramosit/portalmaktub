// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'mysql.maktub.tech',
      user : 'efathaco_mkt',
      password : 'Andilo271085',
      database : 'efathaco_mkt'
    },
    // connection: {
    //   host : 'localhost',
    //   user : 'jackyfialho',
    //   password : '@dmin1234',
    //   database : 'codefo06_MKT'
    // },
    migrations : {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
