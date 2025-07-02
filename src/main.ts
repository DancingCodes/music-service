import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
