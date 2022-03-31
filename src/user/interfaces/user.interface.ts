import { GroupShare } from "src/group/dtos/group.dto";
import { UserShare } from "../dtos/user.dto";

export interface UserSchemaInterface {
  name: string;
  age: number;
  friends: UserShare[];
  groups: GroupShare[];
}
