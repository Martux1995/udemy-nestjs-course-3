import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

      const user = this.userRepository.create(createUserDto);

      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this._getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this._handleDbError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    delete user.password;

    return {
      ...user,
      token: this._getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this._getJwtToken({ id: user.id }),
    };
  }

  private _getJwtToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }

  private _handleDbError(err: any): never {
    if (err.code === '23505') {
      throw new BadRequestException(err.detail);
    }
    console.log(err);

    throw new InternalServerErrorException('Please Check Logs');
  }
}
