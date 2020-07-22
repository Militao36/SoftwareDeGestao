import express from 'express';
import Routes from './Routes/routes';

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(Routes);
    }
}

export default new App().express;
