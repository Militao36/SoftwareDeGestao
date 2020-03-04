import knex from 'knex';
import dotenv from './dotenv';

export default knex({
    client: 'mysql',
    connection: {
        host: dotenv.HOST,
        user: dotenv.USER,
        password: dotenv.PASSWORD,
        database: dotenv.DATABASE,
    },
});
