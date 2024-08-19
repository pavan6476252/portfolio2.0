import { Args, Query, Resolver } from "@nestjs/graphql";
import { SearchResult } from "./dto/search-results.dto";
import { IndexNames, SearchService } from "./search.service";

@Resolver(() => SearchResult)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [SearchResult])
  async search(
    @Args("query") query: string,
    @Args("indexName", { type: () => String }) indexName: string
  ): Promise<SearchResult[]> {
    const { results } = await this.searchService.search({
      query,
    });
    console.log("RESPONSE", results);
    return results as any;
  }
}
