/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { NextFunction, Request } from 'express';
import errorObject from './errorObject';
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: 500 = 500): void => {
    const errorObj = errorObject(err, req, errorStatusCode)
    return nextFunc(errorObj)
}
// }
// export default function httpError(
//     next: NextFunction,
//     err: Error | unknown,
//     req: Request,
//     errorStatusCode?: number // Declare without a default here
// ): void {
//     const statusCode = errorStatusCode ?? 500; // Use a default value if none is provided
// const error = errorObject(err, req, statusCode ?? 500);
//     return next(error);
// }