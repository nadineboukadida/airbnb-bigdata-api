import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';


@Injectable()
export class PropertyService {
    constructor(
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    ) { }

    async create(property: Property): Promise<Property> {
        const createdProperty = new this.propertyModel(property);
        return createdProperty.save();
    }
    async getAll(): Promise<Property[]> {
        return this.propertyModel.find();
    }

}
