import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { UserEntity } from "./user.entity";
import { PostEntity } from "./post.entity";

@Entity("Like")
@Unique(["postId", "userId"])
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => PostEntity, (post) => post.like, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.like, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
