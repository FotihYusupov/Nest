import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles as UserRoles } from 'src/enums/roles.enum'
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRoles.Admin)
  @UseGuards(AuthGuard)
  @Get()
  findAll() : Promise<object> {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req: Request & { user: { id: string } }) : Promise<object> {
    return this.userService.getMe(req.user.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) : Promise<object> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() user: { login: string; password: string }) : Promise<object> {
    return this.userService.login(user.login, user.password);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<object> {
    return this.userService.delete(id);
  }
}
