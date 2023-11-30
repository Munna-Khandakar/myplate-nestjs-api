import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreatePlateDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly images: string;

  @IsNumber()
  @IsNotEmpty()
  readonly category: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: string;

  @IsObject()
  readonly address: CreateAddressDto;
}
