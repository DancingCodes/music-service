import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MusicDocument = Music & Document;

@Schema({ timestamps: true })
export class Music {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    picUrl: string;

    @Prop({
        required: true,
        type: [
            {
                _id: false,
                id: Number,
                name: String,
            },
        ],
    })
    artists: { id: number; name: string }[];

    @Prop({ required: true })
    duration: number;

    @Prop()
    lyric: string;

    @Prop({ required: true })
    url: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
