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
  Index,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity("Comment")
@Unique(["id", "authorId"])
@Index("parentId_index", ["parentId"])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  authorId: number;

  @Column()
  postId: number;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => User, (user) => user.comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "authorId" })
  author: User;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.children, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parentId" })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];
}
