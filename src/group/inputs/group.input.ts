import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsMongoId, IsString, MaxLength } from "class-validator";
import { GroupType, GroupTypeValue } from "../interfaces/group.interface";

@InputType()
export class GroupCreateInput {
  @Field()
  @IsString()
  @MaxLength(100)
  readonly name: string

  @Field()
  @IsString()
  @MaxLength(2000)
  readonly description: string

  @Field()
  @IsIn(GroupTypeValue)
  readonly type: GroupType
}

@InputType()
export class BaseGroupInput {
  @Field()
  @IsMongoId()
  readonly userId: string;

  @Field()
  @IsMongoId()
  readonly groupId: string;
}

@InputType() 
export class EditGroupInput extends BaseGroupInput { 
  @Field()
  @IsString()
  @MaxLength(100)
  readonly name: string

  @Field()
  @IsString()
  @MaxLength(2000)
  readonly description: string

  @Field()
  @IsIn(GroupTypeValue)
  readonly type: GroupType
}