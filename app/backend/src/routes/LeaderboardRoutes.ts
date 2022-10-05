import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardControllers';

const routes = Router();

routes.get('/leaderboard/home', async (_req, res) => {
  const { code, message } = await LeaderboardController.getAllHome();
  res.status(code).json(message);
});

export default routes;