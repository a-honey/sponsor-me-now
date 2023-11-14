import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { ExpressAdapter } from "@nestjs/platform-express";

declare const module: any;
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors();
  app.use(helmet.default());
  app.use(
    rateLimit.default({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Sponsor me now API")
    .setDescription("")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
