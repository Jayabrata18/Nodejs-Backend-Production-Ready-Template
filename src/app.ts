import express, { Application } from 'express';
import path from 'path';
import router from './routers/apiRouter';

const app: Application = express();

//middleware
app.use(express.json());
// static assets in public folder available for everyone
app.use(express.static(path.join(__dirname, "../", "public")));
//router
app.use("/api/v1", router);

export default app;