import Match from '../database/models/MatchModel';
import INewMatch from '../interfaces/MatchInterfaces';

export default class MatchServices {
  static async getAllMatches() {
    const result = await Match.findAll(
      {
        include: [
          {
            association: 'teamHome',
            attributes: ['teamName'],
          },
          {
            association: 'teamAway',
            attributes: ['teamName'],
          },
        ],
      },
    );
    return { code: 200, message: result };
  }

  static async getMatchesInProgress(value: string) {
    function verifyBoolean() {
      if (value === 'true') return 1;
      if (value === 'false') return 0;
    }
    const result = await Match.findAll(
      {
        include: [
          {
            association: 'teamHome', attributes: ['teamName'],
          },
          {
            association: 'teamAway', attributes: ['teamName'],
          },
        ],
        where: { inProgress: verifyBoolean() },
      },
    );
    return { code: 200, message: result };
  }

  static async createNewMatch(data: INewMatch) {
    const {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    } = data;
    const result = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });
    return { code: 201, message: result };
  }
}
