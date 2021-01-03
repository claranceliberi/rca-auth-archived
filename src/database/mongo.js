import {connect} from "mongoose";
import debug,{IDebugger} from "debug";

const uri: string = "mongodb://localhost:27018/rca_auth"
const debugLog:IDebugger = debug('mongodb');

function connectMongo(){
    connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res:any) => {
        debugLog('✔ connected successfully')
    })
    .catch((err:any) =>{
        debugLog('❌ connection was not established')
    })
}


export default connectMongo
