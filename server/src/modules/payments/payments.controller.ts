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
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../user/interface/requestWithUser";
import { ImpUidDto } from "./dto/impUid.dto";
import axios from "axios";
import { ResponsePaymentsDto } from "./dto/responsePayments.dto";
import { getIamPortToken } from "../../utils/getIamPortToken";
import { ParseIntWithDefaultPipe } from "../../pipes/parseIntWithDefaultPipe";
import { PaymentsListDto } from "./dto/paymentsList.dto";
import { PaymentsDto } from "./dto/payments.dto";

@ApiTags("Payments")
@Controller("api/payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post("/complete")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "결제 내역 생성", type: ImpUidDto })
  @ApiResponse({ status: 201, type: ResponsePaymentsDto })
  async createPaymentsHistory(
    @Request() req: RequestWithUser,
    @Body() data: ImpUidDto,
  ): Promise<ResponsePaymentsDto> {
    const userId = Number(req.user.id);

    const { access_token } = await getIamPortToken();

    const getPaymentsData = await axios({
      url: `https://api.iamport.kr/payments/${data.impUid}`,
      method: "get",
      headers: { Authorization: access_token },
    });
    const paymentsData = getPaymentsData.data.response;

    return await this.paymentsService.createPayments(userId, data, paymentsData);
  }

  @Get("/list")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "결제 내역 리스트" })
  @ApiResponse({ status: 200, type: [PaymentsListDto] })
  async getPaymentsHistoryList(
    @Request() req: RequestWithUser,
    @Query("page", new ParseIntWithDefaultPipe(1)) page: number,
    @Query("limit", new ParseIntWithDefaultPipe(10)) limit: number,
  ): Promise<{ payments: PaymentsListDto[]; totalPages: number; currentPage: number }> {
    const userId: number = Number(req.user.id);

    return await this.paymentsService.getPaymentsHistoryList(userId, page, limit);
  }

  @Get(":paymentsId")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "단일 결제 상세 내역" })
  @ApiResponse({ status: 200, type: PaymentsDto })
  async getPayments(
    @Request() req: RequestWithUser,
    @Param("paymentsId", ParseIntPipe) paymentId: number,
  ): Promise<PaymentsDto> {
    return await this.paymentsService.getPaymentsDetail(paymentId);
  }
}
