import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from 'src/group/group.service';
import { GroupSchemaImport } from 'src/group/schemas/group.schema';
import { UserSchemaImport } from './schemas/user.schema';
import { UsersResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([UserSchemaImport, GroupSchemaImport])
  ],
  providers: [UsersResolver, UserService, GroupService]
})
export class UsersModule {}
