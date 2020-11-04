import { ApiProperty } from '@nestjs/swagger';

export class getTaskDTO {
  @ApiProperty()
  task_id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creator: string;
}
