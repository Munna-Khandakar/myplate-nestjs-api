import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressSchema } from './entities/address.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
