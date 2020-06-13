import { Router } from 'express';

import auth from './Middlewares/auth';
import AdminController from './controllers/AdminController';
import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';

const Admin = new AdminController();
const Session = new SessionController();
const Product = new ProductController();
const routes = Router();

routes.post('/admins', Admin.create);
routes.get('/admins/:id', auth, Admin.show);
routes.put('/admins/:id', Admin.update);
routes.delete('/admins/:id', Admin.destroy);
routes.get('/admins', Admin.index);
routes.post('/admins/login', Session.create);

routes.post('/products', Product.create);
routes.get('/products', Product.index);
routes.get('/products/:id', Product.show);
routes.put('/products/:id', Product.update);
routes.delete('/products/:id', Product.destroy);

export default routes;
