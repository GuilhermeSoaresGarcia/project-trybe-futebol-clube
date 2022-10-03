import MatchServices from '../services/MatchServices';

export default class TeamController {
  static async getAllMatches() {
    const result = await MatchServices.getAllMatches();
    return result;
  }
}