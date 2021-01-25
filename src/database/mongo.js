const mongoose = require("mongoose");
const debug = require("debug");

const uri = "mongodb://localhost:27018/rca_auth"
const debugLog = debug('mongodb');
const {connect} = mongoose

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


module.exports =  connectMongo
