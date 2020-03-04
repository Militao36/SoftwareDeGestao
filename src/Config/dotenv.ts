import { config } from 'dotenv';

config();

const dotenv = {
    // .env
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT,
};

export default dotenv;
