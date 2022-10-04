import MatchServices from '../services/MatchServices';
import { INewMatch, IEditMatch } from '../interfaces/MatchInterfaces';

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
    if (data.awayTeam === data.homeTeam) {
      return {
        code: 401,
        message: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const result = await MatchServices.createNewMatch(data);
    return result;
  }

  static async endAMatch(id: number) {
    const result = await MatchServices.endAMatch(id);
    return result;
  }

  static async editAMatch(data: IEditMatch) {
    const result = await MatchServices.editAMatch(data);
    return result;
  }
}
