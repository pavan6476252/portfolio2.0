import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from '../entities/certifications.entity';
import { CreateCertificationDTO } from '../dto/create-certificate.dto';
import { UpdateCertificationDTO } from '../dto/update-certificate.dto';
@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
  ) {}

  async create(createCertificationDto: CreateCertificationDTO): Promise<Certification> {
    const certification = this.certificationRepository.create(createCertificationDto);
    return this.certificationRepository.save(certification);
  }

  async findAll(): Promise<Certification[]> {
    return this.certificationRepository.find();
  }

  async findOne(id: number): Promise<Certification> {
    const certification = await this.certificationRepository.findOne({ where: { id } });
    if (!certification) {
      throw new NotFoundException(`Certification with id ${id} not found`);
    }
    return certification;
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDTO): Promise<Certification> {
    await this.certificationRepository.update(id, updateCertificationDto);
    const updatedCertification = await this.findOne(id);
    return updatedCertification;
  }

  async remove(id: number): Promise<void> {
    const certification = await this.findOne(id);
    if (certification) {
      await this.certificationRepository.remove(certification);
    }
  }
}
