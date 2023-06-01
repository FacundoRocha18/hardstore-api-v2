import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartItemsController } from '../shopping-cart-items.controller';

describe('ProductsInShoppingCartController', () => {
  let controller: ShoppingCartItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartItemsController],
    }).compile();

    controller = module.get<ShoppingCartItemsController>(
      ShoppingCartItemsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
