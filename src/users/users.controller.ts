import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get(':id') 
    getUser(
        @Param() getUserParamDto:GetUsersParamDto, 
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit?: number, 
        @Query('page',new DefaultValuePipe(1), ParseIntPipe) page?: number
    ) {
        // return this.userService.findAll(getUserParamDto, limit, page)
        return this.userService.findOneById(getUserParamDto.id as string);
    }
    

    @Post()
    createUsers(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto instanceof CreateUserDto);
        
        
        return "Hai inviato una richiesta POST all'endpoint users";
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
      return patchUserDto;
    }
}
