import { Test, TestingModule } from '@nestjs/testing';
import { Shopping_Cart_Items_Service } from '../shopping-cart-items.service';

describe('ProductsInShoppingCartService', () => {
  let service: Shopping_Cart_Items_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Shopping_Cart_Items_Service],
    }).compile();

    service = module.get<Shopping_Cart_Items_Service>(Shopping_Cart_Items_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
