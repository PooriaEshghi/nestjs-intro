import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' }
      );
    }

    if (existingUser) {
      throw new BadRequestException('The user already exists, please check your email.');
    }

    let newUser = this.usersRepository.create(createUserDto);
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' }
      );
    }

    return newUser;
  }

  public findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber:88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occurred because the API endpoint was permanently moved'
      }
    )
  }

  public async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({
        id
      })
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' }
      );
    }

    if(!user){
      throw new BadRequestException('The user id does not exist')
    }

    return user;
  }
}
