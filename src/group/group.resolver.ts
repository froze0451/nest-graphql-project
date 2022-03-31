import { ForbiddenException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "src/user/user.service";
import { CreateGroupDto } from "./dtos/group.dto";
import { GroupService } from "./group.service";
import { BaseGroupInput, EditGroupInput, GroupCreateInput } from "./inputs/group.input";

@Resolver()
export class GroupResolver {
  constructor (
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [CreateGroupDto]) 
  async getAllGroups() {
    return await this.groupService.getAll();
  }

  @Query(() => CreateGroupDto)
  async getGroup(@Args ('input') {userId, groupId}: BaseGroupInput) {
    // запрос совершает существующий пользователь
    await this.userService.get(userId);
    return await this.groupService.get(groupId)
  }

  @Mutation(() => CreateGroupDto)
  async createGroup(@Args ('input') input: GroupCreateInput) {
    return await this.groupService.createGroup(input)
  }

  @Mutation(() => CreateGroupDto)
  async editGroup(@Args ('input') {userId, ...data}: EditGroupInput) {
    await this.userService.get(userId);
    return await this.groupService.edit(data)
  }

  @Mutation(() => CreateGroupDto)
  async deleteGroup(@Args ('input') {userId, groupId}: BaseGroupInput) {
    const user = await this.userService.get(userId);

    const userGroupIds = user.groups.map(group => group.id)
    if (!userGroupIds.includes(groupId)) throw new ForbiddenException()

    const {id, followers} = await this.groupService.get(groupId)

    if (followers.length > 0) {
      const followersIds = followers.map(follower => follower.id)
      await this.userService.unfollowGroup(followersIds, groupId)
    }

    return await this.groupService.remove(id)
  }
}

  


