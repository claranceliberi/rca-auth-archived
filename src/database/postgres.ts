import { Sequelize } from 'sequelize';

export default new Sequelize(
    process.env.POSTGRES_DB as string,
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD as string,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        // dialectOptions: {
        //     connectTimeout: 60000,
        // },
        // pool: {
        //     max: 100,
        //     min: 0,
        //     idle: 200000,
        //     // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
        //     acquire: 1000000,
        // },
    },
);
