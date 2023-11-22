import { PaymentsListDto } from "./paymentsList.dto";

export class ResponsePaymentsListDto {
  totalPage: number;
  currentPage: number;
  payments: [PaymentsListDto];
}
