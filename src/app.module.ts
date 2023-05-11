import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker/docker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './property/property.service';
import { PropertyModule } from './property/property.module';
import { StreamPropertyModule } from './stream-property/stream-property.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/airbnb-big-data'),
    PropertyModule,
    StreamPropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService, DockerService],

})
export class AppModule { }
