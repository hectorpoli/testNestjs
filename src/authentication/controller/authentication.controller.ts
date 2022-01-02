import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogInDto } from '../dto/authentication.dto';
import { LoginResponse } from '../response/authentication.response';
import { AuthenticationService } from '../service/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @ApiOperation({
    summary:
      'The email and the password are received, it is validated, and the access token is sent',
  })
  @ApiResponse({
    description: 'Login response',
    type: LoginResponse,
    status: 202,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() payload: LogInDto) {
    const user = await this.authService.validateUser(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.authService.login(user);
  }
}
