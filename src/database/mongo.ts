import mongoose from 'mongoose';
import debug from 'debug';

const uri = `mongodb://${process.env.MONGO_HOST}/rca_auth`;
const debugLog = debug('mongodb');
const { connect } = mongoose;

export default function connectMongo(): void {
    connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            debugLog('✔ connected successfully');
        })
        .catch(() => {
            debugLog('❌ connection was not established');
        });
}
