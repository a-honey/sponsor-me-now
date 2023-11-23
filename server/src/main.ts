import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { ExpressAdapter } from "@nestjs/platform-express";

declare const module: any;
dotenv.config();

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors();
  app.use(helmet.default());
  app.use(
    rateLimit.default({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
    }),
  );

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle("Sponsor me now API")
    .setDescription("")
    .setVersion("1.0")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.SERVER_PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
