import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { PostEntity } from "./post.entity";
import { CommentEntity } from "./comment.entity";
import { LikeEntity } from "./like.entity";
import { PaymentsEntity } from "./payments.entity";
import { AccountHistoryEntity } from "./accountHistory.entity";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ nullable: true, unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  snsId: number;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ nullable: true })
  backgroundImg: string;

  @Column({ nullable: true })
  field: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isSponsor: boolean;

  @Column({ default: false })
  manager: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  account: number;

  @OneToMany(() => PostEntity, (post) => post.author)
  post: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comment: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  like: LikeEntity[];

  @OneToMany(() => PaymentsEntity, (Payments) => Payments.buyer)
  buyer: PaymentsEntity[];

  @OneToMany(() => PaymentsEntity, (Payments) => Payments.seller)
  seller: PaymentsEntity[];

  @OneToMany(() => AccountHistoryEntity, (accountHistory) => accountHistory.user)
  accountHistory: AccountHistoryEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
