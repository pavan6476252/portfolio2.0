import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { Education } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  providers: [EducationService, EducationResolver],
})
export class EducationModule {}
