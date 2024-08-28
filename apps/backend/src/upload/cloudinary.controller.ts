import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Request,
  Body,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import 'multer';
@Controller("upload")
export class cloudinaryController {
  constructor(private readonly uploadService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Body() body: { folderName: string },
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.uploadService.uploadImage(file, body.folderName);
  }
  @Delete()
  @UseInterceptors(FileInterceptor("file"))
  async deleteFile(
    @Body() body: { fileName: string },
    
  ) {
    return this.uploadService.deleteFile(body.fileName);
  }
}
