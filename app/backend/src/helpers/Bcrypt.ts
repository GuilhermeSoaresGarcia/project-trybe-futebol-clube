import * as bcrypt from 'bcryptjs';

export default class Bcript {
  static encript(value: string) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
  }

  static async decript(value: string, hash: string) {
    const result = await bcrypt.compare(value, hash);
    return result;
  }
}
