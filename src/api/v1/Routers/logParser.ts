import { Router } from "express";
import LogParserController from "../Controllers/logParserController";

export default class LogParserRouter {
    private v1router: Router;

    constructor(expressRouter: Router) {
        this.v1router = expressRouter;
        this.createRoutes();
    }

    public getV1Router() {
        return this.v1router;
    }

    private createRoutes() {
        let controller = new LogParserController();
        this.v1router.get("/log-parser", controller.parseLogs);
    }
}