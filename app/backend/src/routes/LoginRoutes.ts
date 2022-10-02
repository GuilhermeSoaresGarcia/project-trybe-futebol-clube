import { Router } from 'express';
import UserController from '../controllers/UserControllers';
import Token from '../helpers/Token';

const routes = Router();

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { code, message } = await UserController.login(email, password);
  res.status(code).json(message);
});

routes.get('/login/validate', Token.validateToken, async (req, res) => {
  const { id } = req.body.user;
  const { code, message } = await UserController.getRole(id);
  res.status(code).json(message);
});

export default routes;
