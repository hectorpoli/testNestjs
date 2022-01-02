import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { User } from '../../entity/user.entity';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(forwardRef(() => UserService)) private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getAuthenticatedUser(email, password);
    if (user) return user;
    return null;
  }

  async login(user: User) {
    if (user.isActive) {
      const payload = {
        email: user.email,
        sub: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: plainToClass(User, user),
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      };
    } else {
      throw new HttpException(
        'The user you entered does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
