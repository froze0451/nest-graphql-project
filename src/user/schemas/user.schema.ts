
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { GroupShare } from 'src/group/dtos/group.dto';
import { UserShare } from '../dtos/user.dto';
import { UserSchemaInterface } from '../interfaces/user.interface';

@Schema({versionKey: false})
export class User extends Document implements UserSchemaInterface {
  @Prop()
  name: string
  
  @Prop()
  age: number

  @Prop()
  friends: UserShare[];

  @Prop()
  groups: GroupShare[];
}

export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserSchemaImport = {
  name: User.name,
  schema: UserSchema,
};