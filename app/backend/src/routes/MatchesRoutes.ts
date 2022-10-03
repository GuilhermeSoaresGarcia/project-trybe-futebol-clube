import { Router } from 'express';
import MatchController from '../controllers/MatchControllers';

const routes = Router();

routes.get('/matches', async (_req, res) => {
  const { code, message } = await MatchController.getAllMatches();
  res.status(code).json(message);
});

export default routes;
