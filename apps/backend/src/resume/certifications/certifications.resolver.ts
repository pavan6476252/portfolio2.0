import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CertificationsService } from './certifications.service';
import { Certification } from '../entities/certifications.entity';
import { CreateCertificationDTO } from '../dto/create-certificate.dto';
import { UpdateCertificationDTO } from '../dto/update-certificate.dto';
 
@Resolver(() => Certification)
export class CertificationsResolver {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Query(() => [Certification])
  async getCertifications(): Promise<Certification[]> {
    return this.certificationsService.findAll();
  }

  @Query(() => Certification)
  async getCertification(@Args('id') id: number): Promise<Certification> {
    return this.certificationsService.findOne(id);
  }

  @Mutation(() => Certification)
  async createCertification(@Args('createCertificationDto') createCertificationDto: CreateCertificationDTO): Promise<Certification> {
    return this.certificationsService.create(createCertificationDto);
  }

  @Mutation(() => Certification)
  async updateCertification(
    @Args('id') id: number,
    @Args('updateCertificationDto') updateCertificationDto: UpdateCertificationDTO,
  ): Promise<Certification> {
    return this.certificationsService.update(id, updateCertificationDto);
  }

  @Mutation(() => Boolean)
  async deleteCertification(@Args('id') id: number): Promise<boolean> {
    await this.certificationsService.remove(id);
    return true;
  }
}
