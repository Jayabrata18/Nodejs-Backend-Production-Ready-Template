import app from './app';

import config from './config/config';
import { initRateLimiter } from './config/rateLimiter';
import databaseService from './service/databaseService';
import logger from './utils/logger';

const server = app.listen(config.PORT);

; void (async () => {
    try {

        const mongoConnection = await databaseService.mongoConnect();
        const postgresConnection = await databaseService.postgresConnect();

        if (mongoConnection) {
            logger.info('MONGODB_DATABASE_CONNECTION_ESTABLISHED', {
                meta: {
                    DATABASE_NAME: mongoConnection.name,
                    HOST: mongoConnection.host,
                    PORT: mongoConnection.port,
                    STATUS: mongoConnection.readyState,
                    URI: config.MONGODB_DATABASE_URL,


                }
            });
        } else {
            logger.error('MONGODB_DATABASE_CONNECTION_FAILED: No connection object returned.');
        }
        if (postgresConnection) {
            logger.info('POSTGRES_DATABASE_CONNECTION_ESTABLISHED', {
                meta: {
                    DATABASE_NAME: config.POSTGRES_DB,
                    HOST: config.POSTGRES_HOST,
                    PORT: config.POSTGRES_PORT,
                    USER: config.POSTGRES_USER,
                    PASSWORD: config.POSTGRES_PASSWORD,    
                    URI: config.POSTGRES_DATABASE_URL,
                
                }
            });

        } else {
            logger.error('POSTGRES_DATABASE_CONNECTION_FAILED: No connection object returned.');
        }
        initRateLimiter(mongoConnection, postgresConnection);
        logger.info('RATE_LIMIT_MONGO_&_POSTGRES_INITIALIZED',{
            meta: {
               
                
            }
        });
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })

    } catch (err) {
        logger.error(`APPLICATION_ERROR`, { meta: err })
        server.close(() => {
            if (err) {
                logger.error(`SERVER_CLOSED_ERROR`, { meta: err })
            }
            process.exit(1)
        })
    }
})();