const { Sequelize } = require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');
const dotenv = require('dotenv');

dotenv.config();

const db = new Sequelize({
    dialect: PostgresDialect,
    url: process.env.DATABASE_URL,
    clientMinMessages: 'notice',
});

module.exports = {
    db
}