import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
export class UpdateAddressWithoutStateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  lat: number;

  @IsOptional()
  long: number;
}
