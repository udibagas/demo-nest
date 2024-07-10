import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  showAllUsers() {
    return this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() data) {
    console.log(data);
    const user = await this.userService.createUser(data);
    return user;
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
