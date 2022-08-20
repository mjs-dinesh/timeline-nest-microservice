import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserSecurityService } from '../user_security/user_security.service';
import { AuthService } from './auth.service';
import { DisableGauthDto } from './dto/disable_gauth.dto';
import { EnableGauthDto } from './dto/enable_gauth.dto';
import { ForgotPasswordDto } from './dto/forgot_password.dto';
import { GenerateGauthSecretDto } from './dto/generate_gauth_secret.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { SendOTPDto } from './dto/send_otp.dto';
import { SignupDto } from './dto/sign_up.dto';
import { VerifyOTPDto } from './dto/verify_otp.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userSecurityService: UserSecurityService,
  ) {}

  @MessagePattern('signup')
  public async signup(body: SignupDto) {
    return this.authService.signup(body);
  }

  @MessagePattern('login')
  public async login(body: LoginDto) {
    return this.authService.login(body);
  }

  @MessagePattern('forgot_password')
  public async forgotPassword(body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @MessagePattern('reset_password')
  public async resetPassword(body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @MessagePattern('verify_otp')
  public async verifyOTP(body: VerifyOTPDto) {
    const isValidOTP = await this.userSecurityService.verifyOTP(
      body.type,
      body,
    );
    if (isValidOTP) {
      return {
        message: 'OTP verified successfully',
        token: isValidOTP,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Invalid OTP',
      };
    }
  }

  @MessagePattern('send_otp')
  public async sendOTP(body: SendOTPDto) {
    return this.userSecurityService.sendOTP('email', body.user_id);
  }

  @MessagePattern('generate_gauth_secret')
  public async generateGauthSecret(body: GenerateGauthSecretDto) {
    return this.userSecurityService.generateGauthSecret(body);
  }

  @MessagePattern('enable_gauth')
  public async enableGauth(body: EnableGauthDto) {
    return this.userSecurityService.enableOrDisableGauth(body, true);
  }

  @MessagePattern('disable_gauth')
  public async disableGauth(body: DisableGauthDto) {
    return this.userSecurityService.enableOrDisableGauth(body, false);
  }

  @MessagePattern('logout')
  public async logout(body: LogoutDto) {
    return this.authService.logout(body);
  }
}
