import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Nodemailer } from './nodemailer';
@Injectable()
export class MailService {
  constructor(private eventEmitter: EventEmitter2) {}

  emitEvent(event, payload?: any) {
    this.eventEmitter.emit(event, payload);
  }

  @OnEvent('mail_send')
  async sendMailEvent(message) {
    // TODO: send to kafka queue
    console.log('listening mail event ===>', message);
    Nodemailer(message.email, message.otp);
  }
}
