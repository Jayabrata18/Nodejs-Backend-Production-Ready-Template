/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types/types';

export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    res.status(err.statusCode).json(err);
}