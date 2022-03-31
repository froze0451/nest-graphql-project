import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Exclude, Expose, Transform } from "class-transformer";
import { GroupShare } from "src/group/dtos/group.dto";

@ObjectType()
export class CreateUserDto {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field(() => [UserShare])
  readonly friends?: UserShare[];

  @Field(() => [GroupShare])
  readonly groups?: GroupShare[];
}

@ObjectType()
@Exclude()
export class UserShare {
  @Expose()
  @Transform(({obj}) => obj.id)
  @Field()
  readonly id: string;

  @Expose()
  @Field()
  readonly name: string;

  @Expose()
  @Field()
  readonly age: number;
}
