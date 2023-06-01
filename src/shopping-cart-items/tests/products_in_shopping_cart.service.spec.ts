import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartItemsService } from '../shopping-cart-items.service';

describe('ProductsInShoppingCartService', () => {
  let service: ShoppingCartItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartItemsService],
    }).compile();

    service = module.get<ShoppingCartItemsService>(ShoppingCartItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
