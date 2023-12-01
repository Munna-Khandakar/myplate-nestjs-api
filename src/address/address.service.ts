import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  UpdateAddressDto,
  UpdateAddressWithoutStateDto,
} from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto, user) {
    const address = new this.addressModel({
      ...createAddressDto,
      user: user.userId,
    });
    return address.save();
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressModel.find();
    return addresses;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  updateEverythingWithoutState(
    id: number,
    updateAddressDto: UpdateAddressWithoutStateDto,
  ) {
    // get the adress
    // keep the id,createAt,selected states
    // update the rest
    return `This action updates a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
