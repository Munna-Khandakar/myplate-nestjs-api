import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePlateDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly images: [string];

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly lastTimeToOrder: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly canOrderAnyTime: boolean;
}
