import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RolesModule } from './app/roles/roles.module';
import { PermissionsModule } from './app/permissions/permissions.module';
import { PermissionsScannerModule } from './app/permissions_scanner/permissions_scanner.module';
import { TransactionsModule } from './app/transactions/transactions.module';
import { CharitiesModule } from './app/charities/charities.module';
import { ProgramsModule } from './app/programs/programs.module';
import { UploadsModule } from './app/uploads/uploads.module';

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
    RolesModule,
    PermissionsModule,
    PermissionsScannerModule,
    TransactionsModule,
    CharitiesModule,
    ProgramsModule,
    UploadsModule,
  ],
})
export class AppModule {}
