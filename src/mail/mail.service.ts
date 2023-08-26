import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersDocument } from 'src/users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UsersDocument, otp: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Digizone! Confirm your Email',
      template: 'confirmation.hbs',
      context: {
        name: user.email,
        otp,
      },
    });
  }
}
