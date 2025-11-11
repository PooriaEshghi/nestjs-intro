import { MetaOptionsController } from './meta-options.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-options.entity';
import { MetaOptionsService } from './providers/meta-options/meta-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
  exports: [TypeOrmModule, MetaOptionsService],
})
export class MetaOptionsModule {}