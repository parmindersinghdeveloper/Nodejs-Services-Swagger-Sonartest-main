import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    user_id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    password_hint: string;
    access_token: string;
    created_on?: Date;
    updated_on?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hint: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        tableName: 'tbl_user',
        createdAt: 'created_on',
        updatedAt: 'updated_on',
    });
}