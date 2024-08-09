import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResumeProfile } from "./entities/resume-profile.entity";
import { CreateResumeProfileDto } from "./dto/create-resume.dto";
import { UpdateResumeProfileDto } from "./dto/update-resume.dto";
import { User } from "../auth/user.entity";

@Injectable()
export class ResumeProfileService {
  constructor(
    @InjectRepository(ResumeProfile)
    private resumeProfileRepository: Repository<ResumeProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(
    userId: number,
    createResumeProfileDto: CreateResumeProfileDto
  ): Promise<ResumeProfile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const profile = this.resumeProfileRepository.create({
      ...createResumeProfileDto,
      user: user,
    });

    return this.resumeProfileRepository.save(profile);
  }

  findAll(): Promise<ResumeProfile[]> {
    return this.resumeProfileRepository.find();
  }
  async getcurrentPortfolio(): Promise<ResumeProfile> {
    const user = await this.userRepository.findOne({
      where: { role: "admin" },
    });

    if (!user) {
      throw new NotFoundException("Admin information not found");
    }

    const resumeProfile = await this.resumeProfileRepository.findOne({
      where: { user: { id: user.id } },

      relations: ["user"],
    });

    if (!resumeProfile) {
      throw new NotFoundException("Resume profile not found for admin user");
    }

    return resumeProfile;
  }

  findOne(id: number): Promise<ResumeProfile> {
    return this.resumeProfileRepository.findOne({ where: { id } });
  }

  async update(
    userId: number,
    updateResumeProfileDto: UpdateResumeProfileDto
  ): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["resumeProfile"],
    });
    if (!user) {
      throw new NotFoundException("Admin information not found");
    }
     
    if (!user.resumeProfile) {
      await this.create(userId, updateResumeProfileDto);
      return true;
    }
    
    const updateResult = await this.resumeProfileRepository.update(
      { id: user.resumeProfile.id },
      { ...updateResumeProfileDto, user }
    );
    
    return updateResult.affected > 0;
  }
  
  async remove(id: number): Promise<void> {
    await this.resumeProfileRepository.delete(id);
  }
}
