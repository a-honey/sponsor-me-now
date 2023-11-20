import {
  Body,
  Controller,
  Post,
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
import { ResponsePaymentHistoryDto } from "./dto/responsePaymentHistory.dto";
import { getIamPortToken } from "../../utils/getIamPortToken";

@ApiTags("Payments")
@Controller("api/payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post("/complete")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "결제 내역 생성", type: ImpUidDto })
  @ApiResponse({ status: 201, type: ResponsePaymentHistoryDto })
  async createPaymentsHistory(
    @Request() req: RequestWithUser,
    @Body() data: ImpUidDto,
  ): Promise<ResponsePaymentHistoryDto> {
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
}
