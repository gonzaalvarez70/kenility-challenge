import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtWrapperModule } from './auth/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtWrapperModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGO_DB_USER',
        )}:${configService.get(
          'MONGO_DB_PASSWORD',
        )}@localhost:27017/kenility-challenge?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
