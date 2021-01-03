// These are all the attributes in the Client model
import {
    Model,
    Optional
} from "sequelize";

interface AppAttributes{
    id:number;
    name:string;
    redirectUrl:string;
    secretKey:string;
    createdAt:Date;
    updatedAt:Date;

}

// Some attributes are optional in `App.build` and `App.create` calls
interface AppCreationAttributes extends Optional<AppAttributes, "id">{}


export class App extends Model<AppAttributes, AppCreationAttributes> implements AppAttributes{

    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public redirectUrl!: string ;
    public secretKey!:string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
