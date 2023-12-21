import { CreateOtpDto, CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Otp } from 'src/otp/entities/otp.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private jwtService: JwtService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      const { username, password, phone, otp } = createUserDto;
      console.log({ createUserDto });
      const existingUser = await this.userModel.find({ phone });
      console.log({ existingUser });
      if (existingUser.length > 0) {
        console.log('already');
        return new NotFoundException();
      }
      const otpRes = await this.otpModel.findOne({ phone, code: otp });
      console.log({ otpRes });
      if (!otpRes) {
        throw new NotFoundException('Otp Verification Failed');
      }
      otpRes.isVerified = true;
      await otpRes.save();
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({ username, password: hash, phone });
      return { message: 'Registration completed' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  async loginUser(createUserDto: LoginDto): Promise<string> {
    try {
      const { username, password } = createUserDto;
      const user = await this.userModel.findOne({ username });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid login credentials');
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }

  async getMe(id: string): Promise<User> {
    const userDocument = await this.userModel.findById(id).populate('address');
    return userDocument;
  }

  findAll() {
    return `This action returns all user`;
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
}
