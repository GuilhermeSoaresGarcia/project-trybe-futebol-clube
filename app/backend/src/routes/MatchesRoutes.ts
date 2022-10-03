import { Router } from 'express';
import MatchController from '../controllers/MatchControllers';

const routes = Router();

routes.get('/matches', async (req, res) => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const { code, message } = await MatchController.getAllMatches();
    return res.status(code).json(message);
  }
  const { code, message } = await MatchController
    .getMatchesInProgress(inProgress as string);
  return res.status(code).json(message);
});

export default routes;
