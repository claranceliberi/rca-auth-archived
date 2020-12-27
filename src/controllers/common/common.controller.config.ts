import {NextFunction,Request, Response} from "express";

export abstract class CommonControllerConfig{
    name:string;


    protected constructor( name:string) {
        this.name = name
    }

    getName(){
      return  this.name
    }

    /**
     * send formatted response
     *
     * @param msg
     * @param data
     * @param status
     */
    s(msg:string,data:any,status:number=200): object{
        return {message:msg,data:data,status:status}
    }

    abstract get(req:Request,res:Response,next:NextFunction):void

    abstract create(req:Request,res:Response,next:NextFunction):void

    abstract delete(req:Request,res:Response,next:NextFunction):void

    abstract update(req:Request,res:Response,next:NextFunction):void

    abstract all(req:Request,res:Response,next:NextFunction):void
}