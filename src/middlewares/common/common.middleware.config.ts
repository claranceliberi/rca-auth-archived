import {CustomResponse} from '../../types/controller.types'

export class CommonMiddlewareConfig {
    private name : string

    constructor(name :string) {
        this.name = name
    }

    getName() {
      return this.name
    }

    /**
     * send formatted response
     *
     * @param msg
     * @param data
     * @param status
     */
    s(msg : string,data : any,status=200) : CustomResponse {
        return {message:msg,data:data,status:status}
    }
}