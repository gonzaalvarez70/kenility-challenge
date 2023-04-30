import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: number;

  @Prop()
  address: string;

  @Prop()
  profilePicture: string;
}

export const CatSchema = SchemaFactory.createForClass(User);
