import { Test, TestingModule } from '@nestjs/testing';
import { Shopping_Cart_Items_Controller } from '../shopping-cart-items.controller';

describe('ProductsInShoppingCartController', () => {
  let controller: Shopping_Cart_Items_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Shopping_Cart_Items_Controller],
    }).compile();

    controller = module.get<Shopping_Cart_Items_Controller>(
      Shopping_Cart_Items_Controller,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
