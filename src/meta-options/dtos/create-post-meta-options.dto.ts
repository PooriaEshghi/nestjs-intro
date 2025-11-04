import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString, MaxLength } from 'class-validator';

// create-post-meta-options.dto.ts
export class CreatePostMetaOptionsDto {
  @ApiProperty({
    type: String,
    example: '{"sidebarEnabled":true,"footerActive":true}',
  })
  @IsString()
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
