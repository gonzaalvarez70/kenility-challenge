import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtWrapperModule } from './auth/jwt.module';
import { S3ManagerModule } from './s3-manager/s3-manager.module';
import { AwsSdkModule } from 'nest-aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtWrapperModule,
    UsersModule,
    S3ManagerModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            endpoint: configService.get('AWS_ENDPOINT'),
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
            credentials: {
              accessKeyId: configService.get('AWS_ACCESS_KEY'),
              secretAccessKey: configService.get('AWS_SECRET_KEY'),
            },
          };
        },

        inject: [ConfigService],
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGO_DB_USER',
        )}:${configService.get(
          'MONGO_DB_PASSWORD',
        )}@localhost:27017/example?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
