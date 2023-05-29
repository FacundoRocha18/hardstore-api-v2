import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInShoppingCartService } from './products_in_shopping_cart.service';

describe('ProductsInShoppingCartService', () => {
  let service: ProductsInShoppingCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInShoppingCartService],
    }).compile();

    service = module.get<ProductsInShoppingCartService>(ProductsInShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
