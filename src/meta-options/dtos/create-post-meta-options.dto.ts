<<<<<<< HEAD
import { IsJSON, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
=======
import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {

    @IsNotEmpty()
    @IsJSON()
    metaValue: string;
}
>>>>>>> d4ae539aef6d8a931221094f94fdc5d456fd70dd
