import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { UserType } from '../types/users.type';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([UserType.ADMIN, UserType.CUSTOMER])
  type: string;

  @IsString()
  @IsOptional()
  secretToken?: string;

  isVerified?: boolean;
}
