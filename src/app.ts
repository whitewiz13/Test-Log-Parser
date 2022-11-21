import express, { Application } from 'express';
import LogParserRouter from './api/v1/Routers/logParser';
const router = express.Router();

export default class App {
    private app: Application;
    private port: Number;

    constructor() {
        this.app = express();
        this.port = 3000;
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