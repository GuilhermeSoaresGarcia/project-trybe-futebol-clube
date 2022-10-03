import Team from '../database/models/TeamModel';

export default class TeamServices {
  static async getAllTeams() {
    const result = await Team.findAll();
    return { code: 200, message: result };
  }

  static async getById(id: number) {
    const result = await Team.findByPk(id);
    return { code: 200, message: result };
  }
}
