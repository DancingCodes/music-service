import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Music extends Document {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    picUrl: string;

    @Prop({ required: true })
    artists: { id: number; name: string }[];

    @Prop({ required: true })
    duration: number;

    @Prop()
    lyric: string;

    @Prop({ required: true })
    url: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
