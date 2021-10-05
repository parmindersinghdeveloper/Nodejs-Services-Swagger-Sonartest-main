import * as sequelize from "sequelize";
export const dbConfig = new sequelize.Sequelize(
    (process.env.DB_NAME = "******"),
    (process.env.DB_USER = "******"),
    (process.env.DB_PASSWORD = "*******"),
    {
        port: Number(process.env.DB_PORT) || 5432,
        host: process.env.DB_HOST,
        dialect: "postgres",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);

