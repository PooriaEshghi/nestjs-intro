import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    constructor(private readonly usersService: UsersService){}
    public finedUserById(userId: string){
        const user = this.usersService.findOneById(userId);
        console.log("found user with id: "+ userId);

        return [
            {
                user: user,
                title: 'Test Title',
                content: 'test Content'
            },
            {
                user: user,
                title: 'Test Title1',
                content: 'test Content1'
            }
        ]
        
    }
}
