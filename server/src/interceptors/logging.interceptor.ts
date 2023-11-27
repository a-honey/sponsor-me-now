import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        this.log(request, response, data);
        return data;
      }),
    );
  }
  private log(request: Request, response: Response, data: any) {
    const { ip, method, originalUrl: url, body, headers } = request;
    const userAgent = request.get("UserEntity-Agent") || "";
    const { statusCode } = response;
    const contentLength = response.get("Content-Length");
    const message = `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}\nRequest: \n${JSON.stringify(
      body,
      null,
      2,
    )}\nResponse: \n${JSON.stringify(data, null, 2)}`;
    this.logger.log(`${message}`);
  }
}
