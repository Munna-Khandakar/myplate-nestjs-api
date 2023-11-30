import { Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plate } from './entities/plate.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlatesService {
  constructor(
    @InjectModel(Plate.name)
    private plateModel: Model<Plate>,
  ) {}
  async create(createPlateDto: CreatePlateDto): Promise<Plate> {
    const plate = new this.plateModel(createPlateDto);
    return plate.save();
  }

  async findAll(): Promise<Plate[]> {
    const plates = await this.plateModel.find();
    return plates;
  }

  findOne(id: number) {
    return `This action returns a #${id} plate`;
  }

  update(id: number, updatePlateDto: UpdatePlateDto) {
    return `This action updates a #${id} plate`;
  }

  remove(id: number) {
    return `This action removes a #${id} plate`;
  }
}
