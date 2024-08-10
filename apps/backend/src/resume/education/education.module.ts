import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { Education } from './entities/education.entity';
import { CloudinaryModule } from '../../upload/cloudinary.module';
import { CloudinaryService } from '../../upload/cloudinary.service';
import { User } from '../../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education,User]),CloudinaryModule],
  providers: [EducationService, EducationResolver,CloudinaryService],
})
export class EducationModule {}
