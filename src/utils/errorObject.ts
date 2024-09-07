/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constant/responseMessage';
import config from '../config/config';
import { EApplicationEnviorment } from '../constant/application';
import logger from './logger';

export default (err: Error | unknown, req: Request, errorStatusCode: 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message : String(err) || responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null,
    };

    //log
    logger.error(`CONTROLLER_ERROR`, {
        meta: errorObj,
    });

    //production env check
    if (config.ENV === EApplicationEnviorment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace;
    }

    return errorObj;
}