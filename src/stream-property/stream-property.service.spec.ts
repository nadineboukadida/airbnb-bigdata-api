import { Test, TestingModule } from '@nestjs/testing';
import { StreamPropertyService } from './stream-property.service';

describe('StreamPropertyService', () => {
  let service: StreamPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamPropertyService],
    }).compile();

    service = module.get<StreamPropertyService>(StreamPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
