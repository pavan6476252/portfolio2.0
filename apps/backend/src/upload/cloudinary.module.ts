import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.config";
import { CloudinaryService } from "./cloudinary.service";
import { cloudinaryController } from "./cloudinary.controller";

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers:[cloudinaryController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
