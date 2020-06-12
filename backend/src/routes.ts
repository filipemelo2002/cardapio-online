import { Router } from 'express';

import auth from './Middlewares/auth';
import AdminController from './controllers/AdminController';
import SessionController from './controllers/SessionController';

const Admin = new AdminController();
const Session = new SessionController();
const routes = Router();

routes.post('/admins', Admin.create);
routes.get('/admins/:id', auth, Admin.show);
routes.put('/admins/:id', Admin.update);
routes.delete('/admins/:id', Admin.destroy);
routes.get('/admins', Admin.index);
routes.post('/admins/login', Session.create);
export default routes;
