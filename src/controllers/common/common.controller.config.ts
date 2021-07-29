import {CustomResponse} from '../../types/controller.types'

export class CommonControllerConfig{
    name:string;


    /**
     * Parent class that has common controllers features
     *
     * @constructor
     *
     * @param name : name of the controller
     */
    constructor( name : string) {
        this.name = name
    }

    /**
     * get name of the controller
     * @returns {*}
     */
    getName() : string{
      return  this.name
    }

    /**
     * Formatted output
     *
     * @param msg : string message to be outputted
     * @param data : string data (json) to be returned
     * @param status : number response status
     *
     * @returns {{data, message, status: number}}
     */
    s(msg : string,data : any,status : number=200) : CustomResponse{
        return {message:msg,data:data,status:status}
    }

}

