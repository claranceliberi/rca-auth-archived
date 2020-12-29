
export class CommonMiddlewareConfig{
    name:string

    constructor(name:string) {
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
}