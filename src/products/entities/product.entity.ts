import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ProductImage } from './';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'b4129cda-8ce4-4ac3-aedb-5aa6558ad7aa',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 10000,
    description: 'Product Price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'A T-shirt from Teslo Shop',
    description: 'Product Description',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Product Slug - For SEO',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
  })
  @Column('integer', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'L', 'XL'],
    description: 'Product Size',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['shirt', 'teslo'],
    description: 'Product ID',
    uniqueItems: true,
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: 'b4129cda-8ce4-4ac3-aedb-5aa6558ad7aa',
    description: 'Product ID',
    uniqueItems: true,
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (this.slug) {
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
}
