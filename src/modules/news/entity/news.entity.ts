import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({
    nullable: true,
  })
  pubDate: string;

  @Column({
    type: 'text',
  })
  keywords: string;
}
