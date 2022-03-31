import { Field, InputType, Int } from "@nestjs/graphql";
import { IsMongoId, IsNumber, IsString, MaxLength } from "class-validator";

@InputType()
export class BaseUserInput {
  @Field()
  @IsMongoId()
  readonly userId: string;
}

@InputType()
export class UserCreateInput {
  @Field()
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @Field(() => Int)
  @IsNumber()
  readonly age: number;
}

@InputType()
export class UserEditInput extends BaseUserInput {
  @Field()
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @Field(() => Int)
  @IsNumber()
  readonly age: number;
}

@InputType()
export class UserDeleteInput extends BaseUserInput {
  @Field()
  @IsMongoId()
  readonly friendId: string;
}