import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize({
    dialect: "postgres",
    host: process.env.SUPABASE_DB_HOST ,
    port: process.env.SUPABASEDB_PORT,
    database: process.env.SUPABASE_DB_NAME,
    username: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    logging:false,
    dialectOptions : {
        ssl : {
            require: true,
            rejectUnauthorized: false
        }
    },
    statement_timeout: 10000, // 10s timeout for long-running queries
    query_timeout: 10000,     // 10s timeout for long-running queries
    idle_in_transaction_session_timeout: 10000 
});

export const testConnection = async () => {
    try {
        await db.authenticate();
        console.log("Connection to Postgres Database successful !");
    } catch (err){
        console.log("Unable to connect to database : ",err);
    }
}
