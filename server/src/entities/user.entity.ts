import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostEntity } from "./post.entity";
import { CommentEntity } from "./comment.entity";
import { LikeEntity } from "./like.entity";
import { PaymentsEntity } from "./payments.entity";
import { AccountHistoryEntity } from "./accountHistory.entity";

@Entity("User")
@Unique(["nickname", "snsId"])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  password: string;

  @Column({ nullable: true })
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

  // Relationships
  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => PaymentsEntity, (Payments) => Payments.buyer)
  buyerPayments: PaymentsEntity[];

  @OneToMany(() => PaymentsEntity, (Payments) => Payments.seller)
  sellerPayments: PaymentsEntity[];

  @OneToMany(() => AccountHistoryEntity, (accountHistory) => accountHistory.user)
  accountHistories: AccountHistoryEntity[];
}
