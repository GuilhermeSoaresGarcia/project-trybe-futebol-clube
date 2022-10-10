import IBoard from '../interfaces/LeaderboardInterfaces';
import LeaderboardAwayServices from './LeaderboardAwayServices';
import LeaderboardHomeServices from './LeaderboardHomeServices';

export default class LeaderboardServices {
  private static modelledTeams = async () => {
    const awayTeams = (await LeaderboardAwayServices.getAll()).message;
    const homeTeams = (await LeaderboardHomeServices.getAll()).message;
    return homeTeams.map((team) => {
      const away = awayTeams.find((awayTeamName) => awayTeamName.name === team.name) as IBoard;
      return {
        name: team.name,
        totalPoints: team.totalPoints + away.totalPoints,
        totalGames: team.totalGames + away.totalGames,
        totalVictories: team.totalVictories + away.totalVictories,
        totalDraws: team.totalDraws as number + away.totalDraws,
        totalLosses: team.totalLosses as number + away.totalLosses,
        goalsFavor: team.goalsFavor + away.goalsFavor,
        goalsOwn: team.goalsOwn + away.goalsOwn,
        goalsBalance: team.goalsBalance + away.goalsBalance,
        efficiency: (((team.totalPoints + away.totalPoints)
          / ((team.totalGames + away.totalGames) * 3)) * 100).toFixed(2),
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
