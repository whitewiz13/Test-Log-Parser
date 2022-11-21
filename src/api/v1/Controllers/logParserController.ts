import { NextFunction, Request, Response } from "express";
import multer from 'multer';

const upload = multer.memoryStorage();

export default class LogParserController {

    public parseLogs(req: Request, res: Response, next: NextFunction) {
        try {
            let logData = req?.file?.buffer.toString('utf8') || "";
            console.log(logData);
            for (let char of logData) {
                //console.log(logData[i]);
            }
            return res.status(200).json(logData);
        } catch (error) {
            let dataToSend = {
                data: null,
                status: "ERROR",
                message: error
            }
            return res.status(500).json(dataToSend);
        }
    }
}