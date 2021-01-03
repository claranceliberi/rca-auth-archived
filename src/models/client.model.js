import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";
import {App} from "./app.config";
import pgConnection from '../database/postgress'



// These are all the attributes in the Client model
interface ClientAttributes{
    id:number;
    firstName:string;
    secondName:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;

}

// Some attributes are optional in `Client.build` and `Client.create` calls
interface ClientCreationAttributes extends Optional<ClientAttributes, "id">{}


class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes{

    constructor() {
        super()

        Client.init(
              {
                id: {
                  type: DataTypes.INTEGER.UNSIGNED,
                  autoIncrement: true,
                  primaryKey: true,
                },
                firstName: {
                  type: new DataTypes.STRING(50),
                  allowNull: false,
                },
                secondName: {
                  type: new DataTypes.STRING(50),
                  allowNull: false,
                },
                email:{
                    type: new DataTypes.STRING(50),
                    allowNull:false,
                },
                password:{
                    type: new DataTypes.STRING(500),
                    allowNull:false
                },
                  createdAt:{
                    type: new DataTypes.DATE(),
                    defaultValue:Date.now(),
                    allowNull:true,
                  },
                  updatedAt:{
                    type: new DataTypes.DATE(),
                    defaultValue:Date.now(),
                    allowNull:true,
                  }
              },
              {
                  pgConnection, // passing the `sequelize` instance is required
              }
        )
    }

    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public firstName!: string;
    public secondName!: string ;
    public email!:string;
    public password!:string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getApps!: HasManyGetAssociationsMixin<App>; // Note the null assertions!
    public addApp!: HasManyAddAssociationMixin<App, number>;
    public hasApp!: HasManyHasAssociationMixin<App, number>;
    public countApps!: HasManyCountAssociationsMixin;
    public createApp!: HasManyCreateAssociationMixin<App>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly projects?: App[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        projects: Association<Client, App>;
    };
}



Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "projects",
  }
);

Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    secondName: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    email:{
        type: new DataTypes.STRING(50),
        allowNull:false,
    },
    password:{
        type: new DataTypes.STRING(500),
        allowNull:false
    }
  },
  {
    pgConnection, // passing the `sequelize` instance is required
  }
);

Address.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "address",
    sequelize, // passing the `sequelize` instance is required
  }
);

// And with a functional approach defining a module looks like this
const Note: ModelDefined<
  NoteAttributes,
  NoteCreationAttributes
> = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(64),
      defaultValue: 'Unnamed Note',
    },
    content: {
      type: new DataTypes.STRING(4096),
      allowNull: false,
    },
  },
  {
    tableName: 'notes',
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Project, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "projects", // this determines the name in `associations`!
});

Address.belongsTo(User, { targetKey: "id" });
User.hasOne(Address, { sourceKey: "id" });

async function doStuffWithUser() {
  const newUser = await User.create({
    name: "Johnny",
    preferredName: "John",
  });
  console.log(newUser.id, newUser.name, newUser.preferredName);

  const project = await newUser.createProject({
    name: "first!",
  });

  const ourUser = await User.findByPk(1, {
    include: [User.associations.projects],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  });

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(ourUser.projects![0].name);
}
Usage without strict types for attributes
The typings for Sequelize v5 allowed you to define models without specifying types for the attributes. This is still possible for backwards compatibility and for cases where you feel strict typing for attributes isn't worth it.

NOTE: Keep the following code in sync with typescriptDocs/ModelInitNoAttributes.ts to ensure it typechecks correctly.

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");

class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public preferredName!: string | null; // for nullable fields
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    preferredName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

async function doStuffWithUserModel() {
  const newUser = await User.create({
    name: "Johnny",
    preferredName: "John",
  });
  console.log(newUser.id, newUser.name, newUser.preferredName);

  const foundUser = await User.findOne({ where: { name: "Johnny" } });
  if (foundUser === null) return;
  console.log(foundUser.name);
}
Usage of sequelize.define
In Sequelize versions before v5, the default way of defining a model involved using sequelize.define. It's still possible to define models with that, and you can also add typings to these models using interfaces.

NOTE: Keep the following code in sync with typescriptDocs/Define.ts to ensure it typechecks correctly.

import { Sequelize, Model, DataTypes, Optional } from "sequelize";

const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");

// We recommend you declare an interface for the attributes, for stricter typechecking
interface UserAttributes {
  id: number;
  name: string;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const UserModel = sequelize.define<UserInstance>("User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
});

async function doStuff() {
  const instance = await UserModel.findByPk(1, {
    rejectOnEmpty: true,
  });
  console.log(instance.id);
}