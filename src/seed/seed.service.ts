import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this._insertNewProducts();
    return 'SEED EXECUTED';
  }

  private async _insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((p) => {
      insertPromises.push(this.productService.create(p));
    });

    Promise.all(insertPromises);

    return true;
  }
}
