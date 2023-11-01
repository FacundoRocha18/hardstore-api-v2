import { Test, TestingModule } from '@nestjs/testing';
import { Shopping_Cart_Service } from '../shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: Shopping_Cart_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Shopping_Cart_Service],
    }).compile();

    service = module.get<Shopping_Cart_Service>(Shopping_Cart_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
