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
import { ImpUidDto } from "./dto/ImpUid.dto";
import axios from "axios";

@ApiTags("Payments")
@Controller("api/payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post("/complete")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "결제 내역 생성", type: ImpUidDto })
  @ApiResponse({ status: 201, type: "" })
  async createPaymentsHistory(@Request() req: RequestWithUser, @Body() data: ImpUidDto) {
    const userId = Number(req.user.id);

    const getTokenData = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: process.env.IMP_REST_API_KEY,
        imp_secret: process.env.IMP_REST_API_SECRET,
      },
    });

    const { accessToken } = getTokenData.data.response;

    const getPaymentsData = await axios({
      url: `https://api.iamport.kr/payments/${data.impUid}`,
      method: "get",
      headers: { Authorization: accessToken },
    });
    const paymentsData = getPaymentsData.data.response;

    return await this.paymentsService.createPaymentsHistory(userId, data, paymentsData);
  }
}
