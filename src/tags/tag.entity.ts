<<<<<<< HEAD
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImage: string;

  // https://orkhan.gitbook.io/typeorm/docs/decorator-reference
  @CreateDateColumn()
  createDate: Date;
=======
import { create } from "domain";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";

@Entity()
export class Tag {
    
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique:true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique:true
    })
    slug: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'json',
        nullable: true
    })
    schema: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true
    })
    featuredImage: string;

    @CreateDateColumn()
    createDate: Date;
>>>>>>> d4ae539aef6d8a931221094f94fdc5d456fd70dd

  @UpdateDateColumn()
  updateDate: Date;

<<<<<<< HEAD
  // Add this decorartor and column enables soft delete
  @DeleteDateColumn()
  deletedAt: Date;
}
=======
    @DeleteDateColumn()
    deletedAt: Date;
}


>>>>>>> d4ae539aef6d8a931221094f94fdc5d456fd70dd
