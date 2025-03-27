import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authservice: AuthService
  ) { }

  public async createUser(createUserDto: CreateUserDto){
    const existingUser = await this.userRepository.findOne({
      where: {email: createUserDto.email}
    });
    if(existingUser){
      throw new Error("User is existing");
    }else{
      const newUser = this.userRepository.create(createUserDto);
      this.userRepository.save(newUser);

      return newUser;
    }
  }

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit?: number,
    page?: number,
  ) {
    const isAuth = this.authservice.isAuth();
    console.log(isAuth);
    
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

  findOneById(id: string) {
    const user = {
      id: '1234',
      firstName: 'John',
      email: 'john@doe.com',
    }
    if (id === user.id) {
      return user;

    } else {
      return "something went wrong"
    }

  }
}
