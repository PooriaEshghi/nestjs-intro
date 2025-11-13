import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import {
  BadRequestException,
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
        {description: 'Error connecting to the database'}
      )
    }

    


    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);


    return newUser;
  }

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {

    const environment = this.configService.get('NODE_ENV')
    console.log(environment);
    console.log(this.profileConfiguration.apiKey);
    
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  public findOneById(id: number) {
    return {
      id: 1234,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}