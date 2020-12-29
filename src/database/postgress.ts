import {Pool} from 'pg'


export class Pg{

    cn = () => {
        return new Pool({
            max:20,
            connectionString:'postgres://liberi:liberI@111@localhost:5432/rca-auth',
            idleTimeoutMillis: 30000
        })
    }
}