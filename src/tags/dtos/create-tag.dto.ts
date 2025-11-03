import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, IsString, MaxLength, Matches, IsOptional, IsJSON, IsUrl } from "class-validator";

export class CreateTagDto {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "For example 'my-url'",
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsJSON()
    @IsOptional()
    schema?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;
}

