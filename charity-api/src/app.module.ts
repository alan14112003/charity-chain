import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionsModule } from './app/transactions/transactions.module';
import { CharitiesModule } from './app/charities/charities.module';
import { ProgramsModule } from './app/programs/programs.module';
import { UploadsModule } from './app/uploads/uploads.module';
import { TempTransactionsModule } from './app/temp_transactions/temp_transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    // app modules
    UsersModule,
    AuthModule,
    TransactionsModule,
    CharitiesModule,
    ProgramsModule,
    UploadsModule,
    TempTransactionsModule,
  ],
})
export class AppModule {}
