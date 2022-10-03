import MatchServices from '../services/MatchServices';
import INewMatch from '../interfaces/MatchInterfaces';

export default class MatchController {
  static async getAllMatches() {
    const result = await MatchServices.getAllMatches();
    return result;
  }

  static async getMatchesInProgress(value: string) {
    const result = await MatchServices.getMatchesInProgress(value);
    return result;
  }

  static async createNewMatch(data: INewMatch) {
    const result = await MatchServices.createNewMatch(data);
    return result;
  }
}
