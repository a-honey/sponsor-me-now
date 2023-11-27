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

  // Relationships
  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: "postId" })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
