import { IsNotEmpty, IsString } from 'class-validator';

export class LoggingDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  typeMessage: string;
}
