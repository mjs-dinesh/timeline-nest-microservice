import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GenerateSecret,
  GenerateTOTP,
  VerifyTOTP,
} from 'src/common_utils/helpers/function.helper';
import { TOKEN_TYPE } from 'src/utils/helper/interface.helper';
import { MailService } from '../mail/mail.service';
import { SMSService } from '../sms/sms.service';

@Injectable()
export class UserSecurityService {
  constructor(
    @InjectModel('user_securities')
    private readonly UserSecurityModel: Model<unknown>,
    @InjectModel('users')
    private readonly UserModel: Model<unknown>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly smsService: SMSService,
    private readonly configService: ConfigService,
  ) {}

  public async createUserSecurity(body) {
    const create = await this.UserSecurityModel.create(body);
    if (create) {
      const token = await this.provideToken({ user_id: body.user_id });
      return token;
    }
    return false;
  }

  public async updateUserSecurity(query, body) {
    const update = await this.UserSecurityModel.updateOne(query, body);
    if (update.modifiedCount !== 0) return true;
    return false;
  }

  public async getUserSecurity(query) {
    const data = await this.UserSecurityModel.findOne(query).lean();
    return data;
  }

  public async sendOTP(
    type = 'email',
    userId,
    tokenType: TOKEN_TYPE = TOKEN_TYPE.SHORT,
  ) {
    const secret = await GenerateSecret();
    const otp = await GenerateTOTP(secret, this.configService.get(tokenType));
    let body = {};
    body[`${type}_verification_token`] = secret;
    await this.updateUserSecurity({ user_id: userId }, body);
    const user: any = await this.UserModel.findOne({ _id: userId }).lean();
    if (!user) return false;
    if (type === 'email') {
      this.mailService.emitEvent('mail_send', { email: user.email, otp });
    }
    if (type === 'phone') {
      this.smsService.emitEvent('sms_send', { phone: user.phone, otp });
    }
    return true;
  }

  public async verifyOTP(
    type = 'email',
    body,
    tokenType: TOKEN_TYPE = TOKEN_TYPE.SHORT,
  ) {
    const userSecurity = await this.getUserSecurity({
      user_id: body.user_id,
    });
    const isValidOTP = await VerifyTOTP(
      body.otp,
      userSecurity[`${type}_verification_token`],
      type === 'gauth' ? 60 : this.configService.get(tokenType),
    );
    const updateBody = {
      [`${type}_verification_token`]: GenerateSecret(),
      [`is_${type}_verified`]: true,
    };
    if (isValidOTP) {
      type !== 'gauth' &&
        (await this.updateUserSecurity({ user_id: body.user_id }, updateBody));
      return this.provideToken({ user_id: body.user_id }, tokenType);
    }
    return isValidOTP;
  }

  public async provideToken(payload, tokenType: TOKEN_TYPE = TOKEN_TYPE.SHORT) {
    const token = await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get(tokenType),
    });
    return 'Bearer ' + token;
  }

  public async generateGauthSecret(body) {
    const secret = await GenerateSecret();
    const up = await this.updateUserSecurity(
      { user_id: body.user_id },
      { gauth_verification_token: secret },
    );
    await this.sendOTP('email', body.user_id);
    return {
      message: 'Gauth secret generated',
      gauth_secret: secret,
    };
  }

  public async enableOrDisableGauth(body, is_gauth_enabled) {
    const userSecurity: any = await this.getUserSecurity({
      user_id: body.user_id,
    });
    const isValidEmailOTP = await VerifyTOTP(
      body.email_otp,
      userSecurity.email_verification_token,
    );
    if (isValidEmailOTP) {
      const isValidGauthOTP = await VerifyTOTP(
        body.gauth_otp,
        userSecurity.gauth_verification_token,
        60,
      );
      if (isValidGauthOTP) {
        const updateBody: any = { is_gauth_enabled };
        if (!is_gauth_enabled) {
          updateBody.gauth_verification_token = GenerateSecret();
        }
        await this.updateUserSecurity({ user_id: body.user_id }, updateBody);
        return {
          message: `Guath ${
            is_gauth_enabled ? 'enabled' : 'disabled'
          } successfully`,
        };
      } else {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Invalid gauth OTP',
        };
      }
    } else {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Invalid email OTP',
      };
    }
  }
}
