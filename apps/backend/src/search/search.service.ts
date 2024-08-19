import { Inject, Injectable } from "@nestjs/common";
import { algoliasearch, SearchClient } from "algoliasearch";

export enum IndexNames {
  BLOGS = "blogs",
  PROJECTS = "projects",
}
export const SEARCH_INDEX_NAME = "unified";

@Injectable()
export class SearchService {
  private client: SearchClient;

  constructor(@Inject("SEARCH_CONFIG") private config: any) {
    this.client = algoliasearch(config.applicationId, config.apiKey);
  }

  async addorUpdateDataInIndex<T>({
    body,
    objectID,
    type,
  }: {
    body: T;
    objectID: string;
    type: "blog" | "project";
  }) {
    console.log("ADDING TO SEARCH INDEX", body);
    const { taskID } = await this.client.addOrUpdateObject({
      body: body,
      indexName: SEARCH_INDEX_NAME,
      objectID: type + objectID,
    });
    await this.client.waitForTask({
      indexName: SEARCH_INDEX_NAME,
      taskID: taskID,
    });
  }

  async removeDataFromIndex({
    objectID,
    type,
  }: {
    objectID: string;
    type: "blog" | "project";
  }) {
    const { taskID } = await this.client.deleteObject({
      indexName: SEARCH_INDEX_NAME,
      objectID: type + objectID,
    });
    await this.client.waitForTask({
      indexName: SEARCH_INDEX_NAME,
      taskID: taskID,
    });
  }

  async search({ query }: { query: any }) {
    return await this.client.search({
      requests: [{ indexName: SEARCH_INDEX_NAME, query }],
    });
  }
}
