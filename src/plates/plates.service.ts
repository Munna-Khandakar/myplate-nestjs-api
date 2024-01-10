import { Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plate } from './entities/plate.entity';
import { Model } from 'mongoose';
import { PlateQuery } from './types/Plate';

@Injectable()
export class PlatesService {
  constructor(
    @InjectModel(Plate.name)
    private plateModel: Model<Plate>,
    @InjectModel('Address') private addressModel: Model<any>,
  ) {}
  async create(createPlateDto: CreatePlateDto, user): Promise<Plate> {
    const pickeupaAddress = await this.addressModel.findById(
      createPlateDto.address,
    );

    if (!pickeupaAddress) {
      throw new Error('Address not found'); // Throw an error for proper handling
    }
    createPlateDto['pickupAddress'] = pickeupaAddress;

    const plate = new this.plateModel({ ...createPlateDto, host: user.userId });
    return plate.save();
  }

  async findAll(
    params: PlateQuery,
  ): Promise<{ plates: Plate[]; total: number }> {
    const query = this.plateModel.find();

    // Apply pagination
    if (params.page && params.limit) {
      query.skip((params.page - 1) * params.limit).limit(params.limit);
    }

    // Apply population
    if (params.populate) {
      query.populate(params.populate);
    }

    const plates = await query;

    // Count total documents (consider using a more optimized approach for large datasets)
    const total = await this.plateModel.countDocuments();

    return { plates, total };
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
