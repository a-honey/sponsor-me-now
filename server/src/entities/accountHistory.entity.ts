import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

@Entity("AccountHistory")
export class AccountHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  withdrawnAmount: number;

  @Column()
  remainingAmount: number;

  @Column({ nullable: true })
  bank: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.accountHistory)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
