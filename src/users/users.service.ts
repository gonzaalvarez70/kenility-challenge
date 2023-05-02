import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private s3Service: S3ManagerService,
  ) {}

  async create(
    createUserDto: Partial<CreateUserDto>,
    file: Express.Multer.File = null,
  ): Promise<Record<string, string>> {
    try {
      const existingUser = await this.findByUsername(createUserDto.username);
      if (existingUser) {
        console.log(existingUser);
        throw new Error(`Username ${createUserDto.username} already exists`);
      }
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      let profilePicture = '';
      if (file) {
        const uploadResult = await this.s3Service.upload(file);
        profilePicture = uploadResult.Location;
      }
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        profilePicture,
      });
      return { _id: (await createdUser.save())._id.toString() };
    } catch (error) {
      Logger.error(`Error creating new user ${error}`);
      throw new Error(`Error creating new user`);
    }
  }

  findAll(): Promise<UserDocument[]> {
    // Using projection to avoid returning password
    return this.userModel
      .find(null, {
        _id: 1,
        username: 1,
        name: 1,
        lastName: 1,
        address: 1,
        profilePicture: 1,
      })
      .exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Record<string, string>> {
    // DTO  processing Field by Field to avoid updating password
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        username: updateUserDto.username,
        name: updateUserDto.name,
        lastName: updateUserDto.lastName,
        address: updateUserDto.address,
      },
      { new: true },
    );
    if (!updatedUser) {
      throw new Error(`No user found to be updated`);
    }
    return { _id: (await updatedUser.save())._id.toString() };
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username: username }).exec();
  }
}
