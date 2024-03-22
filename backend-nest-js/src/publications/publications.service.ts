import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication) private readonly publicationRepository:  Repository<Publication>,
  ) {}


  async create(createPublicationDto: CreatePublicationDto): Promise<Publication> {
    const newPublication = await this.publicationRepository.save({
      name: createPublicationDto.name,
      content: createPublicationDto.content,
    });
    return newPublication;
  }


  async findAll(): Promise<Publication[]> {
    return await this.publicationRepository.find({ where: { Status: 'ACTIVE' } });
  }

  async findOne(id: number): Promise<Publication> {
    const publicationExist = await this.publicationRepository.findOne({ where: {id}});
    if (!publicationExist || publicationExist.Status !== 'ACTIVE') {
      throw new NotFoundException('Este post no existe o no está activo');
    }
    return publicationExist;
  }


  async update(id: number, updatePublicationDto: Partial<UpdatePublicationDto>) {
    const publicationExist = await this.publicationRepository.findOne({ where: {id}});
    if (!publicationExist) throw new NotFoundException('Este post no existe');
    if (publicationExist.Status !== 'ACTIVE') {
      throw new NotFoundException('Esta publicacion no existe o no está activa');
    }
    const updatedPublication = Object.assign(publicationExist, updatePublicationDto);
    return await this.publicationRepository.save(updatedPublication);
  }

  async remove(id: number): Promise<void> {
    const publicationExist = await this.publicationRepository.findOne({ where: {id}});
    if (!publicationExist) {
      throw new NotFoundException('Esta publicacion no existe');
    }
    if (publicationExist.Status !== 'ACTIVE') {
      throw new NotFoundException('Esta publicacion no existe o no está activa');
    }
    await this.publicationRepository.update(id, { Status: 'INACTIVE' });
  }
}