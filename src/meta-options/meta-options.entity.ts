<<<<<<< HEAD
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  mataValue: string;

  @CreateDateColumn()
  createDate: Date;

  @CreateDateColumn()
  updateDate: Date;
}
=======
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: false,
    })
    metaValue: string;


    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;
}
>>>>>>> d4ae539aef6d8a931221094f94fdc5d456fd70dd
