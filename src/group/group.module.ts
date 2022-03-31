import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaImport } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';
import { GroupSchemaImport } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([GroupSchemaImport, UserSchemaImport])
  ],
  providers: [GroupResolver, UserService, GroupService]
})
export class GroupModule {}