import { UserShare } from "src/user/dtos/user.dto";

export type GroupType = 'gaming' | 'sport' | 'work'
export const GroupTypeValue = ['gaming', 'sport', 'work'] as const;


export interface GroupSchemaInterface {
  name: string,
  description: string,
  type: GroupType,
  followers: UserShare[],
}