import mongoose from 'mongoose'
import config from '../config/config'
import { Pool } from 'pg';

const pgPool = new Pool({
    host: config.POSTGRES_HOST,
    port: parseInt(config.POSTGRES_PORT ?? '5432', 10),
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
});


export default {
    mongoConnect: async () => {
        try {
            // Attempt to connect to the MongoDB database
            await mongoose.connect(config.MONGODB_DATABASE_URL as string);
            // Return a connection object for further logging if needed
            return mongoose.connection;
        } catch (error) {
            throw error

        }
    },
    //postgres connection
    postgresConnect: async () => {
        try {
            await pgPool.connect();
            return pgPool;
        } catch (error) {
            throw error;

        }
    },
}
