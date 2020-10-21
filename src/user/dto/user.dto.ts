import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}


export class getUserInfoDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}