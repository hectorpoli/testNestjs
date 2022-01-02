import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: string;

  @ApiProperty()
  createAt: Date;
}

export class LoginResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  expiresIn: string;
}
