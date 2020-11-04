import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('task')
export class TaskProcessor {
  private readonly logger = new Logger(TaskProcessor.name);

  @Process('newTask')
  handleNewTask(job: Job) {

    this.logger.debug('Start adding new task...');
    this.logger.debug(job.data);
    this.logger.debug('Finish adding new task...');
  }
}
