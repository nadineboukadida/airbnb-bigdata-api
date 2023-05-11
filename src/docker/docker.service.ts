import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as Docker from 'dockerode';
import { Server } from 'http';
import { PropertyService } from 'src/property/property.service';
import { Property } from 'src/property/schemas/property.schema';
import { StreamProperty } from 'src/stream-property/schemas/stream-property.schema';
import { StreamPropertyService } from 'src/stream-property/stream-property.service';
import { WebsocketGateway } from 'src/websocket.gateway';

@Injectable()
export class DockerService {
    private readonly docker = new Docker();
    private readonly containerId = "a08b44e6f916"
    constructor(private streamPropertyService: StreamPropertyService,
        private readonly websocketGateway: WebsocketGateway,
        private propertyService: PropertyService) {


    }
    async execInContainer(command: string[]): Promise<string> {
        const container = this.docker.getContainer(this.containerId);
        const exec = await container.exec({
            Cmd: command,
            AttachStdout: true,
            AttachStderr: true,
        });

        const stream = await exec.start();
        const outputChunks: string[] = [];
        stream.on('data', (chunk) => {
            let string = '';
            chunk = chunk.toString()
            for (let i = 0; i < chunk.length; i++) {
                const char = chunk[i];
                if (/[a-zA-Z0-9]/.test(char) || char == '\n' || char == ',' || char == '.') {
                    string += char;
                }
            }

            outputChunks.push(string);
        });
        await new Promise<void>((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });
        return outputChunks.join('');
    }

    triggerProducer(): Promise<string> {
        return this.execInContainer(['./runProducer.sh']);
    }

    extractData(data: string): string[] {
        const result = [];
        let lines = data.split('\n');
        let index = 0;
        let foundIndex = 0;
        while (index < lines.length) {
            if (lines[index].startsWith('Time') && !lines[index + 2].startsWith('-') && lines[index + 2] != '') {
                foundIndex = index
            }
            index++
        }

        lines = lines.slice(foundIndex)
        lines.forEach((line) => {
            if (line != '' && !line.startsWith('Time')) {
                const infos = line.split(',')
                const property = new StreamProperty()
                property.city = infos[0]
                property.price = isNaN(+infos[1]) ? 0 : +infos[1]
                this.streamPropertyService.create(property)
                result.push(line);
            }
        })
        this.wsSendData(result);
        return result;
    }

    @Cron('*/5 * * * * *')
    async wsSendData(data) {
        console.log('send data')
        this.websocketGateway.server.emit('data', data);
    }

    @Cron('1 * * * * *')
    async processBatchData() {
        const data = await this.propertyService.getAll();
        let result = ""
        data.forEach((element) => {
            result = result + `${element.city},${element.price}\n`
        })
        return result
    }


}
