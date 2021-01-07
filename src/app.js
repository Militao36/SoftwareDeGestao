import express from 'express';
import Routes from './Routes/routes';
import path from 'path'
import Auth from './Middlewares/Auth'

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
        this.express.use(Auth)
        this.express.use(express.json());
    }

    routes() {
        this.express.use(Routes);
    }
}

export default new App().express;
