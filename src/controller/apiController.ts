import { Request, Response } from "express";
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";

export default {
    self: (req: Request, res: Response) => {
        try {
            // res.sendStatus(200);
            httpResponse(req, res, 200, responseMessage.SUCCESS, {});
        } catch (error) {
            res.sendStatus(500);
        }
    }
}