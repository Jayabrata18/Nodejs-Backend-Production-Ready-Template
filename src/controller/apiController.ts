import { NextFunction, Request, Response } from "express";
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import htttpError from "../utils/htttpError";

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            // res.sendStatus(200);
            httpResponse(req, res, 200, responseMessage.SUCCESS, {});
        } catch (error) {
            htttpError(next, error, req, 500);
        }
    }
}