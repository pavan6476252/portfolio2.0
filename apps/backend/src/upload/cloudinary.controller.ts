import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
 
@Controller('upload')
export class cloudinaryController {
  constructor(private readonly uploadService: CloudinaryService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return this.uploadService.uploadImage(file);
  // }
}
