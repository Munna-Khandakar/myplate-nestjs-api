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
import { Otp } from 'src/otp/entities/otp.entity';
import { Address } from 'src/address/entities/address.entity';
import { Plate } from 'src/plates/entities/plate.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(Plate.name) private plateModel: Model<Plate>,
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
      const existingUser = await this.userModel.find({ phone });
      if (existingUser.length > 0) {
        return new NotFoundException();
      }
      const otpRes = await this.otpModel.findOne({ phone, code: otp });
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
      const { phone, password } = createUserDto;
      const user = await this.userModel.findOne({ phone });
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

  async getMe(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    const plateCount = await this.plateModel.countDocuments({ host: id });
    const recentPosts = await this.plateModel
      .find({ host: id })
      .sort({ createdAt: -1 })
      .limit(5);
    return { plateCount, user, recentPosts };
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
