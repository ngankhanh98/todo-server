import { ApiProperty } from '@nestjs/swagger';

export class getUserDTO {
  @ApiProperty()
  task_id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creator: string;
}
