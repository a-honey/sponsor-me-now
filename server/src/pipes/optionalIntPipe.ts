import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Optional,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) return null; // 값이 제공되지 않았다면 원래 값을 반환합니다.
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException("Validation failed (numeric string is expected)");
    }
    return val;
  }
}
