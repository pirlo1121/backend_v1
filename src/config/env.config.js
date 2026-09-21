import { configDotenv } from "dotenv";
configDotenv();

export const env = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL
}