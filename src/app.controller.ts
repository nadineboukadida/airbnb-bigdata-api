import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DockerService } from './docker/docker.service';
import { createPropertyDTO } from './property/dtos/create-property.dto';
import { Property } from './property/schemas/property.schema';
import { PropertyService } from './property/property.service';
import { WebsocketGateway } from './websocket.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private dockerService: DockerService
    , private propertyService: PropertyService) { }

  @Post()
  async updateDatabase(@Body() requestBody: createPropertyDTO): Promise<any> {
    const property = new Property();
    property.city = requestBody.city;
    property.price = requestBody.price;
    await this.propertyService.create(property);
    const content = `${requestBody.city},${requestBody.price}\n`
    const command = ['sh', '-c', `printf "${content}" >> input/airbnb.csv`];
    this.dockerService.execInContainer(command);
    return this.dockerService.triggerProducer()
  }

  @Get()
  async getProcessedData() {
    this.dockerService.extractAndSendData();
    const command = ['cat', 'out'];
    const data = await this.dockerService.execInContainer(command)
    return this.dockerService.extractData(data)
  }

}
