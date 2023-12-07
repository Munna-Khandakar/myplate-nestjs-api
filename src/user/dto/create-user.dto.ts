import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly otp: string;
}

export class CreateOtpDto {
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
