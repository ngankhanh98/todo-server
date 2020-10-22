import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';
import { Connection } from 'typeorm';


@Module({
  imports: [databaseProvider],
})
export class DatabaseModule {
  constructor(private connection: Connection) {}

}
