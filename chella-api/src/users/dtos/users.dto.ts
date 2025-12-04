// import { Injectable } from '@nestjs/common';

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  refferredBy?: string;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  fullName: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  refferredBy?: string;
}
