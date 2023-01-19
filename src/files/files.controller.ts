import { Response } from 'express';
import { diskStorage } from 'multer';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter';
import { fileNamer } from './helpers/fileNamer';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${process.env.HOST_URL}/files/product/${file.filename}`;

    return { secureUrl };
  }

  @Get('product/:imgName')
  getProductImage(@Res() res: Response, @Param('imgName') imgName: string) {
    const path = this.filesService.getStaticProductImage(imgName);

    res.sendFile(path);
  }
}
