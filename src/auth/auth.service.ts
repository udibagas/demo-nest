import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  findOne(email) {
    return this.prisma.user.findUniqueOrThrow({ where: { email } });
  }

  async signIn(credential) {
    const { email, password } = credential;
    const user = await this.findOne(email);

    if (user.id !== password) {
      throw new UnauthorizedException();
    }

    // TODO: generate token

    return { ...user, token: user.id };
  }
}
