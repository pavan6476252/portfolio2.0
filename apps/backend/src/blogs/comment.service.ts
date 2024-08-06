// comment.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import {UpdateBlogPostDTO  } from "./dto/create-comment.dto";
import { UpdateCommentDTO } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDTO: Comment): Promise<void> {
    const newComment = this.commentRepository.create(createCommentDTO);
    await this.commentRepository.save(newComment);
  }

  update(id: string, updateCommentDTO: UpdateCommentDTO): Promise<Comment> {
    return this.commentRepository.save({ ...updateCommentDTO, _id: id });
  }

  async remove(id: number): Promise<number> {
    const data = await this.commentRepository.delete(id);
    return data.affected;
  }
}
