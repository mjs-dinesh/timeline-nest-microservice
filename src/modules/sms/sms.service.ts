import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
@Injectable()
export class SMSService {
  constructor(private eventEmitter: EventEmitter2){}

  emitEvent(event, payload?: any) {
    this.eventEmitter.emit(event, payload)
  }

  @OnEvent('sms_send')
  async sendSMSEvent(message) {
    // TODO: send to kafka queue
    console.log("listening sms event ===>", message);
  }
}
