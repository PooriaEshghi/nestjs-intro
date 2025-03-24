import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";


@Injectable()
export class UsersService {
    public findAll(
        getUserParamDto: GetUsersParamDto,
        limit?: number,
        page?: number,
      ) {
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

    findOneById(id: string){
      const  user = {
            id:'1234',
            firstName: 'John',
            email: 'john@doe.com',
          }
          if(id === user.id){
              return user; 

          }else{
            return "something went wrong"
          }

    }
}
