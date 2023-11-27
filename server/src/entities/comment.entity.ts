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
import { UserEntity } from "./user.entity";
import { PostEntity } from "./post.entity";

@Entity("Comment")
@Unique(["id", "authorId"])
@Index("parentId_index", ["parentId"])
export class CommentEntity {
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

  // Relationships
  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: "authorId" })
  author: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children)
  @JoinColumn({ name: "parentId" })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];
}
