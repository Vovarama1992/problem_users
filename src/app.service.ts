import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemUser } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ProblemUser)
    private readonly userRepository: Repository<ProblemUser>,
  ) {}

  async resetProblemsFlag(): Promise<number> {
    const count = await this.userRepository.count({
      where: { has_problems: true },
    });

    await this.userRepository.update(
      { has_problems: true },
      { has_problems: false },
    );

    return count;
  }
}
