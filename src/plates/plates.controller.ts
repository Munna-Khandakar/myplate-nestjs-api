import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlatesService } from './plates.service';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { PlateQuery } from './types/Plate';
import { AuthGuard } from 'src/user/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/plates')
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPlateDto: CreatePlateDto, @User() user) {
    return this.platesService.create(createPlateDto, user);
  }

  @Get()
  findAll(@Query() params: PlateQuery, @User() user) {
    return this.platesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlateDto: UpdatePlateDto) {
    return this.platesService.update(+id, updatePlateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platesService.remove(+id);
  }
}
