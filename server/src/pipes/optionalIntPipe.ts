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
    if (!value) return null;
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException("Validation failed (numeric string is expected)");
    }
    return val;
  }
}
