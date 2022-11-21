import { NextFunction, Request, Response } from "express";
import readline from 'readline';
import stream from 'stream';

export default class LogParserController {

    public async parseLogs(req: Request, res: Response, next: NextFunction) {
        try {
            var bufferStream = new stream.PassThrough();
            let parsedData: { timestamp: number; loglevel: string; transactionId: string; }[] = [];
            let count = 0;
            let invalidCount = 0;
            let invalidLines = [];

            bufferStream.end(req?.file?.buffer);
            var rl = readline.createInterface({
                input: bufferStream,
            });
            for await (const line of rl) {
                count++;
                if (!line) {
                    continue;
                }
                if (!line.split('- ')[1] || !line.split('- ')[2] || !line.split('- ')[0]) {
                    //Ignore invalid data
                    invalidCount++;
                    invalidLines.push(count);
                    continue;
                }
                let logLevel = line.split('- ')[1].trim();
                if (logLevel === "error" || logLevel === "warn") {
                    try {
                        let date = line.split('- ')[0].trim();
                        let jsonData = JSON.parse(line.split('- ')[2].trim());
                        let item = {
                            timestamp: Math.floor(new Date(date).getTime() / 1000),
                            loglevel: logLevel,
                            transactionId: jsonData?.transactionId,
                            err: jsonData?.err
                        }
                        parsedData.push(item);
                    } catch (error: any) {
                        //Ignore invalid JSON
                        invalidCount++;
                        invalidLines.push(count);
                    }
                }
            }
            let dataToSend = {
                data: parsedData,
                status: "SUCCESS",
                message: `Data fetched successfully (Invalid logs found ${invalidCount} at lines ${invalidLines.map((i) => i)})`
            }
            return res.status(200).json(dataToSend);
        } catch (error: any) {
            let dataToSend = {
                data: null,
                status: "ERROR",
                message: error?.message
            }
            return res.status(500).json(dataToSend);
        }
    }
}