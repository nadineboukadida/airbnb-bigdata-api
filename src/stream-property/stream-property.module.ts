import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamProperty, StreamPropertySchema } from 'stream-property/schemas/stream-property.schema';
import { StreamPropertyService } from './stream-property.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: StreamProperty.name, schema: StreamPropertySchema }])],
    providers: [StreamPropertyService],
    exports: [StreamPropertyService]
})
export class StreamPropertyModule {

}
