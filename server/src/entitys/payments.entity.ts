import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("Payment")
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column()
  sellerEmail: string;

  @Column()
  sellerName: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  applyNum: string;

  @Column({ nullable: true })
  bankCode: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  buyerAddr: string;

  @Column({ nullable: true })
  buyerEmail: string;

  @Column({ nullable: true })
  buyerName: string;

  @Column({ nullable: true })
  buyerPostcode: string;

  @Column({ nullable: true })
  buyerTel: string;

  @Column({ nullable: true })
  cancelAmount: number;

  @Column({ nullable: true })
  cancelReason: string;

  @Column({ nullable: true })
  cancelledAt: number;

  @Column({ nullable: true })
  cardCode: string;

  @Column({ nullable: true })
  cardName: string;

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  cardQuota: number;

  @Column({ nullable: true })
  cardType: string;

  @Column({ nullable: true })
  cashReceiptIssued: boolean;

  @Column({ nullable: true })
  channel: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ type: "json", nullable: true })
  customData: any;

  @Column({ nullable: true })
  customerUid: string;

  @Column({ nullable: true })
  customerUidUsage: string;

  @Column({ nullable: true })
  embPgProvider: string;

  @Column()
  escrow: boolean;

  @Column({ nullable: true })
  failReason: string;

  @Column({ nullable: true })
  failedAt: number;

  @Column({ nullable: true, unique: true })
  impUid: string;

  @Column({ nullable: true })
  merchantUid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  paidAt: number;

  @Column({ nullable: true })
  payMethod: string;

  @Column({ nullable: true })
  pgId: string;

  @Column({ nullable: true })
  pgProvider: string;

  @Column({ nullable: true })
  pgTid: string;

  @Column({ nullable: true })
  receiptUrl: string;

  @Column({ nullable: true })
  startedAt: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  vbankCode: string;

  @Column({ nullable: true })
  vbankDate: number;

  @Column({ nullable: true })
  vbankHolder: string;

  @Column({ nullable: true })
  vbankIssuedAt: number;

  @Column({ nullable: true })
  vbankName: string;

  @Column({ nullable: true })
  vbankNum: string;

  @Column({ type: "json", nullable: true })
  cancelHistories: any;

  @Column({ type: "json", nullable: true })
  cancelReceiptUrls: any;

  @ManyToOne(() => UserEntity, (user) => user.buyer)
  @JoinColumn({ name: "buyerId" })
  buyer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.seller)
  @JoinColumn({ name: "sellerId" })
  seller: UserEntity;

  @DeleteDateColumn()
  deletedAt: Date;
}
