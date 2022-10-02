import TeamServices from '../services/TeamServices';

export default class TeamController {
  static async getAllTeams() {
    const result = await TeamServices.getAllTeams();
    return result;
  }
}
