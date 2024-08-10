// education.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Education } from "./entities/education.entity";
import { CreateEducationDto } from "./dto/create-education.input";
import { UpdateEducationDto } from "./dto/update-education.input";
import { CloudinaryService } from "../../upload/cloudinary.service";
import { User } from "../../auth/user.entity";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService
  ) {}

  async create(
    userId: number,
    createEducationDto: CreateEducationDto
  ): Promise<Education> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const education = this.educationRepository.create({
      ...createEducationDto,
      user,
    });
    return this.educationRepository.save(education);
  }

  findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  findOne(id: number): Promise<Education> {
    return this.educationRepository.findOne({ where: { id } });
  }
  async findMyEducations(userId: number, id: number): Promise<Education[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.educationRepository.find({ where: { id, user } });
  }

  async update(
    userId: number,
    id: number,
    updateEducationDto: UpdateEducationDto
  ): Promise<Education> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.educationRepository.update(
      { id, user },
      { ...updateEducationDto }
    );
    return this.findOne(id);
  }

  async remove(userId: number, id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const project = await this.educationRepository.findOne({
      where: {
        user: user,
        id: id,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.educationRepository.remove(project);
  }
}
