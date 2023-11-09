export class SubmitUserDto {
  username: string;
  password: string;
  passwordConfirm?: string;
  email: string;
  isSponsor: boolean;
}
