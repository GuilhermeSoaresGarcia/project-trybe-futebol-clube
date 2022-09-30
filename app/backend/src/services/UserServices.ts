import Token from '../helpers/Token';
import User from '../database/models/UserModel';
import Bcript from '../helpers/Bcrypt';

export default class UserServices {
  static validateEmail(value: string): any {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const result = value.match(regex);
    if (!result) return { code: 400, message: { message: 'All fields must be filled' } };
    return result;
  }

  static validatePassword(value: string): any {
    if (value.length > 6) return value;
    return { code: 400, message: { message: 'All fields must be filled' } };
  }

  static async login(email: string, password: string) {
    const validEmail = this.validateEmail(email);
    if (validEmail.code === 400) return validEmail;
    const validPass = this.validatePassword(password);
    if (validPass.code === 400) return validPass;
    const data = await User.findOne({ where: { email: validEmail } });
    if (!data) return { code: 401, message: { message: 'Incorrect email or password' } };
    const checkPassword = await Bcript.decript(password, data?.password as string);
    if (checkPassword) {
      const token = await Token.generateToken(data);
      return { code: 200, message: { token } };
    }
    return { code: 401, message: { message: 'Incorrect email or password' } };
  }

  static async getRole(id: number): Promise<object> {
    const { role } = await User.findByPk(id) as User;
    return { code: 200, message: { role } };
  }
}
