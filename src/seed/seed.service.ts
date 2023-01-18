import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/entities/user.entity';
import { initialData } from './data/seed-data';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this._deleteTables();
    const user = await this._insertUsers();
    await this._insertNewProducts(user);
    return 'SEED EXECUTED';
  }

  private async _deleteTables() {
    await this.productService.deleteAllProducts();

    // Delete All User
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async _insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers[0];
  }

  private async _insertNewProducts(user: User) {
    const products = initialData.products;
    const insertPromises = [];

    products.forEach((p) => {
      insertPromises.push(this.productService.create(p, user));
    });

    Promise.all(insertPromises);

    return true;
  }
}
