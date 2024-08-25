import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import router from './routers/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constant/responseMessage';
import htttpError from './utils/htttpError';

const app: Application = express();

//middleware
app.use(express.json());
// static assets in public folder available for everyone
app.use(express.static(path.join(__dirname, "../", "public")));
//router
app.use("/api/v1", router);
//glibalerror handler
app.use(globalErrorHandler);
//404 handler
// app.use((req: Request, _:Response, next: NextFunction) => {
//    try {
//     throw new Error(responseMessage.NOT_FOUND('route'))
//    } catch (err) {
//    htttpError(next, err, req, 404);
    
//    }
// });

export default app;