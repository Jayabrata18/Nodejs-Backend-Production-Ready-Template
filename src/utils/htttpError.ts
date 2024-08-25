import { NextFunction, Request } from "express";
import errorObject from "./errorObject";

export default function (next: NextFunction, err: Error | unknown, req: Request, errorStatusCode: 500): void {
    const error = errorObject(err, req, errorStatusCode);
    return next(error);
}
// }
// export default function htttpError(
//     next: NextFunction,
//     err: Error | unknown,
//     req: Request,
//     errorStatusCode?: number // Declare without a default here
// ): void {
//     const statusCode = errorStatusCode ?? 500; // Use a default value if none is provided
// const error = errorObject(err, req, statusCode ?? 500);
//     return next(error);
// }