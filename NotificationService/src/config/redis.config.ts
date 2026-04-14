import Redis from "ioredis";
import { serverConfig } from ".";

//Singleton Object --> We want to have only one instance of the Redis client throughout the app

//singleton pattern to ensure only one connection to Redis is established
function connectToRedis() {
  try {
    let connection: Redis;

    const redisConfig = {
      host: serverConfig.REDIS_HOST,
      port: serverConfig.REDIS_PORT,
      maxRetriesPerRequest: null,
    };

    //singleton pattern to ensure only one connection to Redis is established
    // If connection already exists, return it. Otherwise, create a new one and return it.
    // This ensures that throughout the app, we are using the same Redis connection, which is more efficient and prevents issues related to multiple connections.
    //we are using a closure here to keep the connection variable private and ensure that it is only accessible through the returned function.
    // This way, we can control the creation of the Redis connection and ensure that it is only created once.

    // The returned function is a closure on coonection variable  to the connection variable.
    return () => {
      if (!connection) {
        connection = new Redis(redisConfig);
        return connection;
      }

      return connection;
    };

    console.log(
      `Connected to Redis at ${redisConfig.host}:${redisConfig.port}`,
    );
  } catch (err) {
    console.error(`Error connecting to Redis: ${err}`);
    throw err; // rethrow the error after logging it
  }
}

export const getRedisConnObject = connectToRedis();
