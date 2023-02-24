const pg = require("pg");
const knexObject = require("knex");

pg.types.setTypeParser(20, Number);

const knexConfig = {
  client: "postgresql",
  connection: {
    user: "administator",
    database: "bpl",
    password: "301201",
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 2000,
    idleTimeoutMillis: 2000,
    reapIntervalMillis: 1000,
  },
};

const knex = knexObject(knexConfig);

module.exports = knex;
