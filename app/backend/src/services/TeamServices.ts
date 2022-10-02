import Team from '../database/models/TeamModel';

// interface ITeamServicesResponse {
//   id: number,
//   teamName: string
// }

export default class UserServices {
  static async getAllTeams() {
    const result = await Team.findAll();
    return { code: 200, message: result };
  }
}
