import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('RequestLoggerMiddleware');
    

    use(req:Request, res : Response, next:NextFunction){
        const {method , originalUrl, body,params,query} = req;
        const timestamp = new Date().toLocaleString();

        this.logger.log(`[${timestamp}] ${method} ${originalUrl}`);
        this.logger.log('Body:',body);
        this.logger.log('Params: ',params);
        this.logger.log('Query:',query);

        res.on('finish',()=>{
            const {statusCode} = res;
            if(statusCode>=200 && statusCode < 400) {
                this.logger.log(`[${timestamp} ] ${method} ${originalUrl} - Success`)
            }else{
                this.logger.error(`[${timestamp}] ${method} ${originalUrl} - Error (${statusCode})`)
            }
        });
        next();
    }
}