import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StreamProperty, StreamPropertyDocument } from 'stream-property/schemas/stream-property.schema';

@Injectable()
export class StreamPropertyService {
    constructor(
        @InjectModel(StreamProperty.name) private streamPropertyModel: Model<StreamPropertyDocument>,
    ) { }

    async create(property: StreamProperty): Promise<StreamProperty> {
        const createdProperty = new this.streamPropertyModel(property);

        const hi = await createdProperty.save();
        return hi
    }
}
