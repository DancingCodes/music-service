import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { Music, MusicSchema } from './schemas/music.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { musicFilePath, musicFileStaticRoot } from 'src/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
    ServeStaticModule.forRoot({
      rootPath: musicFilePath,
      serveRoot: musicFileStaticRoot,
    })
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule { }
