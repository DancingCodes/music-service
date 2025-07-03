import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  // 输出欢迎语
  console.log(`🚀 服务已启动！访问地址: http://localhost:${port}`);
}
bootstrap();
