import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPost } from "./entities/blog-post.entity";
import { CreateBlogPostDTO } from "./dto/create-blog-post.dto";
import { UpdateBlogPostDTO } from "./dto/update-blog-post.dto";
import { Tag } from "./entities/tag.entity";
import { User } from "../auth/user.entity";
import { PaginationArgs } from "./dto/pagination-args.dto";
import { FilterBlogPostDTO } from "./dto/filter-blog-post.dto";
import { FilterInput } from "./dto/filter-input.dto";
import { BlogPostsResponse } from "./dto/blogspost.response.dto";
import { TagService } from "./tag.service";
import { CloudinaryService } from "../upload/cloudinary.service";
import slugify from "slugify";

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tagService: TagService
  ) {}

  async findAll(
    limit: number,
    offset: number,
    filter: FilterInput
  ): Promise<BlogPostsResponse> {
    const query = this.blogPostRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .leftJoinAndSelect("post.tags", "tags")
      .loadRelationCountAndMap("post.commentCount", "post.comments");

    if (filter.title) {
      query.andWhere("post.title ILIKE :title", { title: `%${filter.title}%` });
    }

    if (filter.content) {
      query.andWhere("post.content ILIKE :content", {
        content: `%${filter.content}%`,
      });
    }

    if (filter.tags && filter.tags.length > 0) {
      query.andWhere("tags.name IN (:...tags)", { tags: filter.tags });
    }

    const blogs = await query.skip(offset).take(limit).getMany();
    const total = await query.getCount();
    return new BlogPostsResponse(blogs, total);
  }
  async findById(id: number): Promise<BlogPost> {
    return this.blogPostRepository.findOne({
      where: {
        id,
      },
      relations: ["tags"],
    });
  }
  async getCurrentUserActiveBlogs(): Promise<BlogPost[]> {
    const user = await this.userRepository.findOne({
      where: { role: "admin" },
    });

    if (!user) {
      throw new NotFoundException("Admin details not found");
    }
    return this.blogPostRepository.find({ where: { author: { id: user.id } } });
  }

  generateUniqueSlug(title: string): string {
    const baseSlug = slugify(title, { lower: true, strict: true });
    const timestamp = Date.now();
    return `${baseSlug}-${timestamp}`;
  }

  async create(
    userId: number,
    createBlogPostDTO: CreateBlogPostDTO
  ): Promise<BlogPost> {
    const {
      metaTitle,
      tags,
      coverImageFile,
      socialImageFile,
      ...postDetails
    } = createBlogPostDTO;
    const author = await this.userRepository.findOne({ where: { id: userId } });

    if (!author) {
      throw new NotFoundException("Author not found");
    }

    const tagEntities = await Promise.all(
      tags.map(
        async (tagName) => await this.tagService.preloadOrCreateTag(tagName)
      )
    );

    let coverImageUrl: string | undefined;
    let socialImageUrl: string | undefined;

    if (coverImageFile) {
      const resolvedFile = await coverImageFile;
      const { createReadStream, filename } = resolvedFile;

      const uniqueFilename = `${filename}-${Date.now()}`;
      const uploadResult = await this.cloudinaryService.uploadStream(
        createReadStream,
        uniqueFilename,
        "blogs"
      );
      console.log(uploadResult.public_id, uploadResult.secure_url);
      coverImageUrl = uploadResult.secure_url;
    }

    if (socialImageFile) {
      const resolvedFile = await coverImageFile;
      const { createReadStream, filename } = resolvedFile;

      const uniqueFilename = `${filename}-${Date.now()}`;
      const uploadResult = await this.cloudinaryService.uploadStream(
        createReadStream,
        uniqueFilename,
        "blogs"
      );
      console.log(uploadResult.public_id, uploadResult.secure_url);

      socialImageUrl = uploadResult.secure_url;
    }

    const uniqueSlug = this.generateUniqueSlug(metaTitle);

    const newPost = this.blogPostRepository.create({
      ...postDetails,
      metaTitle,
      slug: uniqueSlug,
      coverImage: coverImageUrl,
      socialImage: socialImageUrl,
      author,
      tags: tagEntities,
      likes: 0,
    });

    return await this.blogPostRepository.save(newPost);
  }
  async update(
    id: number,
    updateBlogPostDTO: UpdateBlogPostDTO
  ): Promise<BlogPost> {
    const {
      metaTitle,
      tags,
      coverImageFile,
      socialImageFile,
      ...updateFields
    } = updateBlogPostDTO;
  
    const post = await this.blogPostRepository.findOne({ where: { id } });
  
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  
    if (tags) {
      const tagEntities = await this.tagService.preloadOrCreateTags(tags);
      post.tags = tagEntities;
    }
    if (metaTitle) {
      const uniqueSlug = this.generateUniqueSlug(metaTitle);
      post.slug = uniqueSlug;
    }
  
    if (coverImageFile) {
      const resolvedFile = await coverImageFile;
      if (resolvedFile) {
        const { createReadStream, filename } = resolvedFile;
        const uniqueFilename = `${filename}-${Date.now()}`;
        const uploadResult = await this.cloudinaryService.uploadStream(
          createReadStream,
          uniqueFilename,
          "blogs"
        );
        if (post.coverImage) {
          await this.cloudinaryService.deleteFile(post.coverImage);
        }
        post.coverImage = uploadResult.secure_url;
      }
    }
  
    if (socialImageFile) {
      const resolvedFile = await socialImageFile; 
      if (resolvedFile) {
        const { createReadStream, filename } = resolvedFile;
        const uniqueFilename = `${filename}-${Date.now()}`;
        const uploadResult = await this.cloudinaryService.uploadStream(
          createReadStream,
          uniqueFilename,
          "blogs"
        );
        if (post.socialImage) {
          await this.cloudinaryService.deleteFile(post.socialImage); 
        }
        post.socialImage = uploadResult.secure_url;
      }
    }
  
    Object.assign(post, updateFields);
  
    return this.blogPostRepository.save(post);
  }
  

  async remove(userId: number, id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User not found with ${userId}`);
    }
    const blog = await this.blogPostRepository.findOne({
      where: { id: id, author: user },
    });

    if (!blog) {
      throw new NotFoundException(
        `Blog post not found with ID ${id} for user ${userId}`
      );
    }

    const deleteImagePromises = [];

    if (blog.socialImage) {
      deleteImagePromises.push(
        this.cloudinaryService.deleteFile(blog.socialImage)
      );
    }
    if (blog.coverImage) {
      deleteImagePromises.push(
        this.cloudinaryService.deleteFile(blog.coverImage)
      );
    }

    await Promise.all(deleteImagePromises);
    const result = await this.blogPostRepository.delete({ id });

    return result.affected > 0;
  }
}
