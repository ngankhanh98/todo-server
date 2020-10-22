import { ApiProperty } from '@nestjs/swagger';
export class authDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

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
