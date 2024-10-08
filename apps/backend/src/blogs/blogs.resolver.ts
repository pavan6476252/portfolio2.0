import { Resolver, Query, Mutation, Args, Context, Int } from "@nestjs/graphql";
import { BlogPostService } from "./blogs.service";
import { BlogPost } from "./entities/blog-post.entity";
import { CreateBlogPostDTO } from "./dto/create-blog-post.dto";
import { UpdateBlogPostDTO } from "./dto/update-blog-post.dto";
import { JwtAdminOnlyAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { ITokenPayload } from "../auth/auth.service";
import { PaginationArgs } from "./dto/pagination-args.dto";
import { FilterBlogPostDTO } from "./dto/filter-blog-post.dto";
import { FilterInput } from "./dto/filter-input.dto";
import { BlogPostResponse } from "./dto/blogpost.response.dto";
import { BlogPostsResponse } from "./dto/blogspost.response.dto";
import { CloudinaryService } from "../upload/cloudinary.service";
import { PaginatedBlogPostResult } from "../dto/paginated-result.dto";

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(
    private readonly blogBlogService: BlogPostService,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Query(() => BlogPostsResponse)
  async getAllBlogs(
    @Args("limit") limit: number,
    @Args("offset") offset: number,
    @Args("filter") filter: FilterInput
  ) {
    return this.blogBlogService.findAll(limit, offset, filter);
  }

  @Query(() => BlogPost)
  async getBlog(
    @Args("id", { type: () => Int }) id: number
  ): Promise<BlogPost> {
    const blogPost = await this.blogBlogService.findById(id);

    if (!blogPost) {
      throw new Error(`BlogPost with id ${id} not found`);
    }

    return blogPost;
  }
  @Query(() => BlogPost)
  async getBlogBySlug(
    @Args("slug", { type: () => String }) slug: string
  ): Promise<BlogPost> {
    const blogPost = await this.blogBlogService.findBySlug(slug);

    if (!blogPost) {
      throw new Error(`BlogPost with id ${slug} not found`);
    }

    return blogPost;
  }

  @Query(() => [BlogPost], { nullable: true })
  async getCurrentUserActiveBlogs() {
    return this.blogBlogService.getCurrentUserActiveBlogs();
  }

  @Query(() => PaginatedBlogPostResult, { nullable: true })
  getActiveBlogs(
    @Context("req") req: any,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args("offset", { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number
  ): Promise<PaginatedBlogPostResult> {
    return this.blogBlogService.getActiveBlogs(limit,offset)
  }

  @Mutation(() => BlogPost)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async createBlog(
    @Context("req") req: any,
    @Args("createBlogPostDTO") createBlogPostDTO: CreateBlogPostDTO
  ) {
    const user = req.user as ITokenPayload;
    return this.blogBlogService.create(user.sub, createBlogPostDTO);
  }

  @Mutation(() => BlogPost)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async updateBlog(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateBlogPostDTO") updateBlogPostDTO: UpdateBlogPostDTO
  ) {
    return this.blogBlogService.update(id, updateBlogPostDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async deleteBlog(
    @Context("req") req: any,
    @Args("id", { type: () => Int }) id: number
  ) {
    const user = req.user as ITokenPayload;
    return this.blogBlogService.remove(user.sub, id);
  }
}
