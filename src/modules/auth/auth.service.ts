import {
  Injectable,
  ForbiddenException,
  UnprocessableEntityException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSecurityService } from '../user_security/user_security.service';
import { hashPassword } from 'src/common_utils/helpers/function.helper';
import * as bcrypt from 'bcrypt';
import { TOKEN_TYPE } from 'src/utils/helper/interface.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<unknown>,
    private readonly userSecurityService: UserSecurityService,
  ) {}

  public async signup(body) {
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
        throw new UnauthorizedException({ message: 'Invalid password' });
      }
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  public async forgotPassword(body) {
    const user = await this.userModel.findOne({ email: body.email }).lean();
    if (user) {
      await this.userSecurityService.sendOTP('email', user._id);
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
    const user = await this.userModel.findById({ _id: body.user_id }).lean();
    if (user) {
      const password = await hashPassword(body.password);
      await this.userSecurityService.updateUserSecurity(
        { user_id: body.user_id },
        { password },
      );
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
    const user = await this.userModel.findById(body.user_id).lean();
    if (user) {
      await this.userSecurityService.updateUserSecurity(
        { user_id: body.user_id },
        { is_logged_in: false },
      );
      return {
        message: 'Logout success',
      };
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }
}
