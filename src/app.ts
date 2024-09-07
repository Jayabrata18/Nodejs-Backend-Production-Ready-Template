import express, { Application, NextFunction, Request, Response, } from 'express';
import path from 'path';
import router from './routers/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constant/responseMessage';
import helmet from 'helmet';
import cors from 'cors';
// import htttpError from './utils/htttpError';

const app: Application = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['X-Custom-Header-1', 'X-Custom-Header-2'],
    // maxAge: 600, // 10 minutes

}));
app.use(express.json());
// static assets in public folder available for everyone
app.use(express.static(path.join(__dirname, '../', 'public')));
//router
app.use('/api/v1', router);
//404 handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, __: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch {
        res.status(404).json({
            success: false,
            statusCode: 404,
            request: {
                ip: req.ip,
                method: req.method,
                url: req.originalUrl,
            },
            message: responseMessage.NOT_FOUND('route'),
            data: {}
        
        });
    }

});
// 404 Handler
// app.use((req: Request, _: Response, next: NextFunction) => {
//     try {
//         throw new Error(responseMessage.NOT_FOUND('route'))
//     } catch (err) {
//         httpError(next, err, req, 404)
//     }
// })

//global error handler
app.use(globalErrorHandler);



export default app;