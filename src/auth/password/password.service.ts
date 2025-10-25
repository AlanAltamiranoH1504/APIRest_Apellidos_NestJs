import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  // * Hasheo de password
  async hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  // * Check de passwords
  async chechPasswords(password_string: string, password_hash: string) {
    return bcrypt.compare(password_hash, password_hash);
  }
}
