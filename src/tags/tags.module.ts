import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Type])],
})
export class TagsModule {}
