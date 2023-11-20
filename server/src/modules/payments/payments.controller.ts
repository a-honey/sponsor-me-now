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
import { CreatePaymentHistoryDto } from "./dto/createPaymentHistory.dto";

@ApiTags("Payments")
@Controller("api/payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post("/complete")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @ApiBody({ description: "결제 내역 생성", type: CreatePaymentHistoryDto })
  @ApiResponse({ status: 201, type: "" })
  async createPaymentsHistory(
    @Request() req: RequestWithUser,
    @Body() createPaymentsHistoryData: CreatePaymentHistoryDto,
  ) {
    const userId = Number(req.user.id);
    return await this.paymentsService.createPaymentsHistory(userId, createPaymentsHistoryData);
  }
}
