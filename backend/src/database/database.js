import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import "dotenv/config";

const sequelize = new Sequelize(String(process.env.POSTGRES_URL), {
    dialect: pg
});

export default sequelize;
