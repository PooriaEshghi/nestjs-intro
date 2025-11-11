import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {

    constructor(
        private readonly tagsService: TagsService,
    ){}

    // @ApiOperation({ summary: 'Creates a new tag' })
    // @ApiResponse({ status: 201, description: 'Tag created' })
    @Post()
    createTag(@Body() createTagDto: CreateTagDto){
        return this.tagsService.create(createTagDto)
    }

    @Delete()
    public async delete(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.delete(id)
    }
    // tags/soft-delete
    @Delete('soft-delete')
    public async softDelete(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.softRemove(id)
    }
}
