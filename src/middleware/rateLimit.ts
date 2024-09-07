import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnviorment } from '../constant/application'
import { rateLimiterMongo, rateLimiterPostgres } from '../config/rateLimiter';
import responseMessage from '../constant/responseMessage';


export default (req: Request, res: Response, next: NextFunction) => {
    if (config.ENV === EApplicationEnviorment.DEVELOPMENT) {
        return next();
    }
    if (rateLimiterMongo) {
        rateLimiterMongo.consume(req.ip as string)
            .then(() => next())
            .catch(() => {
               res.status(429).json({ error: responseMessage.TOO_MANY_REQUESTS });
            });
    }
    if (rateLimiterPostgres){
        rateLimiterPostgres.consume(req.ip as string)
           .then(() => next())
           .catch(() => {
               res.status(429).json({ error: responseMessage.TOO_MANY_REQUESTS });
            });
    }

}