import express, { Express } from 'express';
import routes from './routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
