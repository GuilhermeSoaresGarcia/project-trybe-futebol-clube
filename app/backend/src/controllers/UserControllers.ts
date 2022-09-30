import UserServices from '../services/UserServices';

export default class UserController {
  static async login(email: string, password: string) {
    const result = await UserServices.login(email, password);
    return result;
  }

  static async getRole(id: number): Promise<object> {
    const result = await UserServices.getRole(id);
    return result;
  }
}
