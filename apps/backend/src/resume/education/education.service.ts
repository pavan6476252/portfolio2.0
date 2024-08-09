// education.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.input';
import { UpdateEducationDto } from './dto/update-education.input';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  create(createEducationDto: CreateEducationDto): Promise<Education> {
    const education = this.educationRepository.create(createEducationDto);
    return this.educationRepository.save(education);
  }

  findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  findOne(id: number): Promise<Education> {
    return this.educationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEducationDto: UpdateEducationDto): Promise<Education> {
    await this.educationRepository.update(id, updateEducationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.educationRepository.delete(id);
  }
}
