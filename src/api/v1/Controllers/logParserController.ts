import { NextFunction, Request, Response } from "express";

export default class LogParserController {

    public parseLogs(req: Request, res: Response, next: NextFunction) {
        res.send({ message: 'No bbb Found' });
    }
}