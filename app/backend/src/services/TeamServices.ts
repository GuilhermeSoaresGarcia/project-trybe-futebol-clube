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

  static async getById(id: number) {
    const result = await Team.findByPk(id);
    return { code: 200, message: result };
  }
}
