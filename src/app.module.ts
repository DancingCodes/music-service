import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MusicModule } from './modules/muisc/music.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_DIR } from './config/global.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_DIR,
      serveRoot: '/',
    }),
    DatabaseModule,
    MusicModule
  ]
})
export class AppModule { }
