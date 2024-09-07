import { Connection } from 'mongoose';
import { RateLimiterMongo, RateLimiterPostgres } from 'rate-limiter-flexible';
import { Pool } from 'pg'
import logger from '../utils/logger';


export let rateLimiterMongo: null | RateLimiterMongo = null
export let rateLimiterPostgres: null | RateLimiterPostgres = null
import config from '../config/config'

const DURATION = config.DURATION
const POINTS = config.POINTS


export const initRateLimiter = (mongooseConnection: Connection, postgresPool: Pool) => {
    try {
        //Initialize Mongodb rate limiter
        rateLimiterMongo = new RateLimiterMongo({
            storeClient: mongooseConnection,
            keyPrefix: 'middleware',
            points: POINTS,
            duration: DURATION,
        });
        // Initialize PostgreSQL Rate Limiter
        rateLimiterPostgres = new RateLimiterPostgres({
            storeClient: postgresPool,
            keyPrefix: 'middleware',
            points: POINTS,
            duration: DURATION,
        });

    } catch (error) {
        logger.error('Error initializing rate limiters:', error,
            //     {
            //     meta: {
            //          error: (error as Error).message,
            //          stack: (error as Error).stack,
            //     }
            // }
        )

    }


}
