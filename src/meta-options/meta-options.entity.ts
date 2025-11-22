import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from 'src/posts/post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string; // meglio any/Record<string, any>, ma questo è un altro discorso

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

 @ManyToOne(() => Post, (p) => p.metaOptions, {
  eager: false,
  onDelete: 'CASCADE',
})
@JoinColumn()      // lato owner: qui vive la FK postId
post: Post;

}
