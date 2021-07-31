import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { sequelizeDB } from '../../../types/models.types';
const basename = path.basename(module.filename);
const db: sequelizeDB = {};
const env: string = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`${__dirname}/../config/config.json`)[env];

const sequelize: Sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable] as string)
    : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name as string] = model;
    });

Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
