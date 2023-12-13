import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import * as request from 'request';
import * as otpGenerator from 'otp-generator';
import { ConfigService } from '@nestjs/config';
import { Otp } from './entities/otp.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name)
    private otpModel: Model<Otp>,
    private readonly configService: ConfigService,
  ) {}

  getUsername(): string {
    return this.configService.get('BULKSMSDB_USERNAME');
  }

  getPassword(): string {
    return this.configService.get('BULKSMSDB_PASSWORD');
  }

  async sendSms(receiver: string, otpCode: string) {
    const msg = `Your MyPlate OTP code is ${otpCode}`;
    const username = this.getUsername();
    const password = this.getPassword();
    const url = `http://66.45.237.70/api.php?username=${username}&password=${password}&number=${receiver}&message=${msg}`;
    return new Promise((resolve, reject) => {
      request(
        {
          method: 'POST',
          url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        (error, response) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(response.body);
        },
      );
    });
  }

  generateOtp(length: number = 6, options?: otpGenerator.GeneratorOptions) {
    return otpGenerator.generate(length, options);
  }

  async create(createOtpDto: CreateOtpDto) {
    const otpCode = this.generateOtp();
    const message = `Your MyPlate OTP code is: ${otpCode}`;

    try {
      // Check if existing OTP exists for the phone number
      const existingOtp = await this.otpModel.findOne({
        phone: createOtpDto.phone,
      });

      if (existingOtp) {
        // Update existing OTP with new code only if it's not verified yet
        if (!existingOtp.isVerified) {
          existingOtp.code = otpCode;
          await existingOtp.save();
          console.log(`Updated existing OTP for phone: ${createOtpDto.phone}`);
          this.sendSms(createOtpDto.phone, message);
          return { message: 'OTP code sent' };
        } else {
          console.log(
            `Existing OTP is already verified for phone: ${createOtpDto.phone}`,
          );
          return { messagemsg: 'this phone number is already verified' }; // Customize response message
        }
      } else {
        // No existing OTP found, create a new one
        const savedOtp = await new this.otpModel({
          phone: createOtpDto.phone,
          isVerified: false,
          code: otpCode,
        }).save();
        console.log(`Created new OTP for phone: ${createOtpDto.phone}`);
        savedOtp; // Optional: Utilize the saved OTP object for further processing
        this.sendSms(createOtpDto.phone, message);
      }

      return { message: 'OTP code sent' };
    } catch (error) {
      // Handle error and return appropriate response
      console.error(error);
      return { message: 'error', error: error.message };
    }
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
