import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty()
  username: string;
  
  @ApiProperty()
  password: string;
}
