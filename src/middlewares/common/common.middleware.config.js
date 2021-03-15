
class CommonMiddlewareConfig{
    name

    constructor(name) {
        this.name = name
    }

    getName(){
      return this.name
    }

    /**
     * send formatted response
     *
     * @param msg
     * @param data
     * @param status
     */
    s(msg,data,status=200){
        return {message:msg,data:data,status:status}
    }
}

exports.CommonMiddlewareConfig = CommonMiddlewareConfig