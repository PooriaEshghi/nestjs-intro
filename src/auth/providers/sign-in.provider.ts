import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
    constructor(
        private readonly usersService: UsersService,
        private readonly hashingProvider: HashingProvider,
    ) {}

    public async signIn(signInDto: SignInDto){


        let user = await this.usersService.findOneByEmail(signInDto.email);

        if(!user || !user.password){
            return null
        }

        let isEqual: boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(signInDto.password, user.password)
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare passwords'
            });
        }

        if(!isEqual){
            throw new UnauthorizedException('Incorrect password')
        }
        return true;

    }
}
