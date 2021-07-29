import { Request } from "express"
import { ClientBody } from "./models.types"

export type CustomResponse = {
    message:string
    data:any
    status: number
}

export type UserInToken = {
    email? : string
    username? : string
    id?:string
}

export interface CustomClientRequest extends Request{
    body : ClientBody
}