import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imgName: string) {
    const path = join(__dirname, '../../static/products', imgName);

    if (!existsSync(path)) {
      throw new NotFoundException('No image product found');
    }

    return path;
  }
}
