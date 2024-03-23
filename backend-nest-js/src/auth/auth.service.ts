import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!(user instanceof User)) {
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    
    if (!bcrypt.compareSync(password, user.user_password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.user_id, name: user.user_name, lastName: user.user_lastname, email: user.user_email };

    return { access_token: await this.jwtService.signAsync(payload) };

  }
}
