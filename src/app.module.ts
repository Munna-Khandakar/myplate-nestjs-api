import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatesModule } from './plates/plates.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { ResponseFormatInterceptor } from './interceptors/responseFormat.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    PlatesModule,
    AddressModule,
    UserModule,
    CategoryModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
  ],
})
export class AppModule {}
