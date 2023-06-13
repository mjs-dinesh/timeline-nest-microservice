import {
  Injectable,
  ForbiddenException,
  UnprocessableEntityException,
  NotFoundException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSecurityService } from '../user_security/user_security.service';
import {
  hashPassword,
  isValidPassword,
} from 'src/common_utils/helpers/function.helper';
import * as bcrypt from 'bcrypt';
import { TOKEN_TYPE } from 'src/utils/helper/interface.helper';
import { UserActivitiesService } from '../user_activities/user_activities.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<unknown>,
    private readonly userSecurityService: UserSecurityService,
    private readonly userActivitiesService: UserActivitiesService,
  ) {}

  public async signup(body) {
    const activity = {
      type: 'LOGIN',
      ...body.device_info,
    };
    const createUser = await this.userModel.create(body);
    if (createUser) {
      const password = await hashPassword(body.password);
      const token = await this.userSecurityService.createUserSecurity({
        user_id: createUser._id,
        password,
        is_logged_in: true,
      });
      if (token) {
        await this.userSecurityService.sendOTP(
          'email',
          createUser._id.toString(),
        );
        this.userActivitiesService.create({
          message: 'Signup success',
          activity: 'Signup',
          status: 'SUCCESS',
          user_id: createUser._id,
          ...activity,
        });
        return {
          message: 'Signup success',
          token: await this.userSecurityService.provideToken(
            {
              user_id: createUser._id,
            },
            TOKEN_TYPE.MEDIUM,
          ),
        };
      }
      throw new UnprocessableEntityException();
    }
    throw new ForbiddenException();
  }

  public async login(body) {
    const activity = {
      type: 'LOGIN',
      ...body.device_info,
    };
    const user: any = await this.userModel
      .findOne({ email: body.email })
      .lean();
    if (user) {
      const userSecurity: any = await this.userSecurityService.getUserSecurity({
        user_id: user._id,
      });
      const isValidPassword = await bcrypt.compare(
        body.password,
        userSecurity.password,
      );
      await this.userSecurityService.updateUserSecurity(
        { user_id: user._id },
        { is_logged_in: true },
      );
      if (isValidPassword) {
        await this.userSecurityService.sendOTP('email', user._id);
        this.userActivitiesService.create({
          message: 'Login Success',
          activity: 'Login',
          status: 'SUCCESS',
          user_id: user._id,
          ...activity,
        });
        return {
          message: 'Login success',
          token: await this.userSecurityService.provideToken(
            {
              user_id: user._id,
            },
            TOKEN_TYPE.MEDIUM,
          ),
        };
      } else {
        this.userActivitiesService.create({
          message: 'Invalid password',
          activity: 'Login',
          status: 'FAILED',
          user_id: user._id,
          ...activity,
        });
        throw new UnauthorizedException({ message: 'Invalid password' });
      }
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  public async changePassword(body) {
    const activity = {
      type: 'SECURITY',
      ...body.device_info,
    };
    const user: any = await this.userModel
      .findById({ _id: body.user_id })
      .lean();
    if (user) {
      const userSecurity: any = await this.userSecurityService.getUserSecurity({
        user_id: user._id,
      });
      const isPasswordCorrect = await isValidPassword(
        body.old_password,
        userSecurity.password,
      );
      if (isPasswordCorrect) {
        const password = await hashPassword(body.password);
        await this.userSecurityService.updateUserSecurity(
          { user_id: body.user_id },
          { password },
        );
        this.userActivitiesService.create({
          message: 'Password changed',
          activity: 'Change Password',
          status: 'SUCCESS',
          user_id: user._id,
          ...activity,
        });
        return {
          message: 'Password changed successfully',
        };
      } else {
        this.userActivitiesService.create({
          message: 'Password wrong',
          activity: 'Change Password',
          status: 'FAILED',
          user_id: user._id,
          ...activity,
        });
        return {
          message: 'Old Password Wrong',
          statusCode: HttpStatus.CONFLICT,
        };
      }
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  public async forgotPassword(body) {
    const activity = {
      type: 'SECURITY',
      ...body.device_info,
    };
    const user = await this.userModel.findOne({ email: body.email }).lean();
    if (user) {
      await this.userSecurityService.sendOTP('email', user._id);
      this.userActivitiesService.create({
        message: 'OTP Sent',
        activity: 'Forgot Password',
        status: 'SUCCESS',
        user_id: user._id,
        ...activity,
      });
      return {
        message: 'Please verify otp',
        token: await this.userSecurityService.provideToken(
          {
            user_id: user._id,
          },
          TOKEN_TYPE.MEDIUM,
        ),
      };
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  public async resetPassword(body) {
    const activity = {
      type: 'SECURITY',
      ...body.device_info,
    };
    const user = await this.userModel.findById({ _id: body.user_id }).lean();
    if (user) {
      const password = await hashPassword(body.password);
      await this.userSecurityService.updateUserSecurity(
        { user_id: body.user_id },
        { password },
      );
      this.userActivitiesService.create({
        message: 'Password changed',
        activity: 'Reset Password',
        status: 'SUCCESS',
        user_id: user._id,
        ...activity,
      });
      return {
        message: 'Password updated successfully',
        token: await this.userSecurityService.provideToken(
          {
            user_id: user._id,
          },
          TOKEN_TYPE.LONG,
        ),
      };
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  public async logout(body) {
    const activity = {
      type: 'LOGIN',
      ...body.device_info,
    };
    const user = await this.userModel.findById(body.user_id).lean();
    if (user) {
      await this.userSecurityService.updateUserSecurity(
        { user_id: body.user_id },
        { is_logged_in: false },
      );
      this.userActivitiesService.create({
        message: 'Logout success',
        activity: 'Logout',
        status: 'SUCCESS',
        user_id: user._id,
        ...activity,
      });
      return {
        message: 'Logout success',
      };
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }
}
