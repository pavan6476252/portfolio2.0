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

@Resolver(() => BlogPost)
export class BlogPostResolver {
  constructor(
    private readonly blogPostService: BlogPostService,

    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Query(() => BlogPostsResponse)
  async getAllPosts(
    @Args("limit") limit: number,
    @Args("offset") offset: number,
    @Args("filter") filter: FilterInput
  ) {
    return this.blogPostService.findAll(limit, offset, filter);
  }

  @Query(() => BlogPost)
  async getPostById(@Args("id", { type: () => Int }) id: number) {
    return this.blogPostService.findById(id);
  }

  @Mutation(() => BlogPost)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async createPost(
    @Context("req") req: any,
    @Args("createBlogPostDTO") createBlogPostDTO: CreateBlogPostDTO
  ) {
    const user = req.user as ITokenPayload;
    return this.blogPostService.create(user.sub, createBlogPostDTO);
  }

  @Mutation(() => BlogPost)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async updatePost(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateBlogPostDTO") updateBlogPostDTO: UpdateBlogPostDTO
  ) {
    return this.blogPostService.update(id, updateBlogPostDTO);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminOnlyAuthGuard)
  async deletePost(
    @Context("req") req: any,
    @Args("id", { type: () => Int }) id: number) {
      const user = req.user as ITokenPayload;
    return this.blogPostService.remove(user.sub,id);
  }
}
