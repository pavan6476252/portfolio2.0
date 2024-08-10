import { InputType, Field, ID, PartialType } from "@nestjs/graphql"; 
import { CreateBlogPostDTO } from "./create-blog-post.dto";

@InputType()
export class UpdateBlogPostDTO extends PartialType(CreateBlogPostDTO) {}
