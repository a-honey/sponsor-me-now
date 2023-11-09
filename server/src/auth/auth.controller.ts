import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { SubmitUserDto } from './dto/submit-user.dto';

@Controller('user')
export class AuthController {
  constructor(private userService: AuthService) {}

  private isValidPassword(submitUserDto: SubmitUserDto): boolean {
    return submitUserDto.password === submitUserDto.passwordConfirm;
  }

  @Post()
  async createUser(@Body() submitUserDto: SubmitUserDto): Promise<AuthDto> {
    try {
      if (!this.isValidPassword(submitUserDto)) {
        throw new HttpException('Passwords do not match', 400);
      }
      const { passwordConfirm: _passwordConfirm, ...createUserDto } =
        submitUserDto;
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create auth',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
