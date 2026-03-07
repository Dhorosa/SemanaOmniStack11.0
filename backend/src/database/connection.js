const knex = require('knex');
const configuration = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = configuration[environment];

if (!config) {
  throw new Error(`Database configuration not found for environment: ${environment}`);
}

const connection = knex(config);

module.exports = connection;
