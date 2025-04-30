import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const testConnection = async () => {
    try {
        await db.authenticate();
        console.log("Connection to Postgres Database successful !");
    } catch (err){
        console.log("Unable to connect to database : ",err);
    }
}
