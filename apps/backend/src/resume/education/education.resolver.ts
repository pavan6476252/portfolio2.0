import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EducationService } from './education.service';
import { Education } from './entities/education.entity';
import { CreateEducationDto,  } from './dto/create-education.input';
import { UpdateEducationDto } from './dto/update-education.input';

@Resolver(() => Education)
export class EducationResolver {
  constructor(private readonly educationService: EducationService) {}

  @Mutation(() => Education)
  createEducation(@Args('createEducationDto') createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Query(() => [Education], { name: 'educations' })
  findAll() {
    return this.educationService.findAll();
  }

  @Query(() => Education, { name: 'education' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.educationService.findOne(id);
  }

  @Mutation(() => Education)
  updateEducation(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEducationDto') updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Mutation(() => Boolean)
  removeEducation(@Args('id', { type: () => Int }) id: number) {
    this.educationService.remove(id);
    return true;
  }
}
