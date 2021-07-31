import { Sequelize } from 'sequelize';

export interface sequelizeDB {
    sequelize?: Sequelize;
    Sequelize?: any;
    [key: string]: any;
}

export interface User {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export type ClientBody = User;
