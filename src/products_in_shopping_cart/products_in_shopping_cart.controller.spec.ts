import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInShoppingCartController } from './products_in_shopping_cart.controller';

describe('ProductsInShoppingCartController', () => {
  let controller: ProductsInShoppingCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsInShoppingCartController],
    }).compile();

    controller = module.get<ProductsInShoppingCartController>(ProductsInShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
