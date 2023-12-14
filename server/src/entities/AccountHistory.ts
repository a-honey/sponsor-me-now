import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

@Entity("AccountHistory")
export class AccountHistory {
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

  @ManyToOne(() => User, (user) => user.accountHistory)
  @JoinColumn({ name: "userId" })
  user: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
