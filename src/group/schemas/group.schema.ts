
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { UserShare } from 'src/user/dtos/user.dto';
import { GroupSchemaInterface, GroupType } from '../interfaces/group.interface';

@Schema({versionKey: false})
export class Group extends Document implements GroupSchemaInterface {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: GroupType;

  @Prop()
  followers: UserShare[];
}

export type GroupModel = Model<Group>;
export const GroupSchema = SchemaFactory.createForClass(Group);

export const GroupSchemaImport = {
  name: Group.name,
  schema: GroupSchema,
};

