import app from "./app";

import config from './config/config';
import databaseService from "./service/databaseService";
import logger from "./utils/logger";

const server = app.listen(config.PORT);

; (async () => {
    try {
       
        const connection = await databaseService.connect();

        if (connection) {
            logger.info('DATABASE_CONNECTION_ESTABLISHED', {
                meta: {
                    DATABASE_NAME: connection.name,
                    HOST: connection.host,
                    PORT: connection.port,
                    STATUS: connection.readyState,
                    URI: config.DATABASE_URL,
                   
                    
                }
            });
        } else {
            logger.error('DATABASE_CONNECTION_FAILED: No connection object returned.');
        }
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