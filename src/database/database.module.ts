import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// use Music
// db.createUser({
//     user: "Music",
//     pwd: "DancingCodes1227",
//     roles: [{ role: "readWrite", db: "Music" }]
// })
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://Music:DancingCodes1227@127.0.0.1:27017/Music'),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }