import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @Column()
  userId: number;
}
