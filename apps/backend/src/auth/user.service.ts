import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { ObjectId } from "mongodb";
import { toObjectId } from "../utils/convertion.type";
import { UserUpdateInputDTO } from "./dto/user-update-input.dto";
import { CloudinaryService } from "../upload/cloudinary.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findByID(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(
    id: number,
    userUpdateInputDTO: UserUpdateInputDTO
  ): Promise<User> {

    const { profileFile}  = userUpdateInputDTO;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (profileFile) {
      const resolvedFile = await profileFile;
      const { createReadStream, filename } = resolvedFile;

      const uniqueFilename = `${filename}-${Date.now()}`;
      const uploadResult = await this.cloudinaryService.uploadStream(
        createReadStream,
        uniqueFilename,
        "users"
      );
      if(user.picture)
      await this.cloudinaryService.deleteFile(user.picture);

      console.log(uploadResult.public_id, uploadResult.secure_url);
      user.picture = uploadResult.secure_url;
    }
    return this.userRepository.save(user);
  }
}
