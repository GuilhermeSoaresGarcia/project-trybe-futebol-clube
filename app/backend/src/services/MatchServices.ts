import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { INewMatch, IEditMatch } from '../interfaces/MatchInterfaces';

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
    const existingTeams = await Team.findAll(
      {
        where:
          { id: [data.awayTeam, data.homeTeam] },
      },
    );

    if (existingTeams.length < 2) {
      return { code: 404, message: { message: 'There is no team with such id!' } };
    }

    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = data;
    const result = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });
    return { code: 201, message: result };
  }

  static async endAMatch(id: number) {
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    return { code: 200, message: { message: 'Finished' } };
  }

  static async editAMatch(data: IEditMatch) {
    await Match.update(
      {
        homeTeamGoals: data.homeTeamGoals,
        awayTeamGoals: data.awayTeamGoals,
      },
      { where: { id: data.id } },
    );
    return {
      code: 200,
      message: { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
    };
  }
}
