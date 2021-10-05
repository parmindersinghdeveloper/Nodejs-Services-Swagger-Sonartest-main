import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CoinAttributes {
    id?: number;
    chart_name: string;
    currency_code: string;
    currency_symbol: string;
    currency_rate: string;
    currency_description: string;
    currency_float: number;
    created_on?: Date;
    updated_on?: Date;
}
export interface CoinModel extends Model<CoinAttributes>, CoinAttributes {}
export class Coin extends Model<CoinModel, CoinAttributes> {}

export type CoinStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CoinModel;
};

export function CoinFactory (sequelize: Sequelize): CoinStatic {
    return <CoinStatic>sequelize.define("coins", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chart_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_rate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_float: {
            type: DataTypes.FLOAT,
            allowNull: false,
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
        tableName: 'tble_coin_chart',
        createdAt: 'created_on',
        updatedAt: 'updated_on',
    });
}