import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SearchService } from "./search.service";
import { SearchResolver } from "./search.resolver";

const SEARCH_CONFIG = {
  provide: "SEARCH_CONFIG",
  useFactory: (configService: ConfigService) => ({
    applicationId: configService.get("ALGOLIA_APPLICATION_ID"),
    apiKey: configService.get("ALGOLIA_ADMIN_API_KEY"),
  }),
  inject: [ConfigService],
};
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [SEARCH_CONFIG, SearchService, SearchResolver],
  exports: [SearchService, SEARCH_CONFIG],
})
export class SearchModule {}
