import { CreatePostDto } from '../dtos/create-post.dto';
import { Injectable } from '@nestjs/common';
import { MetaOptionsService } from './../../meta-options/providers/meta-options/meta-options.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository, DeepPartial } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
   let post = this.postsRepository.create(createPostDto as DeepPartial<Post>);

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    let posts = await this.postsRepository.find({
      relations: {metaOptions: true},
    });

    return posts;
  }

  public async delete(id: number){
    let post = await this.postsRepository.findOneBy({id});
    // if(!post){
    //   throw new Error('Post not found');
    // }
    // this.postsRepository.delete({id});
    // this.metaOptionsRepository.delete(post.metaOptions!.id);

    let inversPost = await this.metaOptionsRepository.find({
      where: {id: post!.metaOptions!.id},
      relations: {post: true}
    });
    console.log(inversPost);
    

    return {deleted: true, id};
  }
}