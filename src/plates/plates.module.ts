import { Module } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { PlatesController } from './plates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlateSchema } from './entities/plate.entity';
import { JwtModule } from '@nestjs/jwt';
import { AddressSchema } from 'src/address/entities/address.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}
