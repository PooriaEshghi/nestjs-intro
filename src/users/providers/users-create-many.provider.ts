import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private dataSource: DataSource) {}

  public async createMany(createManyUserDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      for (let user of createManyUserDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newUsers;
  }
}
