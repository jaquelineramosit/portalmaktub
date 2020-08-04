// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    // connection: {
    //   host : 'mysql.codefour.com.br',
    //   user : 'codefo06_gabi',
    //   password : 'Code123!@#',
    //   database : 'codefo06_MKTN'
    // },
    connection: {
      host : 'localhost',
      user : 'jackyfialho',
      password : '@dmin1234',
      database : 'codefo06_MKT'
    },
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
