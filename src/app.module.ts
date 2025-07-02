import { Module } from '@nestjs/common';
import { MusicModule } from './modules/music/music.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MusicModule],
})

export class AppModule { }
