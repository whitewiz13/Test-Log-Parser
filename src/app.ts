import express, { Application } from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import LogParserRouter from './api/v1/Routers/logParser';
const router = express.Router();

export default class App {
    private app: Application;
    private port: Number;

    constructor() {
        this.app = express();
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.port = 4000;
        this.registerRoutes();
    }

    public getPort() {
        return this.port;
    }

    public getApp() {
        return this.app;
    }

    private registerRoutes() {
        let logParserRouter = new LogParserRouter(router);
        this.app.use('/api/v1/', logParserRouter.getV1Router());
    }

}