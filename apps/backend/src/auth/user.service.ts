import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { ObjectId } from "mongodb";
import { toObjectId } from "../utils/convertion.type";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByID(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id});
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
}
