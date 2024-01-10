import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(user): Promise<Address[]> {
    const addresses = await this.addressModel.find({ user: user.userId });
    return addresses;
  }

  async findOne(id: string): Promise<Address> {
    const addresses = await this.addressModel.findById(id);
    return addresses;
  }

  async updateEverythingWithoutState(
    id: string,
    updateAddressDto: UpdateAddressWithoutStateDto,
  ) {
    const address = await this.addressModel.findById(id);
    const updatedAddress = {};

    // Copy the current values of the address
    Object.assign({}, updatedAddress, address);

    // Update only the fields that have changed
    Object.keys(updateAddressDto).forEach((field) => {
      if (updateAddressDto[field] !== updatedAddress[field]) {
        updatedAddress[field] = updateAddressDto[field];
      }
    });

    // Update the address document
    const savedData = await this.addressModel.findByIdAndUpdate(
      id,
      updatedAddress,
      { new: true },
    );

    return savedData;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: string) {
    const address = await this.addressModel.findById(id);

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    await this.addressModel.findByIdAndDelete(id);

    return address;
  }
}
