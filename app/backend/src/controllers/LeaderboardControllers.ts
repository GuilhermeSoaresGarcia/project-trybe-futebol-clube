import LeaderboardHomeServices from '../services/LeaderboardHomeServices';
import LeaderboardAwayServices from '../services/LeaderboardAwayServices';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardControllers {
  static async getAllHome() {
    const result = await LeaderboardHomeServices.getAll();
    return result;
  }

  static async getAllAway() {
    const result = await LeaderboardAwayServices.getAll();
    return result;
  }

  static async getAll() {
    const result = await LeaderboardServices.getAll();
    return result;
  }
}
