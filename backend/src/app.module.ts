import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/students*'],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Student],
        synchronize: true, // Safe only for small dev tasks
        ssl: configService.get<string>('DATABASE_URL')?.includes('supabase') || configService.get<string>('DATABASE_URL')?.includes('neon') ? { rejectUnauthorized: false } : false,
      }),
    }),
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
