const { Pool } = require("pg");

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DB,
      password: process.env.PW,
      port: process.env.DB_PORT || 5432,
    };
module.exports = new Pool(poolConfig);
