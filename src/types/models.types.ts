import {Sequelize} from 'sequelize'

export interface sequelizeDB  {
    sequelize?: Sequelize
    Sequelize?: any
    [key: string]: any
}


export type UserType = {
    email? : string
    id?:string
}