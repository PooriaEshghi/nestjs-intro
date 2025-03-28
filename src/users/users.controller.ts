import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get(':id')
    @ApiOperation({
        summary: 'Fetches a list of registered users on the application'
    })
    @ApiResponse({
        status: 200,
        description: "User fetched successfully based on the query"
    })
    @ApiQuery({
        name:'limit',
        type:'number',
        required:false,
        description: 'The number of entries returned per query',
        example: 10
    })
    @ApiQuery({
        name:'page',
        type:'number',
        required:false,
        description: 'The position of the page number that you want the API to return',
        example: 1
    })
    getUsers(
        @Param() getUserParamDto:GetUsersParamDto, 
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit?: number, 
        @Query('page',new DefaultValuePipe(1), ParseIntPipe) page?: number
    ) {
        return this.userService.findAll(getUserParamDto, limit, page)
        // return this.userService.findAll(getUserParamDto.id as string);
    }
    

    @Post()
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
      return patchUserDto;
    }
}
