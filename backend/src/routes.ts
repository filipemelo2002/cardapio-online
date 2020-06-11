import { Router } from 'express';

import AdminController from './controllers/AdminController';

const Admin = new AdminController();
const routes = Router();

routes.post('/admins', Admin.create);
routes.get('/admins/:id', Admin.show);
routes.put('/admins/:id', Admin.update);
routes.delete('/admins/:id', Admin.destroy);
routes.get('/admins', Admin.index);

export default routes;
