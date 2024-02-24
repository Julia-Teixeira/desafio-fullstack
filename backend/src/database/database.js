import { Sequelize } from 'sequelize';
import "dotenv/config";

const sequelize = new Sequelize(String(process.env.POSTGRES_URL), {
    dialect: 'postgres'
});

export default sequelize;
