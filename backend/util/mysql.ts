import { Sequelize } from 'sequelize';

export const connectMySQL = (): Sequelize => {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT as string) || 3306;
    const username = process.env.DB_USERNAME || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_DATABASE || 'test';

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
    return sequelize;
};

export const DB = connectMySQL();
