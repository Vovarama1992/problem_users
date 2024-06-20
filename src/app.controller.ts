import { Controller, Put } from '@nestjs/common';
import { UserService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('reset-problems-flag')
  @ApiOperation({
    summary: 'Reset problems flag and count users who had problems',
  })
  @ApiResponse({
    status: 200,
    description: 'Count of users who had problems',
  })
  async resetProblemsFlag(): Promise<{ count: number }> {
    const count = await this.userService.resetProblemsFlag();
    return { count };
  }
}
