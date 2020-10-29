import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { databaseProvider } from './database.providers';

@Module({
  imports: [databaseProvider],
})
export class DatabaseModule {
  constructor(private connection: Connection) {}
}
