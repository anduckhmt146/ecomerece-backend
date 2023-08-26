import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto {
  name?: string;
  oldPassword?: string;
  newPassword?: string;
}
