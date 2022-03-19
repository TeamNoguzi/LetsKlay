import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './routes/app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  //app.use(csurf());
  
  process.env.NODE_ENV==='production'?'':(()=>{app.enableCors()})();

  const options = new DocumentBuilder()
  .setTitle('Letsklay API Docs')
  .setDescription('NestJS Study API description')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
