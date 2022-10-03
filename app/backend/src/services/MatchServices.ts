// import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class UserServices {
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
}
