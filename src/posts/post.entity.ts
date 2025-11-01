import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options.dto';
import { PostStatus } from './enums/postStatus.enum';
import { PostType } from './enums/postType.enum';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'enum',
        enum: PostType,
        nullable: false,
        default: PostType.POST
    })
    postType: PostType;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique:true
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        nullable: false,
        default: PostStatus.DRAFT
    })
    status: PostStatus;

    @Column({
        type: 'text',
        nullable: false,
    })
    content?: string;
    
    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featureImageUrl?: string;
    
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    publishOn?: Date;
    
  
    tags?: string;
   
    metaOptions?: CreatePostMetaOptionsDto[];
}
