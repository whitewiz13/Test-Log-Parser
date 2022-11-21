import { Router } from "express";
import LogParserController from "../Controllers/logParserController";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
        this.v1router.post("/log-parser", upload.single("file"), controller.parseLogs);
    }
}