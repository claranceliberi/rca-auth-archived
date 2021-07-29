import {Express, Request,  Response, NextFunction} from 'express'

declare namespace Express {
    export interface Request{}
    export interface Response{}
    export interface Request{}
}