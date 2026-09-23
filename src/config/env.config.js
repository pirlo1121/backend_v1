import { configDotenv } from "dotenv";
configDotenv();


export const env = {
    port: process.env.PORT,
    dbUrl: process.env.DBURL,
    jwt: process.env.JWT_SECRET
}

