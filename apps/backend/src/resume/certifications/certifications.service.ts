import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Certification } from "./entity/certifications.entity";
import { CreateCertificationDTO } from "./dto/create-certificate.dto";
import { UpdateCertificationDTO } from "./dto/update-certificate.dto";
import { User } from "../../auth/user.entity";
import { CloudinaryService } from "../../upload/cloudinary.service";
@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService
  ) {}

  async create(
    userId: number,
    createCertificationDto: CreateCertificationDTO
  ): Promise<Certification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { certificateFile } = createCertificationDto;
    const { filename, createReadStream } = await certificateFile;
    const uploadRes = await this.cloudinaryService.uploadStream(
      createReadStream,
      filename,
      "certificates"
    );

    const certificate = this.certificationRepository.create({
      ...createCertificationDto,
      owner: user,
      certificateLink: uploadRes.secure_url,
    });

    return this.certificationRepository.save(certificate);
  }

  async findAll(): Promise<Certification[]> {
    return this.certificationRepository.find();
  }
  async getMyCertificates(userId: number): Promise<Certification[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.certificationRepository.find({ where: { owner: user } });
  }

  async findOne(id: number): Promise<Certification> {
    const certification = await this.certificationRepository.findOne({
      where: { id },
    });
    if (!certification) {
      throw new NotFoundException(`Certification with id ${id} not found`);
    }
    return certification;
  }

  async update( userId: number,
    id: number,
    updateCertificationDto: UpdateCertificationDTO
  ): Promise<Certification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const certificate = await this.certificationRepository.preload({
      id,
      ...updateCertificationDto,
      owner: user,
    });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }

    const { certificateFile } = updateCertificationDto;
    if (certificateFile) {
      const { filename, createReadStream } = await certificateFile;
      const uploadRes = await this.cloudinaryService.uploadStream(
        createReadStream,
        filename,
        "certificates"
      );

      if (certificate.certificateLink) {
        await this.cloudinaryService.deleteFile(certificate.certificateLink);
      }

      certificate.certificateLink = uploadRes.secure_url;
    }

    return this.certificationRepository.save(certificate);
  }

  async remove(userId:number,id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const certificate = await this.certificationRepository.findOne({
      where: {
        owner: user,
        id: id,
      },
    });

    if (!certificate) {
      throw new NotFoundException(`certificate with ID ${id} not found`);
    }

    await this.certificationRepository.remove(certificate);
  
  }
}
