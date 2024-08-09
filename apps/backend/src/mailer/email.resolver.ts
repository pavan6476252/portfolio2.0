import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { EmailService } from "./email.service";
import { MailInput } from "./entities/mailer.input.dto";

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  async sendEmail(@Args("emailInput") mailInput: MailInput): Promise<boolean> {
    await this.emailService.sendEmail(mailInput);
    return true;
  }
}