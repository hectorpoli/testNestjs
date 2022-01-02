import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NewUserDto } from '../dto/user.dto';
import { UserService } from './../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  @Version('1')
  async getProfileV1() {
    const resp = {
      user: await this.userService.findAll(),
      toke: 'token',
    };
    return resp;
  }

  @Get()
  @Version('2')
  async getProfileV2() {
    const resp = {
      user: await this.userService.findOne({ id: 1 }),
      toke: 'token',
      braintreeToken: 'token braintree',
    };
    return resp;
  }

  @Get()
  @Version('3')
  async getProfileV3() {
    throw new HttpException('Prueba de error', HttpStatus.NOT_FOUND);
  }

  @Post()
  @Version('1')
  @ApiBody({ type: NewUserDto })
  async save(@Body() payload: NewUserDto) {
    return await this.userService.save(payload);
  }
}
