import { Router } from 'express';

import auth from './Middlewares/auth';
import AdminController from './controllers/AdminController';
import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';
import CategoryController from './controllers/CategoryController';

const Admin = new AdminController();
const Session = new SessionController();
const Product = new ProductController();
const Category = new CategoryController();
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

routes.post('/categories', Category.create);
routes.get('/categories', Category.index);
routes.get('/categories/:id', Category.show);
routes.put('/categories/:id', Category.update);
routes.delete('/categories/:id', Category.destroy);

export default routes;
