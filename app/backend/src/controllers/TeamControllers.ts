import TeamServices from '../services/TeamServices';

export default class TeamController {
  static async getAllTeams() {
    const result = await TeamServices.getAllTeams();
    return result;
  }

  static async getById(id: number) {
    const result = await TeamServices.getById(id);
    return result;
  }
}
