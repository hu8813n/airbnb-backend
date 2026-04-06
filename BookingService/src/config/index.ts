// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
}

type DatabaseConfig = {
    DATABASE_URL: string | undefined
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded ${process.env.PORT}` );
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001
};

console.log(`Database URL: ${process.env.DATABASE_URL}`);
    
export const databaseConfig : DatabaseConfig = {
    
    DATABASE_URL: process.env.DATABASE_URL,
};