import IBoard from '../interfaces/LeaderboardInterfaces';
import LeaderboardAwayServices from './LeaderboardAwayServices';
import LeaderboardHomeServices from './LeaderboardHomeServices';

export default class LeaderboardServices {
  private static modelledTeams = async () => {
    const awayTeams = (await LeaderboardAwayServices.getAll()).message;
    const homeTeams = (await LeaderboardHomeServices.getAll()).message;
    return homeTeams.map((home) => {
      const away = awayTeams.find((team) => team.name === home.name) as IBoard;
      return {
        name: home.name,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws as number + away.totalDraws,
        totalLosses: home.totalLosses as number + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
        goalsBalance: home.goalsBalance + away.goalsBalance,
        efficiency: (((home.totalPoints + away.totalPoints)
          / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
      };
    });
  };

  static async getAll() {
    const unsortedTeams = await this.modelledTeams();
    const goalsOwn = unsortedTeams.sort((a, b) => (a.goalsOwn - b.goalsOwn));
    const goalsFavor = goalsOwn.sort((a, b) => (b.goalsFavor - a.goalsFavor));
    const goalsBalance = goalsFavor.sort((a, b) => (b.goalsBalance - a.goalsBalance));
    const totalVictories = goalsBalance.sort((a, b) => (b.totalVictories - a.totalVictories));
    const totalPoints = totalVictories.sort((a, b) => (b.totalPoints - a.totalPoints));

    return { code: 200, message: totalPoints };
  }
}
