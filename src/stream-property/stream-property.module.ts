import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamPropertyService } from './stream-property.service';
import { StreamProperty, StreamPropertySchema } from './schemas/stream-property.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: StreamProperty.name, schema: StreamPropertySchema }])],
    providers: [StreamPropertyService],
    exports: [StreamPropertyService]
})
export class StreamPropertyModule {

}
