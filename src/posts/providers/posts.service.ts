import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
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

  public async update(dto: PatchPostDto) {
    const existing = await this.postsRepository.findOne({
      where: { id: dto.id },
      relations: { metaOptions: true, tags: true, author: true },
    });
    if (!existing) throw new NotFoundException('Post not found');

    // aggiorna solo i campi presenti (stessa maniera: semplice e chiaro)
    if (dto.title !== undefined) existing.title = dto.title;
    if (dto.postType !== undefined) existing.postType = dto.postType;
    if (dto.slug !== undefined) existing.slug = dto.slug;
    if (dto.status !== undefined) existing.status = dto.status;
    if (dto.content !== undefined) existing.content = dto.content;
    if (dto.schema !== undefined) existing.schema = dto.schema;
    if (dto.featuredImageUrl !== undefined) existing.featuredImageUrl = dto.featuredImageUrl;
    if (dto.publishOn !== undefined)
      existing.publishOn = dto.publishOn ? new Date(dto.publishOn) : undefined;

    if (dto.authorId !== undefined) {
      const author = await this.usersService.findOneById(dto.authorId);
      if (!author) throw new NotFoundException('Author not found');

      existing.author = existing.author ?? author;
    }

    if (dto.tags !== undefined) {
      const tags = dto.tags.length ? await this.tagsService.findMultipleTags(dto.tags) : [];
      if (dto.tags.length && tags.length !== dto.tags.length)
        throw new BadRequestException('One or more tags not found');
      existing.tags = tags;
    }

    if (dto.metaOptions !== undefined) {
      if (dto.metaOptions === null) {
        existing.metaOptions = null as any; // se vuoi supportare rimozione meta
      } else if (existing.metaOptions) {
        Object.assign(existing.metaOptions, dto.metaOptions);
        await this.metaOptionsRepository.save(existing.metaOptions);
      } else {
        const meta = this.metaOptionsRepository.create({ ...dto.metaOptions, post: existing });
        await this.metaOptionsRepository.save(meta);
        existing.metaOptions = meta;
      }
    }

    return this.postsRepository.save(existing);
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
