import { MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(13)
  username: string;
  @MaxLength(13)
  password: string;
}