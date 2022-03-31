import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { ExistingFriendException, FollowedGroupException, SelfFriendRequestException } from "src/exceptions";
import { GroupService } from "src/group/group.service";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UserShare } from "./dtos/user.dto";
import { BaseUserInput, UserCreateInput, UserDeleteInput, UserEditInput } from "./inputs/user.input";
import { BaseGroupInput } from "src/group/inputs/group.input";

@Resolver()
export class UsersResolver {
  constructor (
    private readonly userService: UserService,
    private readonly groupService: GroupService
  ) {}

  @Query(() => CreateUserDto)
  async getUser(@Args ('input') {userId}: BaseUserInput) {
    return await this.userService.get(userId);
  }

  @Query(() => [CreateUserDto])
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args ('input') input: UserCreateInput) {
    return await this.userService.create(input)
  }

  @Mutation(() => CreateUserDto)
  async addFriend(@Args ('input') {userId, friendId}: UserDeleteInput) {
    if (userId === friendId) 
      throw new SelfFriendRequestException();

    const {friends, id} = await this.userService.get(userId);
    await this.userService.get(friendId);

    const userFriendsIds = friends.map(friend => friend.id)
    if (userFriendsIds.includes(friendId)) throw new ExistingFriendException()

    await this.userService.addFriend(friendId, id)
    return await this.userService.addFriend(id, friendId)
  }

  @Mutation(() => CreateUserDto)
  async followGroup(@Args ('input') {userId, groupId}: BaseGroupInput) {
    const user = await this.userService.get(userId);
    
    const userGroupsIds = user.groups.map(group => group.id)
    if (userGroupsIds.includes(groupId)) throw new FollowedGroupException()

    return await this.groupService.addFollower(plainToInstance(UserShare, user), groupId)
  }

  @Mutation(() => CreateUserDto)
  async deleteUser(@Args ('input') {userId}: BaseUserInput) {
    const {id, friends, groups} = await this.userService.get(userId);

    if (friends.length > 0) {
      const userFriendsIds = friends.map(friend => friend.id)
      await this.userService.removeFriend(id, userFriendsIds)
    }

    if (groups.length > 0) {
      const groupsIds = groups.map(group => group.id)
      await this.groupService.cancelFollow(id, groupsIds)
    }

    return await this.userService.remove(id);
  }

  @Mutation(() => CreateUserDto)
  async editUser(@Args ('input') data: UserEditInput) {
    const {groups, friends} = await this.userService.get(data.userId)

    if (friends.length > 0) {
      const friendsIds = friends.map(friend => friend.id)
      await this.userService.updateFriendsInfo(friendsIds, data)
    }

    if (groups.length > 0) {
      const groupsIds = groups.map(group => group.id)
      await this.groupService.editFollowersInfo(groupsIds, data)
    }

    return await this.userService.edit(data);
  }
}
