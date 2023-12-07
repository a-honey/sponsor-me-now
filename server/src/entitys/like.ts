import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity("Like")
@Unique(["postId", "userId"])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => Post, (post) => post.like, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToOne(() => User, (user) => user.like, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
