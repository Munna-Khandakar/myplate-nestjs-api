import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PlatesService } from './plates.service';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';

@Controller('plates')
export class PlatesController {
  constructor(private readonly platesService: PlatesService) {}

  @Post()
  async create(@Res() response, @Body() createPlateDto: CreatePlateDto) {
    try {
      const newPlate = await this.platesService.create(createPlateDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Post has been created successfully',
        data: newPlate,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Post not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  findAll() {
    return this.platesService.findAll();
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
