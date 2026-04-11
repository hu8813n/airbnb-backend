// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    REDIS_SERVER_URL: string,
    LOCK_TTL: number

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
    PORT: Number(process.env.PORT) || 3001,
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379",
    LOCK_TTL: Number(process.env.LOCK_TTL) || 50000,
};

console.log(`Database URL: ${process.env.DATABASE_URL}`);
    
export const databaseConfig : DatabaseConfig = {
    
    DATABASE_URL: process.env.DATABASE_URL,
};