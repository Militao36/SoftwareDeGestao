import { config } from 'dotenv';
import { resolve } from 'path'

config({
    path: process.env.TEST ?
        resolve(__dirname, '..', '..', '.env.test') :
        resolve(__dirname, '..', '..', '.env')
});


const dotenv = {
    // .env
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT,
};

export default dotenv;
