import { Field, ObjectType, InterfaceType, ID } from "@nestjs/graphql";
import { BlogPost } from "../../blogs/entities/blog-post.entity";
import { Project } from "../../resume/projects/entities/projects.entity";
import { createUnionType } from "@nestjs/graphql";
import { IndexNames } from "../search.service";

@ObjectType()
export class SearchResult {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  type: string;
  @Field()
  title: string;
  @Field()
  desc: string;
  @Field()
  body: string;
  @Field(() => [String])
  keywords: string[];
  @Field()
  image: string;

  constructor({
    type,
    id,
    title,
    body,
    desc,
    image,
    keywords,
  }: {
    type: "blog" | "project";
    id: string;
    title: string;
    desc: string;
    body: string;
    keywords: string[];
    image: string;
  }) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.desc = desc;
    this.image = image;
    this.keywords = keywords;
    this.body = body;
  }
}

// @ObjectType({ implements: SearchResultType })
// export class BlogSearchResult implements SearchResultType {
//   @Field(() => String)
//   type: string = "BlogPost";
//   @Field()
//   title: string;
//   @Field()
//   desc: string;
//   @Field()
//   body: string;
//   @Field(() => [String])
//   keywords: string[];
//   @Field()
//   image: string;

//   constructor({
//     title,
//     body,
//     desc,
//     image,
//     keywords,
//   }: {
//     title: string;
//     desc: string;
//     body: string;
//     keywords: string[];
//     image: string;
//   }) {
//     this.title = title;
//     this.desc = desc;
//     this.image = image;
//     this.keywords = keywords;
//     this.body = body;
//   }
// }

// @ObjectType({ implements: SearchResultType })
// export class ProjectSearchResult implements SearchResultType {
//   @Field(() => String)
//   type: string = "Project";
//   @Field()
//   title: string;
//   @Field()
//   desc: string;
//   @Field()
//   body: string;
//   @Field(() => [String])
//   keywords: string[];
//   @Field()
//   image: string;

//   constructor({
//     title,
//     body,
//     desc,
//     image,
//     keywords,
//   }: {
//     title: string;
//     desc: string;
//     body: string;
//     keywords: string[];
//     image: string;
//   }) {
//     this.title = title;
//     this.desc = desc;
//     this.image = image;
//     this.keywords = keywords;
//     this.body = body;
//   }
// }

// @ObjectType()
// export class SearchResults {
//   // @Field(() => [SearchResultUnion])
//   // results: Array<typeof SearchResultUnion>;

// }

// export const SearchResultUnion = createUnionType({
//   name: "SearchResult",
//   types: () => [BlogSearchResult, ProjectSearchResult] as const,
//   resolveType(value) {
//     if (value.type === "blog") {
//       return BlogSearchResult;
//     }
//     if (value.type === "project") {
//       return ProjectSearchResult;
//     }
//     return null;
//   },
// });
