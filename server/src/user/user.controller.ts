import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Param("email") email: string) {
    return this.userService.getUser(email);
  }
}
