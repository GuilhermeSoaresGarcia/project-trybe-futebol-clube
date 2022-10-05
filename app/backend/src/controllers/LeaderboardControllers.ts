import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  static async getAllHome() {
    const result = await LeaderboardServices.getAllHome();
    return result;
  }
}
