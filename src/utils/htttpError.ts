import { NextFunction, Request } from "express";
import errorObject from "./errorObject";

export default (next: NextFunction, err: Error| unknown, req: Request, errorStatusCode: 500 = 500): void => {
    const error = errorObject(err, req, errorStatusCode);
    return  next(error)

}