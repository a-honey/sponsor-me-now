import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { CommentEntity } from "./comment.entity";
import { LikeEntity } from "./like.entity";

@Entity("Post")
@Unique(["id", "authorId"])
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  authorId: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ nullable: true })
  postImg: string;

  // Relationships
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: "authorId" })
  author: UserEntity;
}