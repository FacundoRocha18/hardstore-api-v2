import { Test, TestingModule } from '@nestjs/testing';
import { Products_Service } from '../products.service';

describe('ProductsService', () => {
  let service: Products_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Products_Service],
    }).compile();

    service = module.get<Products_Service>(Products_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
