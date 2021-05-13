import express from 'express';
import path from 'path';
import Auth from './Middlewares/Auth';
import ConvertEmptyStringsToNull from './Middlewares/ConvertEmptyStringsToNull';
import Routes from './Routes/routes';

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.set('views', path.join(__dirname, 'views'));
        this.express.set('view engine', 'ejs');
        this.express.use(express.static(path.join(__dirname, 'public')));
        this.express.use(express.json());
        this.express.use(Auth)
        this.express.use(ConvertEmptyStringsToNull)
    }

    routes() {
        this.express.use(Routes);
    }
}

export default new App().express;
