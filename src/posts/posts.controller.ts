import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) Due route esplicite (niente '?')
  @Get()
  @ApiOperation({ summary: 'Lista posts (tutti o filtrati via query ?userId=)' })
  @ApiQuery({ name: 'userId', required: false })
  getPosts(@Query('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Lista posts di un utente' })
  @ApiParam({ name: 'userId' })
  getPostsByUser(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Creates a new blog post' })
  @ApiResponse({ status: 201, description: 'Post creato' })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

   @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }


  // Consiglio: PATCH va quasi sempre con un id
  // @ApiOperation({ summary: 'Updates an existing blog post' })
  // @ApiResponse({ status: 200, description: 'Post aggiornato' })
  // @Patch(':id')
  // @ApiParam({ name: 'id' })
  // updatePost(@Param('id') id: string, @Body() patchPostsDto: PatchPostDto) {
  //   return this.postsService.update(id, patchPostsDto);
  // }
}
