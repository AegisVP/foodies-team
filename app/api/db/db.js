import { Sequelize } from 'sequelize';

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
export const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true`);
