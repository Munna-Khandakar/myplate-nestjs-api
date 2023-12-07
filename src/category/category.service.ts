import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
