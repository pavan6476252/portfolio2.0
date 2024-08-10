import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CertificationsService } from "./certifications.service";
import { Certification } from "./entity/certifications.entity";
import { CreateCertificationDTO } from "./dto/create-certificate.dto";
import { UpdateCertificationDTO } from "./dto/update-certificate.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { ITokenPayload } from "../../auth/auth.service";

@Resolver(() => Certification)
export class CertificationsResolver {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Query(() => [Certification])
  async getCertifications(): Promise<Certification[]> {
    return this.certificationsService.findAll();
  }

  @Query(() => [Certification])
  @UseGuards(JwtAuthGuard)
  getMyCertificates(@Context("req") req: any): Promise<Certification[]> {
    const { sub } = req.user as ITokenPayload;
    return this.certificationsService.getMyCertificates(sub);
  }

  @Query(() => Certification)
  async getCertification(@Args("id") id: number): Promise<Certification> {
    return this.certificationsService.findOne(id);
  }

  @Mutation(() => Certification)
  @UseGuards(JwtAuthGuard)
  async createCertification(
    @Context("req") req: any,
    @Args("createCertificationDto")
    createCertificationDto: CreateCertificationDTO
  ): Promise<Certification> {
    const { sub } = req.user as ITokenPayload;
    return this.certificationsService.create(sub, createCertificationDto);
  }

  @Mutation(() => Certification)
  @UseGuards(JwtAuthGuard)
  async updateCertification(
    @Args("id") id: number,
    @Context("req") req: any,
    @Args("updateCertificationDto")
    updateCertificationDto: UpdateCertificationDTO
  ): Promise<Certification> {
    const { sub } = req.user as ITokenPayload;
    return this.certificationsService.update(sub, id, updateCertificationDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCertification(
    @Context("req") req: any,
    @Args("id") id: number
  ): Promise<boolean> {
    const { sub } = req.user as ITokenPayload;
    await this.certificationsService.remove(sub, id);
    return true;
  }
}
