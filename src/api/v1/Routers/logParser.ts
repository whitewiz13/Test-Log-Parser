import { Router } from "express";

export default class LogParserRouter {
    v1router: Router;

    constructor(expressRouter: Router) {
        this.v1router = expressRouter;
        this.createRoutes();
    }

    getV1Router() {
        return this.v1router;
    }

    createRoutes() {
        this.v1router.get("/log-parser", (req: any, res: any, next: any) => {
            res.send({ message: 'No bb Found' });
        });
    }
}