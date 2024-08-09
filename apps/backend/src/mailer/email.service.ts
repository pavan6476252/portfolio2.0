import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { MailInput } from "./entities/mailer.input.dto";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailInput: MailInput): Promise<void> {
    await this.mailerService.sendMail({
      to: mailInput.to,
      subject: mailInput.subject, 
      html: mailInput.html,
    });
    // await this.mailerService.sendMail(mailInput);
  }
}
