import { Module } from '@nestjs/common';
import { GoogleStrategy } from './nest-module/auth/strategies/google-plus.strategy';
import { AuthModule } from './nest-module/auth/auth.module';
import { UsersModule } from './nest-module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersController } from './nest-module/users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'challenge',
      password: '78t8e#Oz',
      database: 'software_developer_challenge',
      schema: 'public',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [GoogleStrategy],
})
export class AppModule {}

// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'challenge',
//   password: '78t8e#Oz',
//   database: 'software_developer_challenge',
//   schema: 'public',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: true,
//   retryDelay: 3000,
//   retryAttempts: 10,
//   namingStrategy: new SnakeNamingStrategy(),
// }),

// imports: [
//   TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'ali1234',
//     database: 'postgres',
//     schema: 'software_developer_challenge',
//     entities: ['dist/**/*.entity{.ts,.js}'],
//     autoLoadEntities: true,
//     synchronize: true,
//     retryDelay: 3000,
//     retryAttempts: 10,
//     namingStrategy: new SnakeNamingStrategy(),
//   }),
