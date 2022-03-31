import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Exclude, Expose, Transform } from "class-transformer";
import { UserShare } from "src/user/dtos/user.dto";
import { GroupType } from "../interfaces/group.interface";

@ObjectType()
export class CreateGroupDto {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly name: string

  @Field()
  readonly description: string

  @Field()
  readonly type: GroupType

  @Field(() => [UserShare])
  readonly followers: UserShare[];
}

@Exclude()
@ObjectType()
export class GroupShare { // модель для связи group-followers(users)
  @Expose()
  @Transform(({obj}) => obj.id)
  @Field()
  readonly id: string // _id ObjectId string

  @Expose()
  @Field()
  readonly name: string

  @Expose()
  @Field()
  readonly description: string

  @Expose()
  @Field()
  readonly type: GroupType
}
