
class CommonControllerConfig{
    name;


    /**
     * Parent class that has common controllers features
     *
     * @constructor
     *
     * @param name : name of the controller
     */
    constructor( name) {
        this.name = name
    }

    /**
     * get name of the controller
     * @returns {*}
     */
    getName(){
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
    s(msg,data,status=200){
        return {message:msg,data:data,status:status}
    }

}

exports.CommonControllerConfig = CommonControllerConfig