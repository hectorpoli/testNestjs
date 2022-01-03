import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: configService.get('POSTGRES_LOGGING').split(','),
      }),
    }),
    /*MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const username = config.get('MONGO_USERNAME');
        const password = config.get('MONGO_PASSWORD');
        const database = config.get('MONGO_DB');
        const host = config.get('MONGO_HOSTNAME');

        return {
	  uri: `mongodb://${username}:${password}@${host}`,
	  dbName: database,
	//uri: `mongodb+srv://${username}:${password}@cluster0.cgjk5.mongodb.net/${database}?retryWrites=true&w=majority`,
        };
      },
      inject: [ConfigService],
      }),*/
  ],
})
export class DatabaseModule {}
