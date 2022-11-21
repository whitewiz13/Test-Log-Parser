import express from 'express';
export const app = express();
const router = express.Router();
export const port = 3000;

import LogParserRouter from './api/v1/Routers/logParser';


app.use('/api/v1/', new LogParserRouter(router).getV1Router());