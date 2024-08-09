import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "api",
          pass: "babc61cfa2f86eac4aae0d5532a2ef79"
        }
      },
      defaults: {
        from: '"No Reply" <mailtrap@demomailtrap.com>',
      },
    }),
  ],
  providers: [EmailService, EmailResolver],
})
export class EmailModule {}
