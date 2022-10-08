import LeaderboardHomeServices from '../services/LeaderboardHomeServices';
import LeaderboardAwayServices from '../services/LeaderboardAwayServices';

export default class LeaderboardControllers {
  static async getAllHome() {
    const result = await LeaderboardHomeServices.getAll();
    return result;
  }

  static async getAllAway() {
    const result = await LeaderboardAwayServices.getAll();
    return result;
  }
}
