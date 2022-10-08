import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class LeaderboardHomeServices {
  private static getTeamData = async () => {
    const data = await Team.findAll({
      include: [{
        model: Match,
        as: 'homeTeam',
        where: { inProgress: 0 },
      },
      {
        model: Match,
        as: 'awayTeam',
        where: { inProgress: 0 },
      },
      ],
    });
    return data;
  };

  private static goalStats = async () => {
    const allTeams = await this.getTeamData();
    const result = allTeams.map((team) => {
      const goalsFavor = team.homeTeam?.reduce((acc, curr) =>
        acc + curr.homeTeamGoals, 0) as number;
      const goalsOwn = team.homeTeam?.reduce((acc, curr) =>
        acc + curr.awayTeamGoals, 0) as number;
      const goalsBalance = goalsFavor - goalsOwn;
      const obj = { goalsFavor, goalsOwn, goalsBalance };
      return { ...obj };
    });
    return result;
  };

  private static teamStats = async () => {
    const allTeams = await this.getTeamData();
    const result = allTeams.map((team) => {
      const totalVictories = team.homeTeam?.filter(
        (match: Match) => (match.homeTeamGoals > match.awayTeamGoals),
      ).length as number;
      const totalDraws = team.homeTeam?.filter((match: Match) =>
        match.homeTeamGoals === match.awayTeamGoals).length;
      const totalPoints = (totalVictories as number) * 3 + (totalDraws as number);
      const totalLosses = team.homeTeam?.filter((match: Match) =>
        match.homeTeamGoals < match.awayTeamGoals).length;
      const totalGames = team.homeTeam?.length as number;
      const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      const obj = { totalVictories, totalDraws, totalPoints, totalLosses, totalGames, efficiency };
      return { ...obj, name: team.teamName };
    });
    return result;
  };

  private static modelledTeams = async () => {
    const teamGoals = await this.goalStats();
    const teamStats = await this.teamStats();
    const result = teamStats.map((stats, index) => ({ ...stats, ...teamGoals[index] }));
    return result;
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
