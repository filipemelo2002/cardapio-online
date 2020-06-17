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
routes.put('/admins/:id', auth, Admin.update);
routes.delete('/admins/:id', auth, Admin.destroy);
routes.get('/admins', auth, Admin.index);
routes.post('/admins/login', Session.create);

routes.post('/products', auth, Product.create);
routes.get('/products', Product.index);
routes.get('/products/:id', Product.show);
routes.put('/products/:id', auth, Product.update);
routes.delete('/products/:id', auth, Product.destroy);

routes.post('/categories', auth, Category.create);
routes.get('/categories', Category.index);
routes.get('/categories/:id', Category.show);
routes.put('/categories/:id', auth, Category.update);
routes.delete('/categories/:id', auth, Category.destroy);

export default routes;
