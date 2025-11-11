import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() { return this.postsService.findAll(); }

  @Get(':userId')
  getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post()
  public createPost(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @ApiOperation({ summary: 'Update an existing post' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @Patch()
  public updatePost(@Body() dto: PatchPostDto) {
    return this.postsService.update(dto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
