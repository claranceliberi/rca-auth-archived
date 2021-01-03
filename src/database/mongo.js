import {connect} from "mongoose";
import debug from "debug";

const uri = "mongodb://localhost:27018/rca_auth"
const debugLog = debug('mongodb');

function connectMongo(){
    connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => {
        debugLog('✔ connected successfully')
    })
    .catch((err) =>{
        debugLog('❌ connection was not established')
    })
}


export default connectMongo
