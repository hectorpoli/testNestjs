import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindConditions, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { NewUserDto } from './../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(criteria: FindConditions<User>): Promise<User> {
    return this.usersRepository.findOne({ where: criteria });
  }

  async save(data: NewUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const newElement = this.usersRepository.create(data);
      return await this.usersRepository.save(newElement);
    } catch (error) {
      throw new HttpException(
        'Something went wrong ' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: email },
      });
      if (!user)
        throw new HttpException(
          `The user does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(criteria: FindConditions<User>): Promise<void> {
    await this.usersRepository.delete(criteria);
  }
}
