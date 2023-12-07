import { Inject, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import * as request from 'request';
import * as otpGenerator from 'otp-generator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
  constructor(private readonly configService: ConfigService) {}

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
    // save to db
    const message = `Your MyPlate OTP code is: ${otpCode}`;
    return this.sendSms(createOtpDto.phone, message);
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
