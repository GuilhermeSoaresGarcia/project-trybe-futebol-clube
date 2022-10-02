import * as express from 'express';
import UserController from './controllers/UserControllers';
import TeamController from './controllers/TeamControllers';
import Token from './helpers/Token';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const { code, message } = await UserController.login(email, password);
      res.status(code).json(message);
    });

    this.app.get('/login/validate', Token.validateToken, async (req, res) => {
      const { id } = req.body.user;
      const { code, message } = await UserController.getRole(id);
      res.status(code).json(message);
    });

    this.app.get('/teams', async (req, res) => {
      const { code, message } = await TeamController.getAllTeams();
      res.status(code).json(message);
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
