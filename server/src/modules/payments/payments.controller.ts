import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { ImpUidDto } from "./dto/impUid.dto";
import axios, { AxiosResponse } from "axios";
import { ResponsePaymentsDto } from "./dto/responsePayments.dto";
import { getIamPortToken } from "../../utils/getIamPortToken";
import { ParseIntWithDefaultPipe } from "../../pipes/parseIntWithDefaultPipe";
import { PaymentsListDto } from "./dto/paymentsList.dto";
import { PaymentsDto } from "./dto/payments.dto";
import { ClientCancelRequestDataDto } from "./dto/clientCancelRequestDataDto";

@ApiTags("Payments")
@Controller("api/payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post("/complete")
  @ApiOperation({
    summary: "결제 내역 저장",
    description:
      "imp uid 와 셀러 정보를 받은 후, iamport server 조회 후 데이터베이스에 저장 + 해당 User record에 account 증감 + AccountHistory 테이블에 account 변경사항 저장",
  })
  @ApiBody({ type: ImpUidDto })
  @ApiResponse({ status: 201, type: ResponsePaymentsDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  async createPaymentsHistory(
    @Request() req: RequestWithUser,
    @Body() data: ImpUidDto,
  ): Promise<ResponsePaymentsDto> {
    const userId: number = Number(req.user.id);

    const { access_token } = await getIamPortToken();

    const getPaymentsData: AxiosResponse<any, any> = await axios({
      url: `https://api.iamport.kr/payments/${data.impUid}`,
      method: "get",
      headers: { Authorization: access_token },
    });
    const paymentsData = getPaymentsData.data.response;

    return await this.paymentsService.createPayments(userId, data, paymentsData);
  }

  @Get("/list")
  @ApiOperation({
    summary: "결제 내역 리스트",
    description:
      "사용자 결제 내역 리스트 조회. 사용자가 구매자이면 후원내역, 판매자라면 후원받은 내역을 조회",
  })
  @ApiResponse({ status: 200, type: [PaymentsListDto] })
  @UseGuards(AuthGuard("jwt"))
  async getPaymentsHistoryList(
    @Request() req: RequestWithUser,
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
  ): Promise<{ payments: PaymentsListDto[]; totalPages: number; currentPage: number }> {
    const userId: number = Number(req.user.id);

    return await this.paymentsService.getPaymentsHistoryList(userId, page, limit);
  }

  @Get(":paymentsId")
  @ApiOperation({
    summary: "단일 결제 상세 내역 조회",
  })
  @ApiResponse({ status: 200, type: PaymentsDto })
  @UseGuards(AuthGuard("jwt"))
  async getPayments(@Param("paymentsId", ParseIntPipe) paymentsId: number): Promise<PaymentsDto> {
    return await this.paymentsService.getPaymentsDetail(paymentsId);
  }

  @Post("/cancel")
  @ApiOperation({ summary: "결제 취소 요청", description: "dd" })
  @ApiBody({ type: ClientCancelRequestDataDto })
  @ApiResponse({ status: 201, type: ResponsePaymentsDto })
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  async cancelPayments(
    @Request() req: RequestWithUser,
    @Body() cancelData: ClientCancelRequestDataDto,
  ): Promise<ResponsePaymentsDto> {
    const userId: number = Number(req.user.id);

    const payments = await this.paymentsService.getPaymentsDetail(cancelData.paymentsId);

    const { access_token } = await getIamPortToken();

    const cancelPayments: AxiosResponse<any, any> = await axios({
      url: `https://api.iamport.kr/payments/cancel`,
      method: "post",
      headers: { Authorization: access_token },
      data: {
        imp_uid: payments.impUid,
        merchant_uid: payments.merchantUid,
        amount: cancelData.cancelRequestAmount,
        // tax_free: 0,
        // vat_amount: 0,
        checksum: null,
        reason: cancelData.reason,
        // refund_holder: "",
        // refund_bank: "",
        // refund_account: "",
        // refund_tel: "",
        // extra: [],
      },
    });
    const updatePaymentsData = cancelPayments.data.response;

    return await this.paymentsService.updatePayments(
      userId,
      updatePaymentsData,
      cancelData.paymentsId,
    );
  }
}
