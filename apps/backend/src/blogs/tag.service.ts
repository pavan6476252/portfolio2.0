// tag.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  create(name: string): Promise<Tag> {
    const newTag = this.tagRepository.create({ name });
    return this.tagRepository.save(newTag);
  }

  async remove(id: number): Promise<number> {
    const data = await this.tagRepository.delete(id);
    return data.affected;
  }
  async preloadOrCreateTag(name: string): Promise<Tag> {
    let tag = await this.tagRepository.findOne({ where: { name } });
    if (!tag) {
      tag = this.tagRepository.create({ name });
      await this.tagRepository.save(tag);
    }
    return tag;
  }
  async preloadOrCreateTags(tags: string[]): Promise<Tag[]> {
    return Promise.all(
      tags.map(async (tagName) => await this.preloadOrCreateTag(tagName))
    );
  }
}
