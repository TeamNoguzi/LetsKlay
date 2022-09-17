import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.use(helmet());

  process.env.NODE_ENV === "production"
    ? ""
    : await (async () => {
        const swaggerBlock = await import("./config/swagger.dev");
        app.enableCors();
        app.use("/api-docs", swaggerBlock.default);
        app.useStaticAssets(join(__dirname, "..", "..", "uploads"), {
          prefix: "/uploads",
        });

        const options = new DocumentBuilder()
          .setTitle("Letsklay API Docs")
          .setDescription("NestJS Study API description")
          .setVersion("1.0.0")
          .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup("api-docs", app, document);
      })();

  await app.listen(5000);
}
bootstrap();
