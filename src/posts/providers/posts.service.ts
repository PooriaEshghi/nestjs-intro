import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption) private readonly metaOptionsRepository: Repository<MetaOption>
  ) {}

  public async create(dto: CreatePostDto) {
    // 1) Risolvi relazioni
    const author = await this.usersService.findOneById(dto.authorId);
    if (!author) throw new NotFoundException('Author not found');

    let tags: Tag[] = [];
    if (dto.tags?.length) {
      tags = await this.tagsService.findMultipleTags(dto.tags);
      if (tags.length !== dto.tags.length)
        throw new BadRequestException('One or more tags not found');
    }

    // 2) Crea Post (niente spread cieco)
    const post = this.postsRepository.create({
      title: dto.title,
      postType: dto.postType,
      slug: dto.slug,
      status: dto.status,
      content: dto.content,
      schema: dto.schema,
      featuredImageUrl: dto.featuredImageUrl,
      publishOn: dto.publishOn ? new Date(dto.publishOn) : undefined,
      author,
      tags,
    });

    const saved = await this.postsRepository.save(post);

    // 3) MetaOptions in **secondo step** (stessa maniera: repo giusto → save)
    if (dto.metaOptions) {
      const meta = this.metaOptionsRepository.create({ ...dto.metaOptions, post: saved });
      await this.metaOptionsRepository.save(meta);
      saved.metaOptions = meta; // per ritornare payload completo
    }

    return saved;
  }

  public async findAll(userId: string) {
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        //author: true,
        // tags: true,
      },
    });

    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags: Tag[] | null = null;
    let post: Post | null = null;

    if (!patchPostDto.tags || !patchPostDto.tags.length) {
      throw new BadRequestException('Please provide at least one tag id');
    }
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        }
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('Please check your tag Ids and ensure they are correct');
    }

    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        }
      );
    }

    if (!post) {
      throw new BadRequestException('The post Id does not exist');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    post.tags = tags;

    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        }
      );
    }
    return post;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
