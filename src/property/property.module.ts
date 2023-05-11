import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schemas/property.schema';
import { PropertyService } from './property.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])],
    providers: [PropertyService],
    exports:[PropertyService]
})
export class PropertyModule { }
