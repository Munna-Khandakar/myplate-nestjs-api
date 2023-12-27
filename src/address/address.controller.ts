import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  UpdateAddressDto,
  UpdateAddressWithoutStateDto,
} from './dto/update-address.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAddressDto: CreateAddressDto, @User() user) {
    return this.addressService.create(createAddressDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  updateOnlySelectedState(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateEverythingWithoutState(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressWithoutStateDto,
  ) {
    return this.addressService.updateEverythingWithoutState(
      id,
      updateAddressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
