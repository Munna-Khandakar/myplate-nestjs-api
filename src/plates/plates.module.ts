import { Module } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { PlatesController } from './plates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlateSchema } from './entities/plate.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plate', schema: PlateSchema }]),
  ],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {}
