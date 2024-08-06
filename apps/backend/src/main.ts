import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import passport from "passport";
import session from "express-session";
import { Logger } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  });
  app.use(cookieParser());

  app.use(
    session({
      secret: "your-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }),
  );

  // app.use(
  //   "/graphql",
  //   graphqlUploadExpress({
  //     maxFileSize: 10000000,
  //     maxFiles: 10,
  //     // If you are using framework around express like [ NestJS or Apollo Serve ]
  //     // use this options overrideSendResponse to allow nestjs to handle response errors like throwing exceptions
  //     overrideSendResponse: true,
  //   })
  // );
  await app.listen(5000);
  Logger.log(`🚀 Application is running on: http://localhost:${5000}}`);
}
bootstrap();
