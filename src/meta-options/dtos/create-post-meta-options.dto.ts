import { IsJSON, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
