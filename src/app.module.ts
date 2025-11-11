import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsController } from './meta-options/meta-options.controller';
import { MetaOptionsModule } from './meta-options/meta-options.module';

const ENV = process.env.NODE_ENV;


@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
     ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'pooria84',
        host: 'localhost',
        database: 'nestjs-blog',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController, MetaOptionsController],
  providers: [AppService],
})
export class AppModule {}
