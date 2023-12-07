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
import { User } from "./user";
import { Comment } from "./comment";
import { Like } from "./like";

@Entity("Post")
@Unique(["id", "authorId"])
export class Post {
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

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  like: Like[];

  @ManyToOne(() => User, (user) => user.post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "authorId" })
  author: User;
}
