import IORedis from "ioredis";
import Redlock from "redlock";
import { serverConfig } from "./index";

console.log("Redis URL:", serverConfig.REDIS_SERVER_URL); // add this line


// Initialize Redis client for connecting to the Redis server and handling all Redis operations
export const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);


redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("ready", () => console.log("✅ Redis ready"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
redisClient.on("close", () => console.log("⚠️ Redis connection closed"));
redisClient.on("reconnecting", () => console.log("🔄 Redis reconnecting..."));

export const redlock = new Redlock([redisClient], {
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200, // time in ms 
});

