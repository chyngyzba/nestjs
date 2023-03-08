import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { SequelizeModule } from"@nestjs/sequelize";
import configuration from 'src/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[configuration]
  }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        dialect:"postgres",
        host:configService.get('db_host'),
        port:configService.get('db_port'),
        username:configService.get('db_username'),
        database:configService.get('db_name'),
        synchronize:true,
        autoLoadModels:true,
        modules:[]
      })
    }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
