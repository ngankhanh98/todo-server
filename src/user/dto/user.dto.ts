import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class getUserDTO {
  @ApiProperty()
  username: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}