import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Experience } from './entities/experience.entity'; 
import { CreateExperienceDTO } from './dto/create-experience.dto';
import { UpdateExperienceDTO } from './dto/update-experience.dto'; 
@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDTO): Promise<Experience> {
    const experience = this.experienceRepository.create(createExperienceDto);
    return this.experienceRepository.save(experience);
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find();
  }

  async findOne(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    if (!experience) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }
    return experience;
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDTO): Promise<Experience> {
    await this.experienceRepository.update(id, updateExperienceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const experience = await this.findOne(id);
    if (experience) {
      await this.experienceRepository.remove(experience);
    }
  }
}
