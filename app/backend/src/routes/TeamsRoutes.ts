import { Router } from 'express';
import TeamController from '../controllers/TeamControllers';

const routes = Router();

routes.get('/teams', async (_req, res) => {
  const { code, message } = await TeamController.getAllTeams();
  res.status(code).json(message);
});

routes.get('/teams/:id', async (req, res) => {
  const { id } = req.params;
  const { code, message } = await TeamController.getById(id as unknown as number);
  res.status(code).json(message);
});

export default routes;
