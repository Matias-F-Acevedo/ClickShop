import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryDto: CreateCategoryDto) {
    const { name, description } = categoryDto;

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await this.categoryRepository.findOne({ where: { name } });
    if (existingCategory) {
      throw new HttpException('Category with this name already exists', HttpStatus.CONFLICT);
    }

    // Crear la nueva categoría
    const newCategory = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(newCategory);
  }

  async getCategories() {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number) {
    // Buscar la categoría por su ID
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name, description } = updateCategoryDto;

    // Buscar la categoría por su ID
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Actualizar los campos de la categoría si se proporcionan en el DTO
    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    // Buscar la categoría por su ID
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  
    // Eliminar la categoría
    return this.categoryRepository.remove(category);
  }
}
