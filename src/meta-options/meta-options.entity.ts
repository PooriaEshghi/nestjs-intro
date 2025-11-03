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
