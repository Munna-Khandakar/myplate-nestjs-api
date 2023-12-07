import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
