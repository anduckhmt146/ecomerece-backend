import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './entities/users.entity';
import { UserType } from './types/users.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UsersDocument>,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      // Generate hash password
      // createUserDto.password = await generateHashPassword(
      //   createUserDto.password,
      // );

      // check it is for admin
      if (
        createUserDto.type == UserType.ADMIN &&
        createUserDto.secretToken == process.env.SECRET_TOKEN
      ) {
        throw new Error('Now allow to create admin');
      }

      // check user is exist
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        throw new Error('User is already exist');
      } else {
        createUserDto.isVerified = true;
      }

      // Generate OTP
      const min = 100000,
        max = 999999;
      const otp = Math.floor(Math.random() * (max - min)) * min;
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5);

      // create new user
      const newUser = await this.userModel.create({
        ...createUserDto,
        // otp,
        // otpExpiryTime,
      });
      if (newUser.type !== UserType.ADMIN) {
        await this.mailService.sendUserConfirmation(newUser, otp);
      }
      return {
        success: true,
        message: 'User created successfully',
        result: { email: newUser.email },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUser: LoginDto) {
    return 'login';
  }
}
